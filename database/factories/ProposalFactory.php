<?php

namespace Database\Factories;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
use App\Models\Proposal\Proposal;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProposalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'kd_kursus' => fake()->regexify('[0-9]{6}'),
            'entry_date' => fake()->date("Y-m-d"),
            'event_category' => fake()->randomElement(array_column(EventCategory::cases(), 'value')),
            'status' => fake()->randomElement(array_column(ProposalStatus::cases(), 'value')),
        ];
    }

    protected $model = Proposal::class;
}
