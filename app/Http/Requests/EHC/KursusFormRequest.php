<?php

namespace App\Http\Requests\EHC;

use Illuminate\Foundation\Http\FormRequest;

class KursusFormRequest extends FormRequest
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
            'sandi' => ['required'],
            'nama' => ['required'],
            'tempat' => ['required'],
            'npublic' => ['required'],
            'nlini' => ['required'],
            'nsektor' => ['required'],
            'sertifikat' => ['required'],
            'nskill' => ['required'],
            'level_sertifikasi_id' => ['nullable', 'integer'],
        ];
    }
}
