<?php

namespace App\Providers;

use App\Models\Admin;
use App\Models\Institution;
use App\Models\News;
use App\Models\Post;
use App\Models\PostMajor;
use App\Models\Student;
use App\Models\StudentFiles;
use App\Models\Supervisor;
use App\Observers\AdminObserver;
use App\Observers\InstitutionObserver;
use App\Observers\NewsObserver;
use App\Observers\PostMajorObserver;
use App\Observers\PostObserver;
use App\Observers\SupervisorObserver;
use App\Observers\StudentObserver;
use App\Observers\StudentFilesObserver;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        JsonResource::withoutWrapping();
        Admin::observe(AdminObserver::class);
        Institution::observe(InstitutionObserver::class);
        News::observe(NewsObserver::class);
        PostMajor::observe(PostMajorObserver::class);
        Post::observe(PostObserver::class);
        Supervisor::observe(SupervisorObserver::class);
        Student::observe(StudentObserver::class);
        StudentFiles::observe(StudentFilesObserver::class);
    }
}
