<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\LoginResource;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     * @param  \App\Http\Requests\LoginRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $validated = $request->validated();
        $user = User::with(['institution', 'student', 'admin', 'supervisor'])
            ->firstWhere('email', $validated['email']);
        if (Auth::guard('web')->once($validated)) {
            if (is_null($user->email_verified_at)) {
                return $this->error(null, 'لم يتم تنشيط البريد الالكتروني، يرجى تنشيط بريدك الالكتروني لتسجيل الدخول', 401);
            }
            if ((!empty($user->institution) && !$user->institution->isActive)) {
                return $this->error(null, 'لم يتم تنشيط الحساب من قبل المشرفين بعد يرجى الانتظار', 403);
            }
            return $this->success([
                'user' => new LoginResource($user),
                'token' => $user->createToken($user->email)->plainTextToken
            ]);
        }
        return $this->error(null, 'خطأ بالبريد الإلكتروني المدخل او كلمة المرور', 403);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success(null, 'تم تسجيل الخروج بنجاح');
    }
    /**
     * Display a listing of the resource.
     * @param  \App\Http\Requests\ChangePasswordRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */

    public function changePassword(ChangePasswordRequest $request, User $user)
    {
        $validated = $request->validated();
        if (Auth::id() !== $user->id) {
            return $this->error(null, 'ليس لديك صلاحية لتغيير كلمة مرور هذا المستخدم', 403);
        }
        $user->update([
            'password' => Hash::make($validated['password'])
        ]);
        return $this->success(null, 'تم تغيير كلمة المرور بنجاح');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function csrf_token()
    {
        return $this->success(['csrf_token' => csrf_token()]);
    }
}
