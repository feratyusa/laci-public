<?php

namespace Database\Seeders;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\Proposal\Proposal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kursus = Kursus::whereRaw('kategori not like ?', ['null'])->get();
        $proposalNum = 100;

        for ($i=0; $i < $proposalNum; $i++) { 
            $k = $kursus[rand(0,99)];
            $n = rand(1,100);
            Proposal::factory()
                ->create([
                    'name' => "{$k->lengkap} {$n}",
                    'status' => ProposalStatus::ACCEPTED,
                    'event_category' => $k->kategori,
                    'entry_date' => fake()->dateTimeBetween('-7 months', '-2 days')                    
                ]);
        }
    }
}
