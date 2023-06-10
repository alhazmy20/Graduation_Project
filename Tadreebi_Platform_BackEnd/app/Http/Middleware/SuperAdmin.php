<?php

namespace App\Http\Middleware;

use App\Helpers\UserRole;
use App\Traits\HttpResponses;
use Closure;
use Illuminate\Http\Request;

class SuperAdmin
{
    use HttpResponses;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(!UserRole::isSuperAdmin()){
            return $this->error(null,'ليس لديك صلاحية لتنفيذ هذه العملية',401);
        }
        return $next($request);
    }
}
