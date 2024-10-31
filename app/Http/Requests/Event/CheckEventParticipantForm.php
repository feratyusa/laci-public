<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;

class CheckEventParticipantForm extends FormRequest
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
            'mode' => ['required', 'string'],
            'kd_kursus' => ['required', 'numeric'],
            'start_date' => ['required', 'date'],
            'bulk' => ['nullable', 'array'],
            'bulk.*.column' => ['nullable', 'string'],
            'bulk.*.value' => ['nullable', 'array'],
            'bulk.*.value.*' => ['nullable', 'string'],
        ];
    }
}
