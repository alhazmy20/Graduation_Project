<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ApplicationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $response = [
            'id' => $this->id,
            'status' => $this->status->name,
            'created_at' => $this->created_at->format('Y-m-d'),
            'student' => new StudentResource($this->whenLoaded('student')),
        ];
        if (Auth::check() && Auth::user()->hasRole('Student')) {
            $post = new PostResource($this->whenLoaded('post'));
            $response['post'] = $post->title;
            $response['instituion'] = $post->institution->institutionName;
        }
        return $response;
    }
}
