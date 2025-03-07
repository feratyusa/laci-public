<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'username' => 'nugie',
        ]);
        User::factory()->create([
            'username' => 'kanda',
        ]);
        User::factory()->create([
            'username' => 'admin',
        ]);
        User::factory()->create([
            'username' => 'prabuega',
        ]);
    }
}
