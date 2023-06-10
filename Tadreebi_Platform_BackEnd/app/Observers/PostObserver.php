<?php

namespace App\Observers;

use App\Helpers\UserRole;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class PostObserver
{
    /**
     * Handle the Post "created" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function created(Post $post)
    {
        Cache::forget('admin_posts');
        Cache::forget('institution_posts');
        Cache::forget('posts');
    }

    /**
     * Handle the Post "updated" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function updated(Post $post)
    {
        Cache::forget('admin_posts');
        Cache::forget('institution_posts');
        Cache::forget('posts');
        if (UserRole::isAdmin()) {
            $post->admins()->attach(Auth::id(), ['action' => 'update']);
        }
    }

    /**
     * Handle the Post "deleted" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function deleted(Post $post)
    {
        Cache::forget('admin_posts');
        Cache::forget('institution_posts');
        Cache::forget('posts');
        if (UserRole::isAdmin()) {
            $post->admins()->attach(Auth::id(), ['action' => 'delete']);
        }
    }

    /**
     * Handle the Post "restored" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function restored(Post $post)
    {
        //
    }

    /**
     * Handle the Post "force deleted" event.
     *
     * @param  \App\Models\Post  $post
     * @return void
     */
    public function forceDeleted(Post $post)
    {
        //
    }
}
