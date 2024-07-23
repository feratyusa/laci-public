<?php

namespace Database\Seeders;

use App\Models\Event\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nama = ['Pelatihan RPK', 'Sales Management Development', 'Manajemen Risiko Perbankan'];
        for ($i=0; $i < 3; $i++) { 
            Event::factory()->count($i+2)->create([
                'name' => $nama[$i],
                'proposal_id' => $i+1
            ]);
        }
    }
}
