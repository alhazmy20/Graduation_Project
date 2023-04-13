<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public static $wrap = null;

    public function toArray($request)
    {

        return [
            'id' => $this->id,
            'title' => $this->title,
            'content' => $this->content,
            't_type' => $this->t_type,
            'reward' => $this->reward == 1 ? 'يوجد' : 'لا يوجد',
            'gender' => ($this->gender == 2) ? 'الكل' : (($this->gender == 0) ? 'ذكر' : 'أنثى'),
            'region' => $this->region,
            'city' => $this->city,
            't_startDate' => $this->t_startDate,
            't_endDate' => $this->t_endDate,
            'p_endDate' => $this->p_endDate,
            'created_at' => $this->created_at->locale('ar')->diffForHumans(),
            'postStatus' => $this->when(Auth::check() && Auth::user()->hasRole(['Admin', 'Institution']), function () {
                return $this->p_endDate > now() ? 'نشط' : 'مغلق';
            }),
            'postMajorsCount' => $this->whenLoaded('postMajors', function () {
                return $this->postMajors()->count();
            }),
            'post_majors' => PostMajorsResource::collection($this->whenLoaded('postMajors')),
        ];
    }
}
