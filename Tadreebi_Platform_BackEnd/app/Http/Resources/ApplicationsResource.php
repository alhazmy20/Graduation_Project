<?php

namespace App\Http\Resources;

use App\Helpers\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;

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
        ];
        if (UserRole::isStudent() || UserRole::isSupervisor()) {
            $response += [
                'institutionId' => $this->post->institution->id,
                'institutionName' => $this->post->institution->institutionName,
                'postId' => $this->post->id,
                'postTitle' => $this->post->title,
            ];
        }
        if (UserRole::isInstitution() || UserRole::isSupervisor()) {
            $response['students'] = new StudentResource($this->whenLoaded('student'));
        }
        return $response;
    }
}
