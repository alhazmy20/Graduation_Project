<?php

namespace App\Console\Commands;

use App\Events\ApplicationStatusUpdated;
use App\Helpers\ApplicationStatus;
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
    protected $signature = 'CancelApplications';

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
        $applications = Application::where('status_id', ApplicationStatus::WAITING_STUDENT_APPROVAL)
            ->where('updated_at', '<=', Carbon::now()->subHours(48))
            ->get();

        foreach ($applications as $application) {
            $application->status_id = ApplicationStatus::CANCELED;
            $application->save();
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
