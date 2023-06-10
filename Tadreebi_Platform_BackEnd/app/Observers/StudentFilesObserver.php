<?php

namespace App\Observers;

use App\Models\StudentFiles;
use Illuminate\Support\Facades\Cache;

class StudentFilesObserver
{
    /**
     * Handle the StudentFiles "created" event.
     *
     * @param  \App\Models\StudentFiles  $studentFiles
     * @return void
     */
    public function created(StudentFiles $studentFiles)
    {
        Cache::forget('supervisor_students');
        Cache::forget('admin_students');
    }

    /**
     * Handle the StudentFiles "updated" event.
     *
     * @param  \App\Models\StudentFiles  $studentFiles
     * @return void
     */
    public function updated(StudentFiles $studentFiles)
    {
        Cache::forget('supervisor_students');
        Cache::forget('admin_students');
    }

    /**
     * Handle the StudentFiles "deleted" event.
     *
     * @param  \App\Models\StudentFiles  $studentFiles
     * @return void
     */
    public function deleted(StudentFiles $studentFiles)
    {
        Cache::forget('supervisor_students');
        Cache::forget('admin_students');
    }

    /**
     * Handle the StudentFiles "restored" event.
     *
     * @param  \App\Models\StudentFiles  $studentFiles
     * @return void
     */
    public function restored(StudentFiles $studentFiles)
    {
        //
    }

    /**
     * Handle the StudentFiles "force deleted" event.
     *
     * @param  \App\Models\StudentFiles  $studentFiles
     * @return void
     */
    public function forceDeleted(StudentFiles $studentFiles)
    {
        //
    }
}
