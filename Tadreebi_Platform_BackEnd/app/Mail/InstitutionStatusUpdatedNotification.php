<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class InstitutionStatusUpdatedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $activationStatus;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($activationStatus)
    {
        $this->activationStatus = $activationStatus;
    }
    public function build()
    {
        return $this->markdown('emails.institution-status-updated')
            ->subject('اشعار : تحديث حالة المنشأة')
            ->with($this->activationStatus);
    }

}
