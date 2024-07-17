<?php

namespace Database\Factories;

use App\EventCategory;
use App\Models\Proposal\Proposal;
use App\ProposalStatus;
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
            'event_category' => fake()->randomElement([EventCategory::IHT, EventCategory::PT]),
            'status' => fake()->randomElement([ProposalStatus::PENDING, ProposalStatus::ACCEPTED, ProposalStatus::REJECTED]),
        ];
    }

    protected $model = Proposal::class;
}
