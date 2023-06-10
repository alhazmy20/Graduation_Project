<?php

namespace App\Http\Controllers;

use App\Models\News;
use App\Http\Requests\StoreNewsRequest;
use App\Http\Requests\UpdateNewsRequest;
use App\Http\Resources\NewsResource;
use App\Traits\HttpResponses;
use App\Traits\UploadFiles;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class NewsController extends Controller
{
    use HttpResponses, UploadFiles;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        return $this->success(NewsResource::collection(News::withoutTrashed()->latest()->get()));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreNewsRequest  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(StoreNewsRequest $request)
    {
        $validated = $request->validated();
        $news = News::create($validated);
        if ($request->has('newsLogo')) {
            $this->uploadFiles($request, $news->id);
        }
        return $this->success(new NewsResource($news->fresh()), 'تم انشاء الخبر بنجاح', 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\JsonResponse
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
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(UpdateNewsRequest $request, News $news)
    {
        $validated = $request->validated();
        $news->update($validated);
        if ($request->has('newsLogo')) {
            $this->uploadFiles($request, $news->id);
            return $this->success(new NewsResource($news->fresh()), 'تم رفع الصورة بنجاح');
        }
        return $this->success(new NewsResource($news->fresh()), 'تم تحديث الخبر بنجاح');
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\News  $news
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(News $news)
    {
        $news->delete();
        return $this->success(null, 'تم حذف الخبر بنجاح');
    }
}
