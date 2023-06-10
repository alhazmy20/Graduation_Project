<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (in_array($request->method(), ['POST', 'PUT', 'DELETE'])) {
            $token = $request->header('X-CSRF-TOKEN') ?: $request->input('_token');
            if (! csrf_token() == $token) {
                return response()->json([
                    'message' => 'CSRF token mismatch'
                ], 401);
            }
        }

        return $next($request);
    }
}
