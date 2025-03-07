<?php

namespace Database\Factories;

use App\Models\Event\EventPrices;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventPricesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'training_price' => fake()->numberBetween(1e6, 8e6),
            'accomodation_price' => fake()->numberBetween(300e3, 800e3),
        ];
    }

    protected $model = EventPrices::class;
}
