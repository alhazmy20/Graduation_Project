<?php

namespace App\Http\Requests;

use App\Rules\PhoneRule;
use App\Rules\UniqueStudentPhoneForStudentUpdate;
use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {

        return [
            'phone' => [
                'required',
                'numeric',
                'digits:10',
                new UniqueStudentPhoneForStudentUpdate($this->student),
                new PhoneRule
            ],
            'GPA' => [
                'required',
                'numeric',
                'between:0,' . $this->route('student')->GPA_Type
            ],
            'personalPicture' => 'mimes:png,jpg,jpeg|max:5000',
            'transcript' => 'mimes:pdf|max:5000',
            'nationalID' => 'mimes:pdf|max:5000',
            'CV' => 'mimes:pdf|max:5000',
            'internshipLetter' => 'mimes:pdf|max:5000',
            'isPersonalPictureDeleted' => 'string'
        ];
    }
}
