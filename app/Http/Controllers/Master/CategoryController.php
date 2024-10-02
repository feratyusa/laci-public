<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\CategoryFormRequest;
use App\Models\File\Category;
use App\Trait\InputHelpers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class CategoryController extends Controller
{
    use InputHelpers;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::orderByDesc('created_at')->orderBy('id')->get();
                
        return Inertia::render('Master/Category/Index',[
            "categories" => Category::orderByDesc('created_at')->orderBy('id')->get(),
            // "flash" => ['new_id' => session('new_id')]
        ]);
    }

    public function getSelections()
    {
        return response()->json([
            'categories' => $this->selectOptions(Category::all()->toArray(), 'id', 'name', false)
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
    public function store(CategoryFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $check = Category::where('id', $validated['id'])->get();

        if($check->count() > 0) throw ValidationException::withMessages(['id' => 'id already exists']);

        $category = Category::create($validated);

        return redirect()->route('category.index');
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
    public function update(CategoryFormRequest $request, string $id)
    {
        $category = Category::where('id', $id)->firstOrFail();

        $validated = $request->validated();
                
        if(Category::where('id', $validated['id']) && strcmp($category->id, $validated['id']) != 0)
            throw ValidationException::withMessages(['id' => 'id already exists']);

        $category->update($validated);

        return redirect()->route('category.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);

        $category->deleteOrFail();

        return redirect()->route('category.index');
    }
}
