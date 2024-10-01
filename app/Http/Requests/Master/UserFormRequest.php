<?php

namespace App\Http\Requests\Master;

use Illuminate\Foundation\Http\FormRequest;

class UserFormRequest extends FormRequest
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
            'username' => ['required', 'alpha_num'],
            'password' => ['required', 'regex:/^[a-zA-Z0-9 +=\-_)(*&^%$#@!\]\[;:?.,><]+$/']
        ];
    }

    public function messages()
    {
        return[
            'password.regex' => [":attribute can only contains 'a-z A-Z 0-9 + = - _ ) ( * & ^ % $ # @ ! ] [ ; : ? . , > <'"]
        ];
    }
}
