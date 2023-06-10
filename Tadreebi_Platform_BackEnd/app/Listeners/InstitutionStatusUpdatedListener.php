<?php

namespace App\Listeners;

use App\Events\InstitutionStatusUpdated;
use App\Mail\InstitutionStatusUpdatedNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;

class InstitutionStatusUpdatedListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  \App\Events\InstitutionStatusUpdated  $event
     * @return void
     */
    public function handle(InstitutionStatusUpdated $event)
    {
       $institutionEmail = $event->institutionEmail;
       $activationStatus = $event->activationStatus;
       Mail::to($institutionEmail)->send(new InstitutionStatusUpdatedNotification($activationStatus));
    }
}
