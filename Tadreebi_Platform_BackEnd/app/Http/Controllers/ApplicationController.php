<?php

namespace App\Http\Controllers;

use App\Helpers\ApplicationStatus;
use App\Events\ApplicationStatusUpdated;
use App\Helpers\Gender;
use App\Helpers\UserRole;
use App\Http\Resources\ApplicationsResource;
use App\Models\Application;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationRequest;
use App\Models\Post;
use App\Models\Student;
use App\Traits\HttpResponses;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (UserRole::isInstitution()) {
            $applications = Application::whereHas('post', function ($query) {
                $query->where('institution_id', Auth::id());
            })
                ->where('post_id', request()->id)
                ->orderByRaw('status_id = ' . ApplicationStatus::WAITING_INSTITUTION_APPROVAL . ' desc')
                ->with(['student', 'student.studentFiles', 'status'])
                ->get();
            return $this->success(ApplicationsResource::collection($applications));
        } elseif (UserRole::isSupervisor()) {
            $applications = Application::whereHas('student', function ($query) {
                $query->where('supervisor_id', Auth::id());
            })
                ->with(['student', 'status', 'post', 'post.institution'])
                ->orderByRaw('status_id = ' . ApplicationStatus::WAITING_SUPERVISOR_APPROVAL . ' desc')
                ->whereNotIn('status_id', [ApplicationStatus::WAITING_INSTITUTION_APPROVAL, ApplicationStatus::INSTITUTION_REJECTED])
                ->get();
            return $this->success(ApplicationsResource::collection($applications));
        } else {
            $applications = Application::with(['status', 'post', 'post.institution'])
                ->where('student_id', Auth::id())
                ->orderByRaw('status_id = ' . ApplicationStatus::WAITING_STUDENT_APPROVAL . ' desc')
                ->get();
            return $this->success(ApplicationsResource::collection($applications));
        }
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreApplicationRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreApplicationRequest $request)
    {
        $validated = $request->validated();
        $student = Student::findOrFail(Auth::id());
        // Retrieve the post and its related post majors
        $post = Post::with('postMajors')->findOrFail($validated['post_id']);
        //Check if the student's SCC matches any of the post majors
        if (!$post->postMajors->pluck('SCC')->contains($student->SCC))
            return $this->error(null, 'لا يمكنك التقديم على هذه الفرصة التدريبية لعدم تطابق تخصصك لأي من التخصصات المطلوبة', 422);
        // Check if the current student did not upload all of the files in his profile
        elseif ($student->studentFiles->hasEmptyFiles())
            return $this->error(null, 'يرجى رفع خطاب التدريب والسجل الاكاديمي والسيرة الذاتية في الملف الشخصي للتقديم على الفرصة التدريبية', 422);
        //Check if the gender in the post is female and the current user is male and vice versa
        elseif (($post->gender === Gender::MALE && $student->gender == Gender::FEMALE) || ($post->gender == Gender::FEMALE && $student->gender == Gender::MALE))
            return $this->error(null, 'لا يمكنك التقديم على هذه الفرصة التدريبية لعدم تطابق الجنس المحدد لهذه الفرصة التدريبية', 422);
        //Check if the post is already ended or not
        elseif ($post->p_endDate <= Carbon::now()->addDay()->format('Y-m-d'))
            return $this->error(null, 'لا يمكنك التقديم على هذه الفرصة التدريبية لإنتهاء وقت التقديم', 422);
        //Check if the student has already applied to this post
        elseif (Application::where('student_id', $student->id)->where('post_id', $post->id)->exists())
            return $this->error(null, 'تم التقديم على الفرصة التدريبية هذه بالفعل', 422);
        else {
            $application = Application::create([
                'post_id' => $post->id,
                'student_id' => $student->id,
            ]);
            return $this->success(new ApplicationsResource($application->fresh()->load(['post', 'status'])), 'تم التقديم على الفرصة التدريبية بنجاح', 201);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateApplicationRequest  $request
     * @param  \App\Models\Application  $application
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateApplicationRequest $request, Application $application)
    {
        $validated = $request->validated();
        $statusIdRequest = $validated['status_id'];
        $userId = Auth::id();
        // Prevent Institution,supervisor, and students from swapping statues after submitting for the first time
        $notAllowedUpdatingStatus = [
            [ApplicationStatus::WAITING_SUPERVISOR_APPROVAL, ApplicationStatus::INSTITUTION_REJECTED],
            [ApplicationStatus::INSTITUTION_REJECTED, ApplicationStatus::WAITING_SUPERVISOR_APPROVAL],
            [ApplicationStatus::WAITING_STUDENT_APPROVAL, ApplicationStatus::SUPERVISOR_REJECTED],
            [ApplicationStatus::SUPERVISOR_REJECTED, ApplicationStatus::WAITING_STUDENT_APPROVAL],
            [ApplicationStatus::APPROVED, ApplicationStatus::STUDENT_REJECTED],
            [ApplicationStatus::STUDENT_REJECTED, ApplicationStatus::APPROVED],
        ];
        // Allow only the users who is related to the specific application to update the application with their allowed statuses only
        $isAllowedToUpdate = (
            ($userId === $application->post->institution_id && in_array($statusIdRequest, [ApplicationStatus::WAITING_SUPERVISOR_APPROVAL, ApplicationStatus::INSTITUTION_REJECTED])) ||
            ($userId === $application->student->supervisor_id && in_array($statusIdRequest, [ApplicationStatus::WAITING_STUDENT_APPROVAL, ApplicationStatus::SUPERVISOR_REJECTED])) ||
            ($userId === $application->student_id && in_array($statusIdRequest, [ApplicationStatus::APPROVED, ApplicationStatus::STUDENT_REJECTED]))
        );

        if (!$isAllowedToUpdate) {
            return $this->error(null, 'ليس لديك الصلاحية لتعديل حالة هذا الطلب', 403);
        }

        if (in_array([$application->status_id, $statusIdRequest], $notAllowedUpdatingStatus)) {
            return $this->error(null, 'لا يمكن تحديث حالة الطلب بالطريقة المحددة', 422);
        }
        //cancel student applcation if the student accetped another application
        if ($statusIdRequest == ApplicationStatus::APPROVED) {
            Application::where('student_id', $userId)
                ->where('status_id', ApplicationStatus::APPROVED)
                ->update(['status_id' => ApplicationStatus::CANCELED]);
        }
        $application->update($validated);
        //send email to notify the student his application status has been updated
        event(new ApplicationStatusUpdated($application->student->user->email, $application->status->name, $application->post->title));
        return $this->success(new ApplicationsResource($application->load(['post', 'status'])), 'تم تحديث حالة الطلب بنجاح');
    }
}
