<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePostRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            't_type' => 'required',
            'reward' => 'required|boolean',
            'gender' => 'required|numeric',
            'region' => 'required|string',
            'city' => 'required|string',
            't_startDate' => 'required|date_format:Y-m-d',
            't_endDate' => 'required|date_format:Y-m-d',
            'p_endDate' => 'required|date_format:Y-m-d',
            'majors' => 'required|array|min:1',
            'majors.*' => 'required|array|size:2'
        ];
    }
}
