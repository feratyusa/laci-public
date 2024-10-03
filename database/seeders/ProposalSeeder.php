<?php

namespace Database\Seeders;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\Master\Location;
use App\Models\Proposal\Proposal;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProposalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {        
        $users = User::pluck('username')->toArray();
        $kursus = Kursus::whereRaw('kategori not like ?', ['null'])->get();
        $proposalNum = 100;

        for ($i=0; $i < $proposalNum; $i++) { 
            $k = $kursus[rand(0,99)];
            $n = rand(1,100);

            $proposal = Proposal::factory()
                ->create([
                    'name' => "{$k->lengkap} {$n}",
                    'status' => ProposalStatus::ACCEPTED,
                    'event_category' => $k->kategori,
                    'entry_date' => fake()->dateTimeBetween('-7 months', '-2 days'),                    
                    'created_by' => fake()->randomElement($users),
                    'assign_to' => fake()->randomElement($users)
                ]);
            
            $proposal->prices()->create([
                'budget_type_id' => $proposal->kursus->kategori == EventCategory::IHT->value ? 1 : 2,
                'price' => fake()->numberBetween(500e3, 1e6),
            ]);

            $c = rand(1,3);

            switch ($c) {
                case 1:
                    $proposal->prices()->createMany([
                        [
                            'budget_type_id' => 3,
                            'price' => fake()->numberBetween(500e3, 1e6)
                        ],
                        [
                            'budget_type_id' => 4,
                            'price' => fake()->numberBetween(500e3, 1e6)
                        ],
                    ]);     
                    break;
                case 2:
                    $proposal->prices()->create([                        
                        'budget_type_id' => 3,
                        'price' => fake()->numberBetween(500e3, 1e6)
                    ]);
                    break;
                
                default:
                    $proposal->prices()->create([                        
                        'budget_type_id' => 4,
                        'price' => fake()->numberBetween(500e3, 1e6)
                    ]);
                    break;
            }         
        }
    }
}
