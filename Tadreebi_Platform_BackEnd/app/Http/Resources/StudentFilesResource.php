<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class StudentFilesResource extends JsonResource
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
            'transcript_filename' => $this->transcript_filename,
            'transcript_url' => $this->transcript_url,
            'CV_filename' => $this->CV_filename,
            'CV_url' => $this->CV_url,
            'internshipLetter_filename' => $this->internshipLetter_filename,
            'internshipLetter_url' => $this->internshipLetter_url,
            'nationalID_filename' => $this->nationalID_filename,
            'nationalID_url' => $this->nationalID_url,
            'personalPicture_filename' => $this->personalPicture_filename,
            'personalPicture_url' => $this->personalPicture_url
        ];
    }
}
