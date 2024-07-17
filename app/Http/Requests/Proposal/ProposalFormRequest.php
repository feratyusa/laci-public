<?php

namespace App\Http\Requests\Proposal;

use App\EventCategory;
use App\ProposalStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

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
                'regex:/^[a-zA-Z0-9 _-]+$/',
                'max:120', 
            ],
            'event_category' => [
                'required',
                Rule::in([EventCategory::IHT, EventCategory::PT])
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
                Rule::in(ProposalStatus::PENDING, ProposalStatus::ACCEPTED, ProposalStatus::REJECTED)
            ],
            'files.*' => [
                'required',
                File::types(['pdf', 'doc', 'docx'])
                    ->max('100mb'),
            ]
        ];
    }
}
