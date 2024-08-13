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
            'public.*.id' => [
                'required'
            ],
            'public.*.participant_number' => [
                'required',
                'numeric',
                'integer'
            ],
            'public.*.training_price' => [
                'required',
                'numeric',
            ],
            'public.*.accomodation_price' => [
                'required',
                'numeric',
            ],
            'inHouse.*.id' => [
                'required'
            ],
            'inHouse.*.participant_number' => [
                'required',
                'numeric',
                'integer'
            ],
            'inHouse.*.training_price' => [
                'required',
                'numeric',
            ],
            'inHouse.*.accomodation_price' => [
                'required',
                'numeric',
            ],
        ];
    }
}
