<?php

namespace App\Http\Controllers;

use App\Helpers\UserRole;
use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use App\Services\UserService;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;


class AdminController extends Controller
{
    use HttpResponses;

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
        return $this->success(AdminResource::collection(Admin::withoutTrashed()->get()));

    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreAdminRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreAdminRequest $request)
    {
        $validated = $request->validated();
        $user = $this->userService->store($validated['email'], $validated['password']);
        $user->assignRole('Admin');
        $admin = Admin::create(array_merge($validated, ['id' => $user->id]));
        return $this->success(new AdminResource($admin), 'تم انشاء الحساب بنجاح', 201);
    }
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Admin $admin)
    {
        if (!UserRole::isSuperAdmin() && Auth::id() !== $admin->id) {
            return $this->error(null, 'ليس لديك صلاحية لمشاهدة بيانات هذا المشرف', 403);
        }
        return $this->success(new AdminResource($admin));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateAdminRequest  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        $validated = $request->validated();
        $this->userService->update($admin->id, $validated['email']);
        $admin->update($validated);
        return $this->success(new AdminResource($admin), 'تم تعديل بيانات المشرف بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Admin $admin)
    {
        $admin->delete();
        return $this->success(null, 'تم حذف المشرف بنجاح');
    }
}
