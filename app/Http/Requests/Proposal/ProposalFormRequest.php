<?php

namespace App\Http\Requests\Proposal;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProposalFormRequest extends FormRequest
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
                'regex:/^[a-zA-Z0-9 _\-]+$/',
                'max:120', 
            ],
            'event_category' => [
                'required',
                Rule::in(array_column(EventCategory::cases(), 'value'))
            ],
            'entry_date' => [
                'required',
                'date',
            ],
            'kd_kursus' => [
                'required',
                'string',
            ],
            'status' => [
                'required',
                Rule::in(array_column(ProposalStatus::cases(), 'value'))
            ],
        ];
    }
}
