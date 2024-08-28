<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CategoryFormRequest extends FormRequest
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
            'id' => ['required', 'regex:/^[A-Z]{2,5}$/'],
            'name' => ['required', 'regex:/^[A-Z ]+$/', 'max:120']
        ];
    }

    public function messages()
    {
        return [
            'id.regex' => 'The :attribute must be uppercase alphabet (A-Z) with length of 2 until 5 with no whitespace',
            'name.regex' => 'The :attribute must be uppercase alphabet (A-Z)'
        ];
    }
}
