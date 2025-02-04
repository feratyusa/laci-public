<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\BudgetDetailsFormRequest;
use App\Http\Requests\Master\BudgetFormRequest;
use App\Models\Master\Budget;
use App\Models\Master\BudgetType;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class BudgetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Master/Budget/Index', [
            'budgets' => Budget::with('details')->orderByDesc('year')->get(),
            'budgetTypes' => BudgetType::orderByDesc('id')->get(),
        ]);
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

        if(Budget::where('year', $validated['year'])->get()->count() > 0) 
            throw ValidationException::withMessages(['year' => "The year {$validated['year']} already exists"]);
        
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

        if(Budget::where('year', $validated['year'])->get()->count() > 0 && strcmp(strval($budget->year), strval($validated['year'])) != 0) 
            throw ValidationException::withMessages(['year' => "The year {$validated['year']} is already exists"]);

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

        return redirect()->route('budget.index');
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

        foreach($budget->details as $detail){
            $deleteFlag = true;
            foreach($validated['details'] as $check){
                if($check['id'] == $detail->id){
                    $deleteFlag = false;
                    break;
                }
            }
            if($deleteFlag){
                $detail->deleteOrFail();
            }
        }

        foreach($validated['details'] as $detail){
            $budget->details()->updateOrCreate(
                ['id' => $detail['id']],
                ['budget_type_id' => $detail['budget_type_id'], 'value' => $detail['value']]
            );
        }

        return redirect()->route('budget.index');
    }

    public function detailDestroy(string $id, string $detail_id)
    {
        $budget = Budget::findOrFail($id);

        $detail = $budget->details()->find($detail_id);

        $detail->deleteOrFail();

        return redirect()->route('budget.index');
    }
}
