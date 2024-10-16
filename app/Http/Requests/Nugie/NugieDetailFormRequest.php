<?php

namespace App\Http\Requests\Nugie;

use Illuminate\Foundation\Http\FormRequest;

class NugieDetailFormRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'nugie_id' => ['required', 'integer'],
            'kd_kursus' => ['required', 'string'],
            'is_sql' => ['required', 'boolean'],
            'sql' => ['required_if:is_sql,1', 'string'],
            'rules' => ['required_if:is_sql,0', 'array'],
            'rules.*.column' => ['required_if:is_sql,0', 'string'],
            'rules.*.is_not' => ['required_if:is_sql,0', 'boolean'],
            'rules.*.parameter' => ['required_if:is_sql,0', 'string'],
        ];
    }
}
