<?php

namespace App\Listeners;

use App\Events\ApplicationStatusUpdated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\ApplicationStatusUpdatedNotification;

class ApplicationStatusUpdatedListener
{
    use InteractsWithQueue;

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
     * @param  \App\Events\ApplicationStatusUpdated  $event
     * @return void
     */
    public function handle(ApplicationStatusUpdated $event)
    {
        $studentEmail = $event->studentEmail;
        $newsStatus = $event->newStatus;
        $postName = $event->postName;
        Mail::to($studentEmail)->send(new ApplicationStatusUpdatedNotification($newsStatus,$postName));
    }
}
