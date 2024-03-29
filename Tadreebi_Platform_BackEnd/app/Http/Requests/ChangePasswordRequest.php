<?php

namespace App\Http\Requests;

use App\Rules\MatchOldPassword;
use App\Rules\PasswordRule;
use Illuminate\Foundation\Http\FormRequest;

class ChangePasswordRequest extends FormRequest
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
            'old_password' => ['required', 'string', new MatchOldPassword],
            'password' => ['required', 'string', 'confirmed', new PasswordRule],
            'password_confirmation' => 'required|string',
        ];
    }
}
