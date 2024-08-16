<?php

namespace Database\Factories;

use App\Models\EHC\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $positions = ['Penyelia', 'Senior Officer', 'VP', 'AVP', 'Staf'];
        $cabang = ['Divisi Human Capital', 'Cab. Madiun', 'Cab. Ponorogo', 'Divisi Manajemen Risiko', 'Divisi Teknologi Informasi', 'Cab. Australia'];
        return [
            'nama' => fake()->name(),
            'nip' => fake()->regexify('[0-9]{8}'),
            'jabatan' => fake()->randomElement($positions),
            'cabang' => fake()->randomElement($cabang),
        ];
    }

    protected $model = Employee::class;
}
