<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ApplicationStatusUpdatedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public $newStatus;
    public $postName;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($newStatus, $postName)
    {
        $this->newStatus = $newStatus;
        $this->postName = $postName;
    }

    public function build()
    {
        return $this->markdown('emails.application-status-updated')
            ->subject('اشعار : تحديث حالة الطلب للفرصة التدريبية ' . $this->postName)
            ->with([
                'newStatus', $this->newStatus,
                'postName', $this->postName
            ]);
    }

}
