<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentResource extends JsonResource
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'fullName' => $this->fName . ' ' . $this->sName . ' ' . $this->tName . ' ' . $this->lName,
            'phone' => $this->phone,
            'gender' => $this->gender == 0 ? 'ذكر' : 'أنثى',
            'national_ID' => $this->national_ID,
            'university' => $this->university,
            'major' => $this->major,
            'GPA' => $this->GPA,
            'GPA_Type' => $this->GPA_Type,
            'status' => $this->deleted_at == null ? 'نشط' : 'غير نشط',
            'created_at' => $this->created_at->format('Y-m-d'),
            'studentFiles' => new StudentFilesResource($this->whenLoaded('studentFiles')),
        ];
    }

}
