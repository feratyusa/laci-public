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
            'name' => ['required', 'string', 'max:20'],
            'nugie_id' => ['required', 'integer'],
            'course_rules' => ['required', 'array'],
            'course_rules.*.type' => ['required', 'string'],
            'course_rules.*.prefix' => ['nullable', 'string'],
            'course_rules.*.index' => ['required', 'numeric'],
            'course_rules.*.child' => ['required', 'numeric'],
            'course_rules.*.column' => ['required', 'string'],  
            'course_rules.*.verb' => ['required', 'string'],
            'course_rules.*.parameter' => ['required', 'string'],           
            'emp_rules' => ['required', 'array'],
            'emp_rules.*.type' => ['required', 'string'],
            'emp_rules.*.prefix' => ['nullable', 'string'],
            'emp_rules.*.index' => ['required', 'numeric'],
            'emp_rules.*.child' => ['required', 'numeric'],
            'emp_rules.*.column' => ['required', 'string'],  
            'emp_rules.*.verb' => ['required', 'string'],
            'emp_rules.*.parameter' => ['required', 'string'],
        ];
    }
}
