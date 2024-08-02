<?php

namespace App\Http\Requests\Calculator;

use Illuminate\Foundation\Http\FormRequest;

class CalculatorUpdateEventRequest extends FormRequest
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
            'events.*.id' => [
                'required'
            ],
            'events.*.participant_number' => [
                'required',
                'numeric',
                'integer'
            ],
            'events.*.price_per_person' => [
                'required',
                'numeric',
            ]
        ];
    }
}
