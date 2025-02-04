<?php

namespace Database\Seeders;

use App\Enum\ParticipantNumberType;
use App\Models\EHC\Employee;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Models\Event\EventPrices;
use App\Models\Master\Location;
use App\Models\Proposal\Proposal;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = Location::pluck('id')->toArray();
        $proposals = Proposal::all();

        foreach($proposals as $proposal){
            $random = rand(1,2);
            for ($i=0; $i < $random; $i++) { 
                $batch = $i + 1;
                $defaultPrices = rand(0,1);
                $start_date = fake()->dateTimeInInterval($proposal->entry_date, '+1 month');
                $end_date = fake()->dateTimeInInterval($start_date, '+1 week');
                $number_type_chance = rand(1,5);

                $event = Event::create([
                    'name' => "{$proposal->name} Batch {$batch}",
                    'start_date' => $start_date->format('Y-m-d'),
                    'end_date' => $end_date->format('Y-m-d'),
                    'participant_number_type' => $number_type_chance == 1 ? ParticipantNumberType::FIXED->value : ParticipantNumberType::DYNAMIC->value,
                    'participant_number' => fake()->numberBetween(50, 200),
                    'proposal_id' => $proposal->id,
                    'created_by' => fake()->randomElement(User::pluck('username')->toArray()),
                    'assign_to' => fake()->randomElement(User::pluck('username')->toArray()),
                    'defaultPrices' => $defaultPrices,
                    'location_id' => fake()->randomElement($locations),
                ]);

                if($defaultPrices){
                    foreach($proposal->prices as $price){
                        $event->prices()->create([
                            'budget_type_id' =>$price->budgetType->id,
                            'price' => intval($price->price),
                            'defaultParticipants' => $number_type_chance == 1 ?  0 : 1,
                            'participantNum' => $event->participant_number,
                        ]);
                    }
                }
                else{
                    foreach($proposal->prices as $price){
                        $event->prices()->create([
                            'budget_type_id' =>$price->budgetType->id,
                            'price' => fake()->numberBetween(500e3, 1e6),
                            'defaultParticipants' => $number_type_chance == 1 ?  0 : 1,
                            'participantNum' => $event->participant_number,
                        ]);
                    }
                }
            }
        }
    }
}
