<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class AdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fName' => $this->fName,
            'lName' => $this->lName,
            'email' => $this->user->email,
            'phone' => $this->phone,
            'created_at' => $this->created_at->format('Y-m-d')
        ];
    }
}
