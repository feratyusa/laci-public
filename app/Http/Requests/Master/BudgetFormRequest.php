<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class BudgetFormRequest extends FormRequest
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
            'year' => ['required', 'integer', 'digits:4'],
            'value' => ['required', 'integer']
        ];
    }
}
