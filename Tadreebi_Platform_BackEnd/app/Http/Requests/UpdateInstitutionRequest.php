<?php

namespace App\Http\Requests;

use App\Rules\InstitutionPhone;
use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;


class UpdateInstitutionRequest extends FormRequest
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
        // The ID of the institution whose record is being updated
        $institutionId = $this->route('institution')->id;
        return [
            'institutionName' => 'required|string|max:255',
            'institutionSector' => 'required|string|max:255',
            'institutionField' => 'required|string|max:255',
            'institutionSummary' => 'string|max:20000',
            'institutionPhone' => [
                'required',
                'numeric',
                'digits:10',
                Rule::unique('institutions')->ignore($institutionId),
                new InstitutionPhone
            ],
            'managerEmail' => [
                'required',
                'string',
                'max:255',
                Rule::unique('institutions')->ignore($institutionId),
            ],
            'managerPhone' => [
                'required',
                'numeric',
                'digits:10',
                Rule::unique('institutions')->ignore($institutionId),
                new PhoneRule
            ],
            'managerPosition' => 'required|string|max:255',
            'fName' => 'required|string|max:255',
            'lName' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users')->ignore($institutionId),
            ],
        ];
    }
}
