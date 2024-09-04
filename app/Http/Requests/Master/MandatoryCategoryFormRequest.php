<?php

namespace App\Http\Requests\Master;

use App\Enum\MandatoryCategoryLink;
use App\Models\File\Category;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class MandatoryCategoryFormRequest extends FormRequest
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
            'mandatory_type' => ['required', Rule::in(array_column(MandatoryCategoryLink::cases(), 'value'))],
            'categories' => ['required', 'array'],
            'categories.*' => [Rule::in(Category::pluck('id')->toArray())],
        ];
    }
}
