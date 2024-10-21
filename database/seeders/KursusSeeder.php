<?php

namespace Database\Seeders;

use App\Models\EHC\Kursus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KursusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(env('EHC_ENV', 'sqlite') == 'sqlite'){
            Kursus::factory()->create([
                'sandi' => 90111,
            ]);
            Kursus::factory()->create([
                'sandi' => 90222,
            ]);
            Kursus::factory()->create([
                'sandi' => 90333,
            ]);
            Kursus::factory()->count(96)->create();
        }
        else{
            exit('FORBIDDEN to seed EHC Database');
        }
    }
}
