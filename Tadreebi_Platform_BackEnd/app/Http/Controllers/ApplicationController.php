<?php

namespace App\Http\Controllers;

use App\Events\ApplicationStatusUpdated;
use App\Http\Resources\ApplicationsResource;
use App\Models\Application;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Models\Post;
use App\Models\Student;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $postId = $request->id;
        if (Auth::check() && Auth::user()->hasRole('Institution')) {
            $applications = Application::whereHas('post', function ($query) {
                $query->where('institution_id', Auth::id());
            })
                ->where('post_id', $postId)
                ->with(['student', 'student.studentFiles', 'status'])
                ->paginate(8);
            return $this->success(ApplicationsResource::collection($applications)->resrouce);
        }
        $applications = Application::with(['status', 'post', 'post.institution'])->where('student_id', Auth::id())->paginate(8);
        return $this->success(ApplicationsResource::collection($applications)->resource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreApplicationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreApplicationRequest $request)
    {
        $validated = $request->validated();
        $student = Student::findOrFail(Auth::id());
        // Retrieve the post and its related post majors
        $post = Post::with('postmajors')->findOrFail($validated['post_id']);
        //Check if the student's SCC matches any of the post majors
        if (!$post->postmajors->pluck('SCC')->contains($student->SCC))
            return $this->error(null, 'تخصص الطالب غير مطابق لأي من التخصصات المطلوبة لهذه الفرصة التدريبية', 422);
        // Check if the current student did not upload all of the files in his profile
        elseif ($student->studentFiles->hasEmptyFiles())
            return $this->error(null, 'يرجى رفع خطاب التدريب والسجل الاكاديمي في الملف الشخصي للتقديم على الفرصة التدريبية', 422);
        //Check if the gender in the post is female and the current user is male and vice versa
        elseif (($post->gender === 0 && $student->gender == 1) || ($post->gender == 1 && $student->gender == 0))
            return $this->error(null, 'لا يمكنك التقديم على هذه الفرصة التدريبية لعدم تطابق الجنس', 422);
        //Check if the student has already applied to this post
        elseif (Application::where('student_id', $student->id)->where('post_id', $post->id)->exists())
            return $this->error(null, 'تم التقديم على الفرصة التدريبية هذه بالفعل', 422);
        else {
            $application = Application::create([
                'post_id' => $post->id,
                'student_id' => $student->id,
            ]);
            return $this->success(new ApplicationsResource($application->load('post')), 'تم التقديم على الفرصة التدريبية بنجاح', 201);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateApplicationRequest  $request
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        $validated = $request->validated();
        $statusIdRequest = $validated['status_id'];
        $userId = Auth::id();
        $notAllowedUpdatingStatus = [
            [2, 4],
            [4, 2],
            [3, 5],
            [5, 3],
            [3, 2],
            [3, 4],
            [5, 2],
            [5, 4],
        ];

        $isAllowedToUpdate = (
            ($userId === $application->post->institution_id && in_array($statusIdRequest, [2, 4])) ||
            ($userId === $application->student_id && in_array($statusIdRequest, [3, 5]))
        );

        if (!$isAllowedToUpdate) {
            return $this->error(null, 'ليس لديك الصلاحية لتعديل حالة هذا الطلب', 403);
        }

        if (in_array([$application->status_id, $statusIdRequest], $notAllowedUpdatingStatus)) {
            return $this->error(null, 'لا يمكن تحديث حالة الطلب بالطريقة المحددة', 422);
        }

        //cancel student applcation if accetped another application
        if ($statusIdRequest == 3) {
            Application::where('student_id', $userId)
                ->where('status_id', 3)
                ->update(['status_id' => 5]);
        }

        $application->update($validated);
        event(new ApplicationStatusUpdated($application->student->user->email, $application->status->name, $application->post->title));
        return $this->success(new ApplicationsResource($application->load('post')), 'تم تحديث حالة الطلب بنجاح');
    }

}
