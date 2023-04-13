<?php

namespace App\Http\Requests;

use App\Rules\PasswordRule;
use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreAdminRequest extends FormRequest
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
            'fName' => 'required|string|max:255',
            'lName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => ['required','string','confirmed',new PasswordRule],
            'password_confirmation' => 'required|string',
            'phone' => [
                'required',
                'numeric',
                'digits:10',
                new PhoneRule,
                'unique:admins'
            ],
        ];
    }
}
