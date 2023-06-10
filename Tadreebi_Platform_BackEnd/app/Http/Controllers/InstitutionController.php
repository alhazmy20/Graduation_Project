<?php

namespace App\Http\Controllers;

use App\Events\InstitutionStatusUpdated;
use App\Helpers\UserRole;
use App\Http\Requests\UpdateInstitutionActivationStatusRequest;
use App\Http\Requests\UpdateInstitutionLogoRequest;
use App\Models\Institution;
use App\Http\Requests\StoreInstitutionRequest;
use App\Http\Requests\UpdateInstitutionRequest;
use App\Http\Resources\InstitutionResource;
use App\Models\User;
use App\Services\UserService;
use App\Traits\DeleteFiles;
use App\Traits\HttpResponses;
use App\Traits\UploadFiles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class InstitutionController extends Controller
{
    use HttpResponses, UploadFiles, DeleteFiles;

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
        return $this->success(InstitutionResource::collection(Institution::withoutTrashed()->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreInstitutionRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreInstitutionRequest $request)
    {
        $validated = $request->validated();
        $user = $this->userService->store($validated['email'], $validated['password']);
        $user->assignRole('Institution');
        $institution = Institution::create(array_merge($validated, ['id' => $user->id]));
        return $this->success(new InstitutionResource($institution), 'تم التسجيل بنجاح يرجى الإنتظار حتى يتم تنشيط الحساب من قبل إحدى المشرفين', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Institution $institution)
    {
        return $this->success(new InstitutionResource($institution));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstitutionRequest  $request
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateInstitutionRequest $request, Institution $institution)
    {
        if (!UserRole::isAdmin() && Auth::id() != $institution->id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل بيانات هذه المنشأة ', 403);
        }
        $validated = $request->validated();
        $this->userService->update($institution->id, $validated['email']);
        $institution->update($validated);
        return $this->success(new InstitutionResource($institution->fresh()), 'تم تعديل بيانات المنشأة بنجاح');
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstitutionLogoRequest  $request
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\JsonResponse
     */

    public function handleImage(UpdateInstitutionLogoRequest $request, Institution $institution)
    {
        if ($request->has('deleteInstitutionLogo')) {
            $this->deleteImage($request, $institution->id);
            return $this->success(new InstitutionResource($institution->fresh()), 'تم حذف شعار المنشأة بنجاح');
        }
        if ($request->has('logo')) {
            $this->uploadFiles($request, $institution->id);
            return $this->success(new InstitutionResource($institution->fresh()), 'تم رفع شعار المنشأة بنجاح');
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstitutionActivationStatusRequest  $request
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\JsonResponse
     */
    public function updateActivationStatus(UpdateInstitutionActivationStatusRequest $request, Institution $institution)
    {
        $validated = $request->validated();
        $institution->update($validated);
        event(new InstitutionStatusUpdated($institution->user->email, $validated['isActive']));
        return $this->success(new InstitutionResource($institution->fresh()), 'تم تعديل حالة المنشأة المنشأة بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Institution $institution)
    {
        $institution->delete();
        return $this->success(null, 'تم حذف المنشأة بنجاح');
    }
}
