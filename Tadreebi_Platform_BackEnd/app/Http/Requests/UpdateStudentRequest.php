<?php

namespace App\Http\Requests;

use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
        //Get the student who is making the request
        $student = $this->route('student');
        return [
            'fName' => 'required|string|max:255',
            'sName' => 'required|string|max:255',
            'tName' => 'required|string|max:255',
            'lName' => 'required|string|max:255',
            'gender' => 'required|numeric',
            'national_ID' => 'required|string|max:10',
            'university' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($student->id),
            ],
            'phone' => [
                'required',
                'numeric',
                'digits:10',
                Rule::unique('students')->ignore($student->id),
                new PhoneRule
            ],
            'GPA' => [
                'required',
                'numeric',
                'between:0,' . $student->GPA_Type
            ],
            'GPA_Type' => 'required|numeric',
            'transcript' => 'mimes:pdf|max:5000',
            'nationalID' => 'mimes:pdf|max:5000',
            'CV' => 'mimes:pdf|max:5000',
            'internshipLetter' => 'mimes:pdf|max:5000',
        ];
    }
}
