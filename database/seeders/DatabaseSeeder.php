<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            BudgetSeeder::class,
            LocationSeeder::class,
            CategorySeeder::class,
            MandatoryFileCategorySeeder::class,
            ProposalSeeder::class,
            EventSeeder::class,
            EventParticipantSeeder::class,
            NugieSeeder::class,
        ]);
    }
}
