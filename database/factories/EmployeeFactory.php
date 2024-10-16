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
        $cabang = ['Cab. Madiun', 'Cab. Ponorogo', 'Cab. Utama Surabaya', 'Cab. Jember', 'Cab. Malang', 'Cab. Australia'];        
        $positions = ['Staf', 'Junior Officer', 'Officer', 'Senior Officer', 'AVP', 'VP'];
        $seksi = ['Grup Restrukturisasi & Pemulihan Kredit', 'Kredit Konsumer & Properti', 'Kredit Konsumer & Properti', 'Kredit Mikro'];
        $jobfam = ['Kredit Konsumer & Properti', 'Kredit Mikro', 'Kredit Ritel & Menengah', 'Akuntansi & Umum'];
        $eselon = ['Pelaksana', 'Eselon 4', 'Eselon 3', 'Eselon 2', 'Eselon 1'];

        return [
            'nama' => fake()->name(),
            'nip' => fake()->regexify('[0-9]{8}'),
            'jabatan' => fake()->randomElement($positions),
            'cabang' => fake()->randomElement($cabang),
            'seksi' => fake()->randomElement($seksi),
            'jobfam' => fake()->randomElement($jobfam),
            'eselon' => fake()->randomElement($eselon),
        ];
    }

    protected $model = Employee::class;
}
