<?php

namespace Tests\Feature;

use App\Models\Master\Budget;
use App\Models\Master\BudgetDetail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\Feature\Helpers\BaseData;
use Tests\TestCase;

class BudgetTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_user_can_make_budget_and_details(): void
    {
        $base = new BaseData();

        $response = $this->actingAs($base->user)->post('/master/budgets', [
            'year' => 2023,
            'value' => 250e9
        ]);

        $response->assertRedirect(route('budget.index'));

        $this->assertDatabaseCount('budgets', 1);

        $budget = Budget::first();

        $response = $this->actingAs($base->user)->post("/master/budgets/{$budget->id}/details", [
            'details' => [
                ['name' => 'IHT', 'value' => 125e9],
                ['name' => 'PT', 'value' => 125e9],
            ]
            ]);

        $response->assertRedirect(route('budget.index'));

        $this->assertDatabaseCount('budget_details', 2);
    }

    public function test_user_can_edit_budget_and_details(): void
    {
        $budget = Budget::create([
            'year' => 2023,
            'value' => 250e9
        ]);

        $budgetDetails = [
            BudgetDetail::create([
                'budget_id' => $budget->id,
                'name' => 'IHT',
                'value' => 125e9,
            ]),
            BudgetDetail::create([
                'budget_id' => $budget->id,
                'name' => 'PT',
                'value' => 125e9,
            ])
        ];

        $base = new BaseData();

        $response = $this->actingAs($base->user)->put("/master/budgets/{$budget->id}", [
            'year' => 2023,
            'value' => 500e9,
        ]);

        $response->assertRedirect(route('budget.index'));

        $this->assertDatabaseCount('budgets', 1)
            ->assertDatabaseHas('budgets', ['year' => 2023, 'value' => 500e9]);

        $response = $this->actingAs($base->user)->put("/master/budgets/{$budget->id}/details", [
            'details' => [
                ['id' => $budgetDetails[0]->id, 'name' => 'IHT2', 'value' => 250e9],
                ['id' => $budgetDetails[1]->id, 'name' => 'PT2', 'value' => 250e9],
            ]
        ]);

        $response->assertRedirect(route('budget.index'));

        $this->assertDatabaseCount('budget_details', 2)
            ->assertDatabaseHas('budget_details', ['id' => $budgetDetails[0]->id, 'name' => 'IHT2', 'value' => 250e9]);
    }

    public function user_test_can_delete_budget_and_budget_details(): void
    {
        $budget = Budget::create([
            'year' => 2023,
            'value' => 250e9
        ]);

        $budgetDetails = [
            BudgetDetail::create([
                'budget_id' => $budget->id,
                'name' => 'IHT',
                'value' => 125e9,
            ]),
            BudgetDetail::create([
                'budget_id' => $budget->id,
                'name' => 'PT',
                'value' => 125e9,
            ])
        ];

        $base = new BaseData();

        $response = $this->actingAs($base->user)->delete("/master/budgets/{$budget->id}/details/{$budgetDetails[0]->id}");

        $response->assertRedirect(route('budget.index'));

        $this->assertDatabaseCount('budget_details', 1);

        $response = $this->actingAs($base->user)->delete("/master/budgets/{$budget->id}");

        $response->assertRedirect(route('budget.index'));

        $this->assertDatabaseCount('budgets', 0)
            ->assertDatabaseCount('budget_details', 0);

    }
}
