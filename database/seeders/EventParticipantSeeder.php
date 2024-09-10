<?php

namespace Database\Seeders;

use App\Enum\ParticipantNumberType;
use App\Models\EHC\Employee;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $events = Event::all();
        $employees = Employee::all();
        
        foreach ($events as $event) {
            if($event->participant_number_type == ParticipantNumberType::FIXED->value) continue;
            
            $number = rand(1, 150);
            $participants = fake()->randomElements($employees, $number, false);

            foreach ($participants as $participant) {
                EventParticipant::create([
                    'event_id' => $event->id,
                    'nip' => $participant->nip,
                    'nama' => $participant->nama,
                    'jabatan' => $participant->jabatan,
                    'cabang' => $participant->cabang,
                ]);
            }
        }
    }
}
