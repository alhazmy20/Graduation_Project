<?php

namespace App\Http\Controllers;

use App\Helpers\Gender;
use App\Helpers\SupervisorSection;
use App\Helpers\UserRole;
use App\Http\Requests\UpdateStudentImageRequest;
use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\StudentFiles;
use App\Services\UserService;
use App\Traits\DeleteFiles;
use App\Traits\HttpResponses;
use App\Traits\UniversitiyAPI;
use App\Traits\UploadFiles;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\QueryBuilder;

class StudentController extends Controller
{
    use HttpResponses, UploadFiles, DeleteFiles, UniversitiyAPI;
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (UserRole::isSupervisor()) {
            return $this->success(StudentResource::collection(Student::withoutTrashed()
                ->where('supervisor_id', Auth::id())
                ->get()));
        }
        return $this->success(StudentResource::collection(Student::withoutTrashed()->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStudentRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreStudentRequest $request)
    {
        $validated = $request->validated();
        $studentAPI = $this->UniversityAPI($validated['university'], $validated['email'], 'students');
        if (!$studentAPI) {
            return $this->error(null, 'يرجى ادخال ايميل جامعي صحيح للتسجيل', 422);
        }
        $studentAPIAttributes = $studentAPI['data'][0]['attributes'];
        $user = $this->userService->store($validated['email'], $validated['password']);
        $user->assignRole('Student');
        $student = Student::create(array_merge($validated, $studentAPIAttributes, ['id' => $user->id]));
        StudentFiles::create(['student_id' => $student->id]);
        return $this->success(new StudentResource($student), 'تم التسجيل بنجاح يرجى تفعيل الحساب');
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Student $student)
    {
        if (!UserRole::isAdmin() && Auth::id() != $student->id) {
            return $this->error(null, 'ليس لديك صلاحية لعرض بيانات هذا الطالب ', 401);
        }
        return $this->success(new StudentResource($student->load('studentFiles')));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentRequest  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        if (!UserRole::isAdmin() && Auth::id() != $student->id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل بيانات هذا الطالب ', 401);
        }
        $validated = $request->validated();
        $studentAllowedAttributes = Arr::only($validated, ['phone', 'GPA']);
        $student->update(UserRole::isAdmin() ? $validated : $studentAllowedAttributes);
        if ($request->hasAny(['transcript', 'nationalID', 'internshipLetter', 'CV'])) {
            $this->uploadFiles($request, $student->id);
            return $this->success(new StudentResource($student->load('studentFiles')), 'تم رفع الملفات بنجاح');
        }
        return $this->success(new StudentResource($student->load('studentFiles')), 'تم تعديل بيانات الطالب بنجاح');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentImageRequest  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\JsonResponse
     */
    public function handleImage(UpdateStudentImageRequest $request, Student $student)
    {
        if ($request->has('deletePersonalPicture')) {
            $this->deleteImage($request, $student->id);
            return $this->success(new StudentResource($student->load('studentFiles')), 'تم حذف الصورة الشخصية بنجاح');
        }
        if ($request->has('personalPicture')) {
            $this->uploadFiles($request, $student->id);
            return $this->success(new StudentResource($student->load('studentFiles')), 'تم رفع الصورة الشخصية بنجاح');
        }
    }

    /**
     * Remove the specified resource from storage.
     *composer require dyrynda/laravel-cascade-soft-deletes
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Student $student)
    {
        $student->delete();
        return $this->success(null, 'تم حذف الطالب بنجاح');
    }
}
