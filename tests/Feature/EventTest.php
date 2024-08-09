<?php

namespace Tests\Feature;

use App\Enum\EventCategory;
use App\Enum\ParticipantNumberType;
use App\Models\Event\Event;
use App\Models\Event\EventFile;
use App\Models\File\File;
use App\Models\File\MandatoryFileCategory;
use App\Models\Proposal\ProposalFile;
use Database\Seeders\CategorySeeder;
use Database\Seeders\MandatoryFileCategorySeeder;
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
            'start_date' => date("Y-m-d"),
            'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
            'participant_number_type' => ParticipantNumberType::FIXED->value,
            'participant_number' => 40,
        ]);

        $response->assertRedirect(route('event.show', ['id' => 1]));
        
        $this->assertDatabaseCount('events', 1)
            ->assertDatabaseHas('events', [
                'name' => 'Simulation RPK',
                'proposal_id' => $base->proposal->id,
                'start_date' => date("Y-m-d"),
                'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
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
            'start_date' => date("Y-m-d"),
            'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
            'participant_number_type' => ParticipantNumberType::FIXED->value,
            'participant_number' => 40,
        ]);

        $response->assertRedirect(route('event.show', ['id' => $base->event->id]));
        
        $this->assertDatabaseCount('events', 1)
            ->assertDatabaseMissing('events', $base->event->toArray())
            ->assertDatabaseHas('events', [
                'name' => 'Simulation RPK',
                'proposal_id' => $base->proposal->id,
                'start_date' => date("Y-m-d"),
                'end_date' => date("Y-m-d", mktime(0,0,0,7,28,2024)),
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

    public function test_user_can_see_missing_category(): void
    {
        $base = new BaseData();
        $base->createEvent();

        $seedA = new CategorySeeder();
        $seedA->run();
        $seedB = new MandatoryFileCategorySeeder();
        $seedB->run();

        $fileCategories = ['BANPEL', 'SPKPEL'];
        foreach ($fileCategories as $category) {
            $file = File::create([
                'name' => fake()->name(),
                'category_id' => $category,
                'mime_type' => 'pdf',
                'size' => '22200',
                'path' => 'fakepath/file.pdf'
            ]);
            EventFile::create([
                'file_id' => $file->id,
                'event_id' => $base->event->id,
            ]);
        }
        $this->assertDatabaseCount('files', 2)
            ->assertDatabaseCount('event_files', 2);
        $this->assertCount($base->proposal->event_category === EventCategory::IHT->value ? 8 : 4 , $base->event->missingCategory());
    }
}
