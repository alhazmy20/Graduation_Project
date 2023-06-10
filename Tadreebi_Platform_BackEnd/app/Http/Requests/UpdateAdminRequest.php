<?php

namespace App\Http\Requests;

use App\Rules\PhoneRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateAdminRequest extends FormRequest
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
        // The ID of the admin whose record is being updated
        $adminId = $this->route('admin')->id;
        return [
            'fName' => 'required|string|max:255',
            'lName' => 'required|string|max:255',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($adminId),
            ],
            'phone' => [
                'required',
                'numeric',
                'digits:10',
                new PhoneRule,
                Rule::unique('admins')->ignore($adminId),
            ],
        ];
    }
}
