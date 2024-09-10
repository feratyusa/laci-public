<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'username' => 'prabuega',
        ]);

        $this->call([
            ProposalSeeder::class,
            EventSeeder::class,
            EventParticipantSeeder::class,
            CategorySeeder::class,
            MandatoryFileCategorySeeder::class,
            BudgetSeeder::class,
        ]);
    }
}
