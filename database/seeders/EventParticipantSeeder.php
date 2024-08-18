<?php

namespace Database\Seeders;

use App\Models\EHC\Employee;
use App\Models\Event\Event;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventParticipantSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $employees = Employee::all()->take(100);
        $index = 0;
        for ($i=0; $i < 3; $i++) { 
            $event = Event::find($i+1);
            for($j=0; $j < 30; $j++){
                $event->participants()->create([
                    'nip' => $employees[$index]->nip,
                    'event_id' => $event->id,
                    'nama' => $employees[$index]->nama,
                    'jabatan' => $employees[$index]->jabatan,
                    'cabang' => $employees[$index]->cabang,
                ]);
                $index++;
            }
        }
    }
}
