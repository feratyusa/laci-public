<?php

namespace Database\Factories;

use App\Models\EHC\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

class VendorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'sandi' => fake()->unique()->numberBetween(90000, 99000),
            'lengkap' => fake()->name(),
            'cp' => fake()->name(),
            'nope' => fake()->numerify('08########')
        ];

    }
    protected $model = Vendor::class;
}
