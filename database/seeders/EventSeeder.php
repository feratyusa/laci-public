<?php

namespace Database\Seeders;

use App\Models\Event\Event;
use App\Models\Event\EventPrices;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nama = [
            'Pelatihan RPK Batch 1',
            'Sales Management Development Batch 1', 
            'Manajemen Risiko Perbankan Batch 1',
            'Pelatihan RPK Batch 2',
            'Sales Management Development Batch 2', 
            'Manajemen Risiko Perbankan Batch 2',
            'Pelatihan RPK Batch 3', 
            'Sales Management Development Batch 3', 
            'Manajemen Risiko Perbankan Batch 3',
        ];
        for ($i=0; $i < 9; $i++) { 
            Event::factory()->create([
                'name' => $nama[$i],
                'proposal_id' => ($i%3)+1
            ]);
        }
    }
}
