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
            'start_date' => fake()->date(),
            'end_date' => fake()->date(),
            'participant_number_type' => fake()->randomElement([ParticipantNumberType::FIXED, ParticipantNumberType::DYNAMIC]),
            'participant_number' => fake()->numberBetween(0, 100),
        ];
    }

    protected $model = Event::class;
}
