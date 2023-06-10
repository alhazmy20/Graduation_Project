<?php

namespace App\Observers;

use App\Helpers\UserRole;
use App\Models\Supervisor;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class SupervisorObserver
{
    /**
     * Handle the Supervisor "created" event.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return void
     */
    public function created(Supervisor $supervisor)
    {
        Cache::forget('supervisors');
    }

    /**
     * Handle the Supervisor "updated" event.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return void
     */
    public function updated(Supervisor $supervisor)
    {
        Cache::forget('supervisors');
        if (UserRole::isAdmin()) {
            $supervisor->admins()->attach(Auth::id(), ['action' => 'update']);
        }
    }

    /**
     * Handle the Supervisor "deleted" event.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return void
     */
    public function deleted(Supervisor $supervisor)
    {
        Cache::forget('supervisors');
        if (UserRole::isAdmin()) {
            $supervisor->admins()->attach(Auth::id(), ['action' => 'delete']);
        }
    }
    /**
     * Handle the Supervisor "restored" event.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return void
     */
    public function restored(Supervisor $supervisor)
    {
        //
    }

    /**
     * Handle the Supervisor "force deleted" event.
     *
     * @param  \App\Models\Supervisor  $supervisor
     * @return void
     */
    public function forceDeleted(Supervisor $supervisor)
    {
        //
    }
}
