<?php

namespace Tests\Feature;

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
use App\Models\Proposal\Proposal;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Feature\Helpers\BaseData;
use Tests\TestCase;

class ProposalTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_create_proposal(): void
    {
        $base = new BaseData();

        $response = $this->actingAs($base->user)->post('/proposals', [
            'name' => 'Banking Simulation',
            'kd_kursus' => '90876',
            'entry_date' => date("Y-m-d H:m:s"),
            'event_category' => EventCategory::PT->value,
            'status' => ProposalStatus::PENDING->value,
        ]);

        $proposal = Proposal::first();

        $response->assertRedirect(route('proposal.show', ['id' => $proposal->id ]));

        $this->assertDatabaseHas('proposals', ['id' => $proposal->id])
            ->assertDatabaseCount('proposals', 1);
    }

    public function test_user_can_edit_proposal(): void
    {
        $base = new BaseData();
        $base->createProposal();

        $response = $this->actingAs($base->user)->put("/proposals/{$base->proposal->id}", [
            'name' => 'Banking Simulation',
            'kd_kursus' => '9006021',
            'entry_date' => date("Y-m-d"),
            'event_category' => EventCategory::PT->value,
            'status' => ProposalStatus::PENDING->value,
        ]);

        $response->assertRedirect(route('proposal.show', ['id' => $base->proposal->id]));

        $this->assertDatabaseHas('proposals', ['id' => $base->proposal->id])
            ->assertDatabaseHas('proposals', [
                'name' => 'Banking Simulation',
                'kd_kursus' => '9006021',
                'entry_date' => date("Y-m-d"),
                'event_category' => EventCategory::PT->value,
                'status' => ProposalStatus::PENDING->value,
            ])
            ->assertDatabaseCount('proposals', 1);        
    }

    public function test_user_can_soft_delete_proposal(): void
    {
        $base = new BaseData();
        $base->createProposal();

        $response = $this->actingAs($base->user)->delete("/proposals/{$base->proposal->id}");

        $response->assertRedirect(route('proposal.index'));

        $base->proposal->refresh();

        $this->assertDatabaseCount('proposals', 1)
            ->assertDatabaseHas('proposals', ['deleted_at' => $base->proposal->deleted_at]);
    }

    public function test_user_can_accept_proposal(): void
    {
        $base = new BaseData();
        $base->createProposal();

        $response = $this->actingAs($base->user)->post("/proposals/{$base->proposal->id}",[
            'status' => ProposalStatus::ACCEPTED->value,
        ]);

        // $response->assertRedirect(route('proposal.show', ['id' => $base->proposal->id]));

        $this->assertDatabaseCount('proposals', 1)
            ->assertDatabaseHas('proposals', ['status' => ProposalStatus::ACCEPTED->value]);      
    }
    
    public function test_user_can_reject_proposal(): void
    {
        $base = new BaseData();
        $base->createProposal();

        $response = $this->actingAs($base->user)->post("/proposals/{$base->proposal->id}",[
            'status' => ProposalStatus::REJECTED->value,
        ]);

        $response->assertRedirect(route('proposal.show', ['id' => $base->proposal->id]));

        $this->assertDatabaseCount('proposals', 1)
            ->assertDatabaseHas('proposals', ['status' => ProposalStatus::REJECTED->value]);      
    }

    public function test_user_can_pending_a_proposal(): void
    {
        $base = new BaseData();
        $base->createProposal();

        $response = $this->actingAs($base->user)->post("/proposals/{$base->proposal->id}",[
            'status' => ProposalStatus::PENDING->value,
        ]);

        $response->assertRedirect(route('proposal.show', ['id' => $base->proposal->id]));

        $this->assertDatabaseCount('proposals', 1)
            ->assertDatabaseHas('proposals', ['status' => ProposalStatus::PENDING->value]);      
    }
}
