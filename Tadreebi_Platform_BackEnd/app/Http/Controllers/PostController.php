<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\PostMajor;
use App\Traits\HttpResponses;
use Illuminate\Support\Facades\Auth;
use Spatie\QueryBuilder\AllowedFilter;
use Spatie\QueryBuilder\QueryBuilder;

class PostController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        if (Auth::check() && Auth::user()->hasRole('Admin')) {
            return $this->success(PostResource::collection(Post::latest()->paginate(8))->resource);
        } elseif (Auth::check() && Auth::user()->hasRole('Institution')) {
            return $this->success(PostResource::collection(Post::where('institution_id', Auth::id())->latest()->paginate(8))->resource);
        } else {
            $filteredPosts = QueryBuilder::for (Post::class)
                ->allowedFilters([
                    'region',
                    'city',
                    AllowedFilter::callback('major', function ($query, $value) {
                        return $query->whereHas('postMajors', function ($query) use ($value) {
                            $query->where('major', $value);
                        });
                    }),
                ])
                ->with('postMajors')
                ->latest()
                ->paginate(8);
            if ($filteredPosts->isEmpty()) {
                return $this->error(null, 'لا توجد فرص تدريب مطابقة لنتيجة البحث', 404);
            }
            return $this->success(PostResource::collection($filteredPosts)->resource);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StorePostRequest  $request
     * @return \Illuminate\Http\Response
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
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        $studentApplied = $post->applications()->where('student_id', Auth::id())->exists();
        //Check if the post ended and if the student did not apply to this post
        if ($post->p_endDate < now() && !$studentApplied) {
            return $this->error(null, 'تم انتهاء الفرصة التدريبة هذه', 404);
        }
        return $this->success(new PostResource($post->load('postMajors')));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdatePostRequest  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $isAdmin = Auth::check() && Auth::user()->hasRole('Admin');
        if (!$isAdmin && Auth::id() != $post->institution_id) {
            return $this->error(null, 'ليس لديك صلاحية لتعديل هذه الفرصة التدريبية ', 403);
        }
        if ($isAdmin) {
            $post->admins()->attach(Auth::id(), ['action' => 'update']);
        }
        $validated = $request->validated();
        $post->update($validated);
        $post->postMajors()->whereNotIn('major', array_column($validated['majors'], 'major'))->delete();
        $post->postMajors()->createMany(array_map(function ($major) use ($post) {
            return [
                'post_id' => $post->id,
                'major' => $major['major'],
                'SCC' => substr($major['SCC'], 0, 2),
            ];
        }, $validated['majors']));
        return $this->success(new PostResource($post->load('postMajors')), 'تم تعديل بيانات فرصة التدريب بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        $isAdmin = Auth::check() && Auth::user()->hasRole('Admin');
        if (!$isAdmin && Auth::id() != $post->institution_id) {
            return $this->error(null, 'ليس لديك صلاحية لحذف هذه الفرصة التدريبية', 403);
        }
        if ($isAdmin) {
            $post->admins()->attach(Auth::id(), ['action' => 'delete']);
        }
        $post->delete();
        return $this->success(null, 'تم حذف الفرصة التدريبية بنجاح');
    }
}
