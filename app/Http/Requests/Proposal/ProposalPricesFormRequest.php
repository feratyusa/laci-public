<?php

namespace App\Http\Requests\Proposal;

use Illuminate\Foundation\Http\FormRequest;

class ProposalPricesFormRequest extends FormRequest
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
            'details' => ['required', 'array'],
            'details.*.id' => ['nullable', 'integer'],
            'details.*.budget_type_id' => ['required', 'integer'],
            'details.*.price' => ['required', 'numeric', 'max_digits:15']
        ];
    }
}
