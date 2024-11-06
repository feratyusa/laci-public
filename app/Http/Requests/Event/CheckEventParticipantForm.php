<?php

namespace App\Http\Requests\Event;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\File;

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
            'kd_kursus' => ['required_unless:mode,default', 'numeric'],
            'event_id' => ['required', 'numeric'],
            'event_start' => ['required', 'date'],
            'event_end' => ['required', 'date'],
            'start_date' => ['required_unless:mode,default', 'date'],
            'bulk' => ['required_if:mode,bulk', 'array'],
            'bulk.*.column' => ['required_if:mode,bulk', 'nullable', 'string'],
            'bulk.*.value' => ['required_if:mode,bulk', 'array'],
            'bulk.*.value.*' => ['required_if:mode,bulk', 'string'],
            'file' => [
                'required_if:mode,file',
                File::types(['xlsx'])
                    ->max('100mb')
            ]
        ];
    }
}
