<?php

namespace App\Http\Resources;

use App\Helpers\UserRole;
use Carbon\Carbon;
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
            'p_endTime' => $this->remainingTime(),
            'created_at' => $this->created_at->locale('ar')->diffForHumans(),
            'postStatus' => $this->when(UserRole::isAdmin() || UserRole::isInstitution(), function () {
                return $this->p_endDate > Carbon::now()->addDay()->format('Y-m-d') ? 'نشط' : 'مغلق';
            }),
            'postMajorsCount' => $this->whenLoaded('postMajors', function () {
                return $this->postMajors()->count();
            }),
            'post_majors' => PostMajorsResource::collection($this->whenLoaded('postMajors')),
            'institution' => $this->whenLoaded('institution', function () {
                return [
                    'institutionId' => $this->institution->id,
                    'institutionName' => $this->institution->institutionName,
                    'logo_url' => $this->institution->logo_url,
                ];
            })
        ];
    }
}
