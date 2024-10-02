<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\Master\LocationFormRequest;
use App\Models\Master\Location;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {        
        return Inertia::render('Master/Location/Index', [
            'locations' => Location::orderByDesc('created_at')->get()
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
    public function store(LocationFormRequest $request)
    {
        $validated = $request->validated();

        if(Location::where('id', $validated['id'])->get()->count() > 0) 
            throw ValidationException::withMessages(['id' => 'id already exists']);

        Location::create($validated);

        return redirect()->route('location.index');
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
    public function update(LocationFormRequest $request, string $id)
    {
        $location = Location::where('id', $id)->firstOrFail();

        $validated = $request->validated();

        if(Location::where('id', $validated['id'])->get()->count() > 0 && strcmp($id, $validated['id'])) 
            throw ValidationException::withMessages(['id' => 'id already exists']);

        $location->update($validated);

        return redirect()->route('location.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $location = Location::findOrFail($id);

        $location->deleteOrFail();

        return redirect()->route('location.index');
    }
}
