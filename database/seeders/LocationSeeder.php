<?php

namespace Database\Seeders;

use App\Models\Master\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            ['id' => 'PRGN', 'name' => 'Prigen, Pasuruan'],
            ['id' => 'SBY', 'name' => 'Surabaya'],
            ['id' => 'JKT', 'name' => 'Jakarta'],
            ['id' => 'MD', 'name' => 'Madiun'],
        ];

        foreach($locations as $location) {
            Location::create($location);
        }
    }
}
