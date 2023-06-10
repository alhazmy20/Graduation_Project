<?php

namespace App\Http\Resources;

use App\Helpers\UserRole;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class InstitutionResource extends JsonResource
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
            'institutionName' => $this->institutionName,
            'institutionField' => $this->institutionField,
            'institutionSector' => $this->institutionSector,
            'institutionSummary' => $this->institutionSummary,
            'region' => $this->region,
            'city' => $this->city,
            'logo' => [
                'logo_filename' => $this->logo_filename,
                'logo_url' => $this->logo_url,
            ],
            'isActive' => $this->when(UserRole::isAdmin(), $this->isActive),
            'created_at' => $this->when(UserRole::isAdmin(), $this->created_at->format('Y-m-d')),
        ];
        if (UserRole::isAdmin() || UserRole::isSupervisor() || $this->id == Auth::id()) {
            $response += [
                'email' => $this->user->email,
                'institutionPhone' => $this->institutionPhone,
                'managerEmail' => $this->managerEmail,
                'managerPhone' => $this->managerPhone,
                'managerPosition' => $this->managerPosition,
                'fName' => $this->fName,
                'lName' => $this->lName,
            ];
        }
        return $response;
    }
}
