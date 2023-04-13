<?php

namespace App\Http\Controllers\Auth;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    use HttpResponses;

    public function login(LoginRequest $request)
    {
        $validated = $request->validated();
        $user = User::with(['institution', 'student', 'admin'])
            ->where('email', $validated['email'])
            ->firstOrFail();
        if (Auth::guard('web')->once(['email' => $validated['email'], 'password' => $validated['password']])) {
            if ((!empty($user->institution) && $user->institution->isActive) || (!empty($user->student) || !empty($user->admin))) {
                return $this->success([
                    'user' => $user,
                    'token' => $user->createToken($user->email)->plainTextToken
                ]);
            } else {
                return $this->error('', 'لم يتم تنشيط هذا الحساب بعد ، يرجى الانتظار', 401);
            }
        }
        return $this->error('', 'خطأ بالإيميل المدخل او كلمة المرور', 401);
    }

    public function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->success('', 'تم تسجيل الخروج بنجاح');
    }

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
}
