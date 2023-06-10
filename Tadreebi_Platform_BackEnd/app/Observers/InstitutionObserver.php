<?php

namespace App\Observers;

use App\Helpers\UserRole;
use App\Models\Institution;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class InstitutionObserver
{
    /**
     * Handle the Institution "created" event.
     *
     * @param  \App\Models\Institution  $institution
     * @return void
     */
    public function created(Institution $institution)
    {
        Cache::forget('institutions');
    }

    /**
     * Handle the Institution "updated" event.
     *
     * @param  \App\Models\Institution  $institution
     * @return void
     */
    public function updated(Institution $institution)
    {
        Cache::forget("institutions");
        if (UserRole::isAdmin()) {
            $institution->admins()->attach(Auth::id(), ['action' => 'update']);
        }
    }

    /**
     * Handle the Institution "deleted" event.
     *
     * @param  \App\Models\Institution  $institution
     * @return void
     */
    public function deleted(Institution $institution)
    {
        Cache::forget("institutions");
        $institution->admins()->attach(Auth::id(), ['action' => 'delete']);
    }

    /**
     * Handle the Institution "restored" event.
     *
     * @param  \App\Models\Institution  $institution
     * @return void
     */
    public function restored(Institution $institution)
    {
        //
    }

    /**
     * Handle the Institution "force deleted" event.
     *
     * @param  \App\Models\Institution  $institution
     * @return void
     */
    public function forceDeleted(Institution $institution)
    {
        //
    }
}
