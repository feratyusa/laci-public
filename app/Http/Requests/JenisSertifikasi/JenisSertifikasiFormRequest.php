<?php

namespace App\Http\Requests\JenisSertifikasi;

use Illuminate\Foundation\Http\FormRequest;

class JenisSertifikasiFormRequest extends FormRequest
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
            'nama' => ['required','unique:jenis_sertifikasi,nama_sertifikasi', 'max:255'],
            'deskripsi' => ['nullable', 'max:255']
        ];
    }
}
