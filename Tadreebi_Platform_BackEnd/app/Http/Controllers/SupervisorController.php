<?php

namespace App\Http\Controllers;

use App\Helpers\UserRole;
use App\Models\Supervisor;
use App\Http\Requests\StoreSupervisorRequest;
use App\Http\Requests\UpdateSupervisorRequest;
use App\Http\Resources\SupervisorResource;
use App\Services\UserService;
use App\Traits\DeleteFiles;
use App\Traits\HttpResponses;
use App\Traits\UniversitiyAPI;
use App\Traits\UploadFiles;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class SupervisorController extends Controller
{
    use HttpResponses, UniversitiyAPI;
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
        return $this->success(SupervisorResource::collection(Supervisor::withoutTrashed()->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSupervisorRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreSupervisorRequest $request)
    {
        $validated = $request->validated();
        $supervisorAPI = $this->UniversityAPI($validated['university'], $validated['email'], 'supervisors');
        if (!$supervisorAPI) {
            return $this->error(null, 'يرجى ادخال ايميل صحيح للتسجيل', 422);
        }
        $supervisorAPIAttributes = $supervisorAPI['data'][0]['attributes'];
        $user = $this->userService->store($validated['email'], $validated['password']);
        $user->assignRole('Supervisor');
        $supervisor = Supervisor::create(array_merge($validated, $supervisorAPIAttributes, ['id' => $user->id]));
        return $this->success(new SupervisorResource($supervisor), 'تم التسجيل بنجاح يرجى تفعيل الحساب');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Supervisor $supervisor)
    {
        if (!UserRole::isAdmin() && Auth::id() != $supervisor->id) {
            return $this->error(null, 'ليس لديك صلاحية لعرض بيانات هذا المشرف الجامعي ', 403);
        }
        return $this->success(new SupervisorResource($supervisor));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSupervisorRequest  $request
     * @param  \App\Models\Supervisor  $supervisor
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateSupervisorRequest $request, Supervisor $supervisor)
    {
        if (!UserRole::isAdmin() && Auth::id() != $supervisor->id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل بيانات هذا الطالب ', 403);
        }
        $validated = $request->validated();
        $this->userService->update($supervisor->id, $validated['email']);
        $supervisorAllowedAttributes = Arr::only($validated, ['section']);
        $supervisor->update(UserRole::isAdmin() ? $validated : $supervisorAllowedAttributes);
        return $this->success(new SupervisorResource($supervisor), 'تم تعديل بيانات المشرف الجامعي بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Supervisor $supervisor)
    {
        $supervisor->admins()->attach(Auth::id(), ['action' => 'delete']);
        $supervisor->delete();
        return $this->success(null, 'تم حذف المشرف الجامعي بنجاح');
    }
}
