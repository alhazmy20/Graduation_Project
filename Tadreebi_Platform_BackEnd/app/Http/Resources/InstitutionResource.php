<?php

namespace App\Http\Resources;

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
        return [
            'id' => $this->id,
            'institutionName' => $this->institutionName,
            'institutionField' => $this->institutionField,
            'institutionSector' => $this->institutionSector,
            'institutionEmail' => $this->user->email,
            'institutionPhone' => $this->institutionPhone,
            'managerEmail' => $this->managerEmail,
            'managerPhone' => $this->managerPhone,
            'managerPosition' => $this->managerPosition,
            'fName' => $this->fName,
            'lName' => $this->lName,
            'isActive' => $this->when(Auth::check() && Auth::user()->hasRole('Admin'),$this->isActive),
            'region' => $this->region,
            'city' => $this->city,
            'status' => $this->deleted_at == null ? 'نشط' : 'غير نشط',
            'logo' => [
                'logo_filename' => $this->logo_filename,
                'logo_url' => $this->logo_url,
            ],
        ];
    }
}
