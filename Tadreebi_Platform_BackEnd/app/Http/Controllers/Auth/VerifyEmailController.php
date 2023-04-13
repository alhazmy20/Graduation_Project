<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Auth\Events\Verified;
use Illuminate\Http\JsonResponse;

class VerifyEmailController extends Controller
{
    public function verify($id)
    {
        $user = User::findOrFail($id);
        if (!$user->hasVerifiedEmail()) {
            $user->markEmailAsVerified();
            event(new Verified($user));
            return request()->wantsJson()
                ? new JsonResponse('', 204)
                : redirect()->away(env('SPA_URL'));
        }
        return request()->wantsJson()
            ? new JsonResponse('', 204)
            : redirect()->away(env('SPA_URL'));

    }

    public function resend()
    {
        request()->user()->sendEmailVerificationNotification();
        return response([
            'data' => [
                'message' => 'Request has been sent!',
            ]
        ]);
    }
}
