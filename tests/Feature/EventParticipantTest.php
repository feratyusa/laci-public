<?php

namespace Tests\Feature;

use App\Models\EHC\Employee;
use App\Models\Event\EventParticipant;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Feature\Helpers\BaseData;
use Tests\TestCase;

class EventParticipantTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_create_event_participants(): void
    {
        $base = new BaseData();
        $base->createEvent();

        $employees = Employee::all()->pluck('nip')->take(10)->toArray();
        $response = $this->actingAs($base->user)->post("/events/{$base->event->id}/participants", [
            'nip' => $employees,
            'event_id' => $base->event->id
        ]);

        $response->assertRedirect(route('event.participant.index', ['id' => $base->event->id]));

        $this->assertDatabaseCount('event_participants', 10);
    }

    public function test_user_can_edit_event_participants(): void
    {
        $base = new BaseData();
        $base->createEvent();

        $employees = Employee::all()->take(10);
        foreach ($employees as $employee) {
            EventParticipant::create([
                'nama' => $employee->nama,
                'nip' => $employee->nip,
                'jabatan' => $employee->jabatan,
                'cabang' => $employee->cabang,
                'event_id' => $base->event->id,
            ]);
        }

        $newEmployees = Employee::all()->take(7)->pluck('nip')->toArray();

        $response = $this->actingAs($base->user)->put("/events/{$base->event->id}/participants", [
            'nip' => $newEmployees,
        ]);        

        $response->assertRedirect(route('event.participant.index', ['id' => $base->event->id]));

        $this->assertDatabaseCount('event_participants', 10);
    }

    public function test_user_can_delete_event_participants_batch(): void
    {
        $base = new BaseData();
        $base->createEvent();

        $employees = Employee::all()->take(10);
        foreach ($employees as $employee) {
            EventParticipant::create([
                'nama' => $employee->nama,
                'nip' => $employee->nip,
                'jabatan' => $employee->jabatan,
                'cabang' => $employee->cabang,
                'event_id' => $base->event->id,
            ]);
        }
        
        $deleteParticipants = [
            $employees[0]->nip, 
            $employees[2]->nip,
            $employees[5]->nip,
            $employees[7]->nip,
        ];

        $response = $this->actingAs($base->user)->delete("/events/{$base->event->id}/participants", [
            'nip' => $deleteParticipants
        ]);

        $this->assertDatabaseCount('event_participants', 10);
    }
}
