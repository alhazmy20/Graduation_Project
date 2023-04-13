<?php

namespace App\Http\Requests;

use App\Rules\PhoneRule;
use App\Rules\UniqueEmailForInstitutionUpdate;
use App\Rules\UniqueManagerEmailForInstitutionUpdate;
use App\Rules\UniqueManagerPhoneForInstitutionUpdate;
use App\Rules\UniqueInstituionPhoneForInstitutionUpdate;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
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
      return [
            'institutionName' => 'required|string|max:255',
            'institutionSector' => 'required|string|max:255',
            'institutionField' => 'required|string|max:255',
            'institutionPhone' => [
                'required',
                'numeric',
                'digits:10',
                new UniqueInstituionPhoneForInstitutionUpdate($this->institution),
                new PhoneRule
            ],
            'managerEmail' => [
                'required',
                'string',
                'max:255',
                new UniqueManagerEmailForInstitutionUpdate($this->institution),
            ],
            'managerPhone' => [
                'required',
                'numeric',
                'digits:10',
                new UniqueManagerPhoneForInstitutionUpdate($this->institution),
                new PhoneRule
            ],
            'isActive' => 'numeric',
            'managerPosition' => 'required|string|max:255',
            'fName' => 'required|string|max:255',
            'lName' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'max:255',
                new UniqueEmailForInstitutionUpdate($this->institution),
            ],
            'logo' => 'mimes:png,jpg,jpeg|max:5000'
        ];
    }
}
