<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Contracts\Auth\MustVerifyEmail;


class MyEnsureEmailIsVerified
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (
            !$request->user() ||
            ($request->user() instanceof MustVerifyEmail &&
                !$request->user()->hasVerifiedEmail())
        ) {
            return $request->expectsJson()
                ? abort(403, 'لم يتم التحقق من عنوان بريدك الإلكتروني بعد. تم إرسال بريد تفعيل إلى عنوان بريدك الإلكتروني، الرجاء التحقق من صندوق البريد الوارد ومجلد الرسائل غير المرغوب فيها.') // replace with your message, or path to translation
                : Redirect::route('verification.notice');
        }

        return $next($request);
    }
}
