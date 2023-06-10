<?php

namespace App\Http\Resources;

use App\Helpers\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $response = [];
        if (!is_null($this->admin)) {
            $response['id'] = $this->admin->id;
            $response['name'] = $this->admin->fName . ' ' . $this->admin->lName;
        }
        if (!is_null($this->institution)) {
            $response['id'] = $this->institution->id;
            $response['name'] = $this->institution->institutionName;
            $response['logo'] = $this->institution->logo_url;
        }
        if (!is_null($this->student)) {
            $response['id'] = $this->student->id;
            $response['name'] = $this->student->fName . ' ' . $this->student->lName;
            $response['logo'] = $this->student->studentFiles->personalPicture_url;
        }
        if (!is_null($this->supervisor)) {
            $response['id'] = $this->supervisor->id;
            $response['name'] = $this->supervisor->department;
        }
        $response += ['role' => UserRole::isSuperAdmin() ? 'SuperAdmin' : $this->roles[0]['name']];
        return $response;
    }
}
