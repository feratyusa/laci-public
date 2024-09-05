<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class BudgetDetailsFormRequest extends FormRequest
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
            // 'budget_id' => ['required', 'integer'],
            'details' => ['required', 'array'],
            'details.*.id' => ['nullable', 'integer'],
            'details.*.name' => ['required', 'regex:/^[A-Za-z ]/'],
            'details.*.value' => ['required', 'integer']
        ];
    }

    public function messages(): array
    {
        return[
            'details.*.name.regex' => 'The :attribute must only contains alphabet and whitespace'
        ];
    }
}
