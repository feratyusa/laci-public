<?php

namespace App\Http\Requests\Event;

use App\Enum\EventCategory;
use App\Enum\ParticipantNumberType;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class EventFormRequest extends FormRequest
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
                'regex:/^[a-zA-Z0-9 _-]+$/',
                'max:120', 
            ],
            'proposal_id' => [
                'required',
                'integer'
            ],
            'start_date' => [
                'nullable',
                'date'
            ],
            'end_date' => [
                'nullable',
                'date',
            ],
            'participant_number_type' => [
                'nullable',
                Rule::enum(ParticipantNumberType::class)
            ],
            'participant_number' => [
                'nullable',
                'numeric',
                'integer',
            ],
            'training_price' => [
                'nullable',
                'numeric',
            ],
            'accomodation_price' => [
                'nullable',
                'numeric',
            ]
        ];
    }
}
