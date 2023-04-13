<?php

namespace App\Console\Commands;

use App\Events\ApplicationStatusUpdated;
use App\Models\Application;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateApplicationStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'cancelApplications';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cancel students applications if it has status_id equal to 2 and passed 48 hour if the student did nothing to the application';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $applications = Application::where('status_id', 2)
            ->where('updated_at', '<=', Carbon::now()->subHours(48))
            ->get();

        foreach ($applications as $application) {
            $application->update(['status_id' => 5]);

            event(
                new ApplicationStatusUpdated(
                    $application->student->user->email,
                    $application->status->name,
                    $application->post->title
                )
            );
        }
    }
}
