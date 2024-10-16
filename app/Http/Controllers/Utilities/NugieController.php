<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Http\Requests\Nugie\NugieDetailFormRequest;
use App\Http\Requests\Nugie\NugieFormRequest;
use App\Models\Utilities\Nugie\Nugie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NugieController extends Controller
{
    public function index()
    {
        return Inertia::render('Utility/Nugie/Index', [
            'nugies' => Nugie::orderByDesc('id')->get(),
        ]);
    }

    public function show(string $id)
    {
        $nugie = Nugie::findOrFail($id);

        return  redirect();
    }

    public function store(NugieFormRequest $request)
    {
        $validated = $request->validated();

        $nugie = Nugie::create($validated);

        return redirect();
    }

    public function update(NugieFormRequest $request, string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $validated = $request->validated();

        $nugie->updateOrFail($validated);

        return redirect();
    }

    public function destroy(string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $nugie->deleteOrFail();

        return redirect();
    }

    public function storeDetails(NugieDetailFormRequest $request)
    {
        $validated = $request->validated();

        return response()->json([
            'mess' => $validated,
        ]);
    }
}
