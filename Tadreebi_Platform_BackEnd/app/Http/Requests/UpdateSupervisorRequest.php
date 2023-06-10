<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateSupervisorRequest extends FormRequest
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
        // The ID of the supervisor whose record is being updated
        $supervisorId = $this->route('supervisor')->id;
        return [
            'university' => 'required|string|max:255',
            'college' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'section' => 'required',
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('users')->ignore($supervisorId),
            ],
        ];
    }
}
