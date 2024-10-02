<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class LocationFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'regex:/^[A-Z]+$/', 'max:120'],
            'name' => ['required', 'regex:/^[A-Za-z ,.\-_]+$/', 'max:120'],
        ];
    }

    public function messages()
    {
        return [
            'id.regex' => ":attribute must contains only A-Z",
            'name.regex' => ":attribute must contains only A-Z or a-z or symbols in (  ,  .  -  _  )"
        ];  
    }
}
