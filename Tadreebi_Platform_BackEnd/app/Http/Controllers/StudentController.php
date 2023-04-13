<?php

namespace App\Http\Controllers;

use App\Models\Student;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Http\Resources\StudentResource;
use App\Models\StudentFiles;
use App\Services\UserService;
use App\Traits\HttpResponses;
use App\Traits\UploadFiles;
use Illuminate\Support\Facades\Auth;
use Svnwa\LaravelStrapi\Facades\Strapi;


class StudentController extends Controller
{
    use HttpResponses, UploadFiles;
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->success(StudentResource::collection(Student::withTrashed()->paginate(8))->resource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreStudentRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreStudentRequest $request)
    {
        $validated = $request->validated();
        $studentAPI = $this->UniversityAPI($validated['university'], $validated['email']);
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
    public function UniversityAPI($university, $email)
    {
        switch ($university) {
            case 'جامعة طيبة':
                $student = Strapi::collection('students')->filterBy([['[email]', $email],])->get();
                return !empty($student['data'][0]['attributes']) ? $student : false;
            default:
                return false;
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function show(Student $student)
    {
        $isAdmin = Auth::check() && Auth::user()->hasRole('Admin');
        if (!$isAdmin && Auth::id() != $student->id) {
            return $this->error(null, 'ليس لديك صلاحية لعرض بيانات هذا الطالب ', 403);
        }
        return $this->success(new StudentResource($student->load('studentFiles')));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateStudentRequest  $request
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $isAdmin = Auth::check() && Auth::user()->hasRole('Admin');
        if (!$isAdmin && Auth::id() != $student->id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل بيانات هذا الطالب ', 403);
        }
        if ($isAdmin) {
            $student->admins()->attach(Auth::id(), ['action' => 'update']);
        }
        $validated = $request->validated();
        $student->update($validated);
        if ($request->hasAny(['transcript', 'nationalID', 'internshipLetter', 'CV', 'personalPicture','isPersonalPictureDeleted'])) {
            $this->upload($request, $student->id);
        }
        return $this->success(new StudentResource($student->load('studentFiles')), 'تم تعديل بيانات الطالب بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Student  $student
     * @return \Illuminate\Http\Response
     */
    public function destroy(Student $student)
    {
        $student->admins()->attach(Auth::id(), ['action' => 'delete']);
        $this->userService->destroy($student->id);
        $student->delete();
        return $this->success(null, 'تم حذف الطالب بنجاح');
    }
}
