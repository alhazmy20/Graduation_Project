<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use App\Traits\HttpResponses;
use App\Traits\UploadFiles;
use Illuminate\Support\Facades\Auth;

class NewsController extends Controller
{
    use HttpResponses, UploadFiles;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->success(NewsResource::collection(News::latest()->paginate(8))->resource);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreNewsRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreNewsRequest $request)
    {

        $validated = $request->validated();
        $news = News::create($validated);
        if ($request->has('newsLogo')) {
            $this->upload($request, $news->id);
        }
        $news->admins()->attach(Auth::id(), ['action' => 'store']);
        return $this->success(new NewsResource($news->fresh()), 'تم انشاء الخبر بنجاح', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function show(News $news)
    {
        return $this->success(new NewsResource($news));

    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateNewsRequest  $request
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateNewsRequest $request, News $news)
    {
        $validated = $request->validated();
        $news->update($validated);
        if ($request->has('newsLogo')) {
            $this->upload($request, $news->id);
        }
        $news->admins()->attach(Auth::id(), ['action' => 'update']);
        return $this->success(new NewsResource($news->fresh()), 'تم تحديث الخبر بنجاح');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\Response
     */
    public function destroy(News $news)
    {
        $news->admins()->attach(Auth::id(), ['action' => 'delete']);
        $news->delete();
        return $this->success('', 'تم حذف الخبر بنجاح');
    }
}
