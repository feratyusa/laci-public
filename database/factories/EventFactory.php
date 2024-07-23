<?php

namespace Database\Factories;

use App\Enum\EventCategory;
use App\Enum\ParticipantNumberType;
use App\Models\Event\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
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
            'kd_kursus' => fake()->regexify('[1-9]{6}'),
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'event_category' => fake()->randomElement([EventCategory::IHT, EventCategory::PT]),
            'participant_number_type' => fake()->randomElement([ParticipantNumberType::FIXED, ParticipantNumberType::DYNAMIC]),
            'participant_number' => fake()->numberBetween(0, 100),
            'price_per_person' => fake()->numberBetween(100000, 950000),
        ];
    }

    protected $model = Event::class;
}
