<?php

namespace Tests\Feature\Helpers;

use App\Models\Proposal\Proposal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class BaseData
{
    public $user;
    public $proposal;

    public function __construct(){
        $this->user = User::factory()->create();
    }

    public function createProposal(){
        $this->proposal = Proposal::factory()->create();
    }
}

class BaseDataTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_base_data(): void
    {
        $base = new BaseData();
        $base->createProposal();

        $this->assertDatabaseHas('users', ['username' => $base->user->username])
            ->assertDatabaseHas('proposals', ['id' => $base->proposal->id]);
    }
}
