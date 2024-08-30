<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\CategoryFormRequest;
use App\Models\File\Category;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
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

        if($check->count() > 0) return redirect()->back()->withErrors(['id already exists']);

        $category = Category::create($validated);

        return redirect()->route('category.index')->with(['success', "{$category->name} berhasil ditambahkan"]);
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
        $validated = $request->validated();
        
        $category = Category::where('id', $validated['id'])->first();
        if($category && $category->id != $validated['id']) return redirect()->back()->with(['errors' => 'id already exists']);

        $category = Category::where('id', $id)->first();
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
