<?php

namespace App\Http\Requests;

use App\Models\File\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class FileUploadRequest extends FormRequest
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
            'name' => ['required', 'string', 'max:120'],
            'category' => [
                'required',
                Rule::in(Category::pluck('id')->toArray())
            ],
            'file' => [
                'required', 
                File::types(['pdf', 'jpg', 'png'])
                    ->max('100mb')
            ],
        ];
    }
}
