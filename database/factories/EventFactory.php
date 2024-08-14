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
        $start_date = fake()->dateTimeBetween('-2 months', '-2 days');
        return [
            'name' => fake()->name(),
            'start_date' => $start_date->format('Y-m-d'),
            'end_date' => fake()->dateTimeBetween($start_date, 'now'),
            'participant_number_type' => fake()->randomElement([ParticipantNumberType::FIXED, ParticipantNumberType::DYNAMIC]),
            'participant_number' => fake()->numberBetween(0, 100),
        ];
    }

    protected $model = Event::class;
}
