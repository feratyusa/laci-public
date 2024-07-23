<?php

namespace Tests\Feature;

use App\Enum\EventCategory;
use App\Enum\ParticipantNumberType;
use App\Models\Event\Event;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Feature\Helpers\BaseData;
use Tests\TestCase;

class EventTest extends TestCase
{
    use RefreshDatabase;
    
    public function test_user_can_create_event(): void
    {
        $base = new BaseData();
        $base->createProposal();
        
        $response = $this->actingAs($base->user)->post("/events", [
            'name' => 'Simulation RPK',
            'proposal_id' => $base->proposal->id,
            'kd_kursus' => '90065',
            'start_date' => date("Y-m-d"),
            'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
            'event_category' => $base->proposal->event_category,
            'participant_number_type' => ParticipantNumberType::FIXED->value,
            'participant_number' => 40,
        ]);

        $response->assertRedirect(route('event.show', ['id' => 1]));
        
        $this->assertDatabaseCount('events', 1)
            ->assertDatabaseHas('events', [
                'name' => 'Simulation RPK',
                'proposal_id' => $base->proposal->id,
                'kd_kursus' => '90065',
                'start_date' => date("Y-m-d"),
                'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
                'event_category' => $base->proposal->event_category,
                'participant_number_type' => ParticipantNumberType::FIXED->value,
                'participant_number' => 40,
            ]);
    }

    public function test_user_can_edit_event(): void
    {
        $base = new BaseData();
        $base->createEvent();

        $response = $this->actingAs($base->user)->put("/events/{$base->event->id}",[
            'name' => 'Simulation RPK',
            'proposal_id' => $base->proposal->id,
            'kd_kursus' => '90065',
            'start_date' => date("Y-m-d"),
            'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
            'event_category' => $base->proposal->event_category,
            'participant_number_type' => ParticipantNumberType::FIXED->value,
            'participant_number' => 40,
        ]);

        $response->assertRedirect(route('event.show', ['id' => $base->event->id]));
        
        $this->assertDatabaseCount('events', 1)
            ->assertDatabaseMissing('events', $base->event->toArray())
            ->assertDatabaseHas('events', [
                'name' => 'Simulation RPK',
                'proposal_id' => $base->proposal->id,
                'kd_kursus' => '90065',
                'start_date' => date("Y-m-d"),
                'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
                'event_category' => $base->proposal->event_category,
                'participant_number_type' => ParticipantNumberType::FIXED->value,
                'participant_number' => 40,
            ]);
    }
    
    public function test_user_can_soft_delete_event():void
    {
        $base = new BaseData();
        $base->createEvent();

        $response = $this->actingAs($base->user)->delete("/events/{$base->event->id}");

        $response->assertRedirect(route('event.index'));

        $base->event->refresh();

        $this->assertDatabaseCount('events', 1)
            ->assertDatabaseHas('events', [
                'id' => $base->event->id,
                'deleted_at' => $base->event->deleted_at
            ]);
    }
}
