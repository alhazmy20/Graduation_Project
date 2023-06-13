<?php

namespace App\Http\Controllers;

use App\Helpers\UserRole;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Traits\HttpResponses;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;


class PostController extends Controller
{
    use HttpResponses;

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        if (UserRole::isAdmin()) {
            return $this->success(PostResource::collection(Post::withoutTrashed()->with('institution')->latest()->get()));
        } elseif (UserRole::isInstitution()) {
            return $this->success(PostResource::collection(Post::withoutTrashed()->where('institution_id', Auth::id())->latest()->get()));
        } else {
            return $this->success(
                PostResource::collection(
                    QueryBuilder::for (Post::class)
                        ->withoutTrashed()
                        ->allowedFilters([
                            'region',
                            'city',
                            AllowedFilter::callback('major', function ($query, $value) {
                                return $query->whereHas('postMajors', function ($query) use ($value) {
                                    $query->where('major', $value);
                                });
                            }),
                        ])
                        ->whereDate('p_endDate', '>', Carbon::now()->addDay()->format('Y-m-d'))
                        ->with('postMajors')
                        ->latest()
                        ->get()
                )
            );
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StorePostRequest $request)
    {
        $validated = $request->validated();
        $post = Post::create(array_merge($validated, ['institution_id' => Auth::id()]));
        $post->postMajors()->createMany(array_map(function ($major) use ($post) {
            return [
                'post_id' => $post->id,
                'major' => $major['major'],
                'SCC' => substr($major['SCC'], 0, 2),
            ];
        }, $validated['majors']));
        return $this->success(new PostResource($post), 'تم انشاء الفرصة التدريبية بنجاح', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Post $post)
    {
        $studentApplied = $post->applications()->where('student_id', Auth::id())->exists();
        //Check who has access to see the post if it is already ended
        if (
            // check if the post did not end yet
            $post->p_endDate > Carbon::now()->addDay()->format('Y-m-d') ||
            $post->institution_id == Auth::id() ||
            UserRole::isAdmin() ||
            UserRole::isSupervisor() ||
                // check if the post ended but the student has been applied to the post
            ($post->p_endDate <= Carbon::now()->addDay()->format('Y-m-d') && $studentApplied)
        ) {
            return $this->success(new PostResource($post->load(['postMajors', 'institution'])));
        }
        return $this->error(null, 'تم انتهاء الفرصة التدريبة هذه', 403);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        if (!UserRole::isAdmin() && Auth::id() != $post->institution_id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل هذه الفرصة التدريبية ', 403);
        }
        $validated = $request->validated();
        $post->update($validated);
        $post->postMajors()->whereNotIn('major', array_column($validated['majors'], 'major'))->delete();
        foreach ($validated['majors'] as $major) {
            $post->postMajors()->updateOrCreate(
                ['major' => $major['major']],
                ['SCC' => substr($major['SCC'], 0, 2)]
            );
        }
        return $this->success(new PostResource($post->load('postMajors')), 'تم تعديل بيانات فرصة التدريب بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Post $post)
    {
        if (!UserRole::isAdmin() && Auth::id() != $post->institution_id) {
            return $this->error(null, 'ليس لديك صلاحية لحذف هذه الفرصة التدريبية', 403);
        }
        $post->delete();
        return $this->success(null, 'تم حذف الفرصة التدريبية بنجاح');
    }
}
