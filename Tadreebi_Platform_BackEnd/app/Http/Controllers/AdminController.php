<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAdminRequest;
use App\Http\Requests\UpdateAdminRequest;
use App\Http\Resources\AdminResource;
use App\Models\Admin;
use App\Services\UserService;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Spatie\Permission\Models\Role;


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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->success(AdminResource::collection(Admin::paginate(8))->resource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function show(Admin $admin)
    {
        if (Auth::id() !== $admin->id) {
            return $this->error(null, 'ليس لديك صلاحية لمشاهدة بيانات هذا المشرف', 403);
        }
        return $this->success(new AdminResource($admin));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateAdminRequest $request, Admin $admin)
    {
        $validated = $request->validated();
        $this->userService->update($admin->id, $validated['email']);
        $admin = $admin->update($validated);
        return $this->success(new AdminResource($admin), 'تم تعديل بيانات المشرف بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Admin  $admin
     * @return \Illuminate\Http\Response
     */
    public function destroy(Admin $admin)
    {
        if ($admin->id !== 1) {
            return $this->error(null, 'ليس لديك صلاحية لحذف هذا المشرف', 403);
        }
        $this->userService->destroy($admin->id);
        $admin->delete();
        return $this->success(null, 'تم حذف المشرف بنجاح');
    }
}
