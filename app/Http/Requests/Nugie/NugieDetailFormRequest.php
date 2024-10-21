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
            'rules' => ['required', 'array'],
            'rules.*.type' => ['required', 'string'],
            'rules.*.prefix' => ['required', 'string'],
            'rules.*.index' => ['required', 'string'],
            'rules.*.child' => ['required', 'string'],
            'rules.*.column' => ['required', 'string'],  
            'rules.*.verb' => ['required', 'string'],
            'rules.*.parameters' => ['required', 'array'],
            'rules.*.parameters.*' => ['required', 'string'],
        ];
    }
}
