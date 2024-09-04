<?php

namespace App\Http\Controllers\Master;

use App\Enum\MandatoryCategoryLink;
use App\Http\Controllers\Controller;
use App\Http\Requests\Master\MandatoryCategoryFormRequest;
use App\Models\File\MandatoryFileCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MandatoryCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $mandatoryTypes = array_column(MandatoryCategoryLink::cases(), 'value');
        return Inertia::render('Master/MandatoryCategory/Index', [
            'types' => $mandatoryTypes,
            'mandatories' => MandatoryFileCategory::all()
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
    public function store(MandatoryCategoryFormRequest $request)
    {
        $validated = $request->validated();

        $mandatoryCategories = MandatoryFileCategory::where('mandatory_type', $validated['mandatory_type'])->get();

        foreach ($validated['categories'] as $category) {
            if($mandatoryCategories->where('category_id', $category)->count() > 0) continue;
            MandatoryFileCategory::create([
                'mandatory_type' => $validated['mandatory_type'],
                'category_id' => $category
            ]);
        }

        return redirect()->route('mandatory-category.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $mandatory_type)
    {
        $mandatoryCategories = MandatoryFileCategory::where('mandatory_type', MandatoryCategoryLink::fromName($mandatory_type))->get();

        return $mandatoryCategories;
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
    public function update(Request $request, string $id)
    {
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $mandatory = MandatoryFileCategory::findOrFail($id);

        $mandatory->deleteOrFail();

        return redirect()->route('mandatory-category.index');
    }
}
