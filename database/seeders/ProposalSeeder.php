<?php

namespace Database\Seeders;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
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
        Proposal::factory()
            ->create([
                'name' => "Pelatihan RPK",
                'status' => ProposalStatus::ACCEPTED,
                'event_category' => EventCategory::IHT->value,
            ]);
        Proposal::factory()->create([
            'name' => "Pelatihan Sales Management Development for AO",
            'status' => ProposalStatus::PENDING,
            'event_category' => EventCategory::PT->value,
        ]);
        Proposal::factory()->create([
            'name' => 'Sertifikasi Manajemen Risiko Kualifikasi 7 Tanpa Jenjang',
            'status' => ProposalStatus::REJECTED,
            'event_category' => EventCategory::IHT->value,
        ]);
        Proposal::factory()->count(20)->create();
    }
}
