<?php

namespace App\Http\Requests\Proposal;

use App\ProposalStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProposalChangeStatusRequest extends FormRequest
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
            'status' => [Rule::in(ProposalStatus::PENDING, ProposalStatus::ACCEPTED, ProposalStatus::REJECTED)],
        ];
    }
}
