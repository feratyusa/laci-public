<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\BudgetFormRequest;
use App\Http\Requests\Master\BudgetTypeFromRequest;
use App\Models\Master\BudgetType;
use Illuminate\Http\Request;

class BudgetTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return BudgetType::all();
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
    public function store(BudgetTypeFromRequest $request)
    {
        $validated = $request->validated();

        BudgetType::create($validated);

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
    public function update(BudgetTypeFromRequest $request, string $id)
    {
        $validated = $request->validated();

        $budgetType = BudgetType::findOrFail($id);

        $budgetType->update($validated);

        return redirect()->route('budget.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $budgetType = BudgetType::findOrFail($id);

        $budgetType->deleteOrFail();

        return redirect()->route('budget.index');
        
    }
}
