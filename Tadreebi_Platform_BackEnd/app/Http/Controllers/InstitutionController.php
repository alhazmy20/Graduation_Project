<?php

namespace App\Http\Controllers;

use App\Models\Institution;
use App\Http\Requests\StoreInstitutionRequest;
use App\Http\Requests\UpdateInstitutionRequest;
use App\Http\Resources\InstitutionResource;
use App\Services\UserService;
use App\Traits\HttpResponses;
use App\Traits\UploadFiles;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;

class InstitutionController extends Controller
{
    use  HttpResponses, UploadFiles;

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
        if(Auth::check() && Auth::user()->hasRole('Admin')){
            return $this->success(InstitutionResource::collection(Institution::withTrashed()->paginate(8))->resource);
        }
        return $this->success(InstitutionResource::collection(Institution::paginate(8))->resource);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreInstitutionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInstitutionRequest $request)
    {
        $validated = $request->validated();
        $user = $this->userService->store($validated['email'], $validated['password']);
        $user->assignRole('Institution');
        $institution = Institution::create(array_merge($validated, ['id' => $user->id]));
        return $this->success(new InstitutionResource($institution), 'تم التسجيل بنجاح يرجى بإنتظار التفعيل من قبل المشرف', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function show(Institution $institution)
    {
        $isAdmin = Auth::user()->hasRole('Admin');
        if (!$isAdmin && Auth::id() != $institution->id) {
            return $this->error(null, 'ليس لديك صلاحية لعرض بيانات هذا الطالب ', 403);
        }
        return $this->success(new InstitutionResource($institution));
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstitutionRequest  $request
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInstitutionRequest $request, Institution $institution)
    {
        $isAdmin = Auth::check() && Auth::user()->hasRole('Admin');
        if (!$isAdmin && Auth::id() != $institution->id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل بيانات هذه المنشأة ', 403);
        }
        if ($isAdmin) {
            $institution->admins()->attach(Auth::id(), ['action' => 'update']);
        }
        $validated = $request->validated();
        $this->userService->update($institution->id, $validated['email']);
        $institution->update($isAdmin ? $validated : Arr::except($validated,['isActive']));
        if ($request->has('logo')) {
            $this->upload($request, $institution->id);
        }
        return $this->success(new InstitutionResource($institution->fresh()), 'تم تعديل بيانات المنشأة بنجاح');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function destroy(Institution $institution)
    {
        $isAdmin = Auth::check() && Auth::user()->hasRole('Admin');
        if ($isAdmin) {
            $institution->admins()->attach(Auth::id(), ['action' => 'update']);
        }
        $this->userService->destroy($institution->id);
        $institution->delete();
        return $this->success(null, 'تم حذف المنشأة بنجاح');
    }
}
