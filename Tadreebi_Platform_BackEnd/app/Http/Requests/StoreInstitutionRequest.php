<?php

namespace App\Http\Requests;

use App\Rules\PasswordRule;
use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreInstitutionRequest extends FormRequest
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
                'unique:institutions'
            ],
            'managerEmail' => 'required|string|email|max:255|unique:institutions',
            'managerPhone' => [
                'required',
                'numeric',
                'digits:10',
                new PhoneRule,
                'unique:institutions'
            ],
            'managerPosition' => 'required|string|max:255',
            'fName' => 'required|string|max:255',
            'lName' => 'required|string|max:255',
            'region' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required', 'string', 'confirmed', new PasswordRule],
            'password_confirmation' => 'required|string',
        ];
    }
}
