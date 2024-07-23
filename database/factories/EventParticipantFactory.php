<?php

namespace Database\Factories;

use App\Models\Event\EventParticipant;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventParticipantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nama' => fake()->name(),
            'nip' => fake()->regexify('[1-9]{8}'),
            'jabatan' => fake()->randomElement(['Account Officer', 'TKIK Account Officer']),
            'cabang' => fake()->randomElement(['Cabang Madiun','Cabang Sampang', 'Cabang Jakarta']),
        ];
    }
    protected $model = EventParticipant::class;
}
