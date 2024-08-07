<?php

namespace App\Http\Requests;

use App\Enum\FileCategory;
use App\Models\File\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class FileStoreRequest extends FormRequest
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
            'name' => [
                'required',
                'regex:/^[A-Za-z0-9_\- ]+$/i',
                'max:120',
            ],
            'relation' => [
                'nullable',
                Rule::in('proposal', 'event'),
            ],
            'relation_id' => [
                'nullable',
                'integer'
            ],
            'category_id' => [
                'required',
                Rule::in(Category::pluck('id')->toArray())
            ],
            'files' => [
                'required',
                'array'
            ],
            'files.*' => [
                File::types(['pdf', 'doc', 'docx'])
                    ->max('100mb')
            ]
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.regex' => 'The :attribute field format must only contains alphabet, number, dash, and underscore',
        ];
    }
}
