<?php

namespace Database\Factories;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
use App\Models\EHC\Kursus;
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
        $kursus = Kursus::pluck('sandi')->toArray();

        return [
            'name' => fake()->name(),
            'kd_kursus' => fake()->randomElement($kursus),
            'entry_date' => fake()->date("Y-m-d"),
            'event_category' => fake()->randomElement(array_column(EventCategory::cases(), 'value')),
            'status' => fake()->randomElement(array_column(ProposalStatus::cases(), 'value')),
        ];
    }

    protected $model = Proposal::class;
}
