<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ApplicationStatusUpdated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $studentEmail;
    public $newStatus;
    public $postName;
    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct($studentEmail, $newStatus,$postName)
    {
        $this->studentEmail = $studentEmail;
        $this->newStatus = $newStatus;
        $this->postName = $postName;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}
