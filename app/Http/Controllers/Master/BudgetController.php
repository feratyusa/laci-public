<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\BudgetDetailsFormRequest;
use App\Http\Requests\Master\BudgetFormRequest;
use App\Models\Master\Budget;
use Illuminate\Http\Request;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Budget::with('details')->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BudgetFormRequest $request)
    {
        $validated = $request->validated();

        $budget = Budget::create($validated);

        return redirect()->route('budget.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BudgetFormRequest $request, string $id)
    {
        $budget = Budget::findOrFail($id);

        $validated = $request->validated();

        $budget->update($validated);

        return redirect()->route('budget.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $budget = Budget::findOrFail($id);

        $budget->deleteOrFail();

        return redirect()->route('budget.destroy');
    }

    public function detailStore(BudgetDetailsFormRequest $request, string $id)
    {
        $budget = Budget::findOrFail($id);
        
        $validated = $request->validated();

        foreach ($validated['details'] as $detail) {
            $budget->details()->create($detail);
        }

        return redirect()->route('budget.index');
    }

    public function detailUpdate(BudgetDetailsFormRequest $request, string $id)
    {
        $budget = Budget::findOrFail($id);
        
        $validated = $request->validated();

        foreach($validated['details'] as $detail){
            $budget->details()->find($detail['id'])->update(['name' => $detail['name'], 'value' => $detail['value']]);
        }

        return redirect()->route('budget.index');
    }

    public function detailDestroy(string $id, string $detail_id)
    {
        $budget = Budget::findOrFail($id);

        $budget->details()->find($detail_id)->deleteOrFail();

        return redirect()->route('budget.index');
    }
}
