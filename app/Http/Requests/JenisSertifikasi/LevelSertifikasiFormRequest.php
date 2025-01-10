<?php

namespace App\Http\Requests\JenisSertifikasi;

use Illuminate\Foundation\Http\FormRequest;

class LevelSertifikasiFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'level' => ['required', 'max:255'],
            'jenis_sertifikasi_id' => ['required', 'integer'],
            'deskripsi' => ['nullable']
        ];
    }
}
