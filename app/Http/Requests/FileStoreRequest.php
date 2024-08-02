<?php

namespace App\Http\Requests;

use App\Enum\FileCategory;
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
                'string',
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
            'category' => [
                'required',
                Rule::enum(FileCategory::class),
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
}
