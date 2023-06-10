<?php

namespace App\Observers;

use App\Models\PostMajor;
use Illuminate\Support\Facades\Cache;

class PostMajorObserver
{
    /**
     * Handle the PostMajor "created" event.
     *
     * @param  \App\Models\PostMajor  $postMajor
     * @return void
     */
    public function created(PostMajor $postMajor)
    {
        Cache::forget('admin_posts');
        Cache::forget('institution_posts');
        Cache::forget('posts');
    }

    /**
     * Handle the PostMajor "updated" event.
     *
     * @param  \App\Models\PostMajor  $postMajor
     * @return void
     */
    public function updated(PostMajor $postMajor)
    {
        Cache::forget('admin_posts');
        Cache::forget('institution_posts');
        Cache::forget('posts');
    }

    /**
     * Handle the PostMajor "deleted" event.
     *
     * @param  \App\Models\PostMajor  $postMajor
     * @return void
     */
    public function deleted(PostMajor $postMajor)
    {
        Cache::forget('admin_posts');
        Cache::forget('institution_posts');
        Cache::forget('posts');
    }
    /**
     * Handle the PostMajor "restored" event.
     *
     * @param  \App\Models\PostMajor  $postMajor
     * @return void
     */
    public function restored(PostMajor $postMajor)
    {
        //
    }

    /**
     * Handle the PostMajor "force deleted" event.
     *
     * @param  \App\Models\PostMajor  $postMajor
     * @return void
     */
    public function forceDeleted(PostMajor $postMajor)
    {
        //
    }
}
