<?php

namespace App\Http\Controllers\EHC;

use App\Http\Controllers\Controller;
use App\Http\Requests\EHC\LembagaFormRequest;
use App\Models\EHC\Vendor;
use App\Models\EHCWRITE\LembagaWrite;
use Inertia\Inertia;

class LembagaController extends Controller
{
    public function index()
    {
        return Inertia::render('Master/Lembaga/Index', [
            'lembagas' => Vendor::all()
        ]);
    }

    public function getNewSandi()
    {
        $query = Vendor::selectRaw('MAX(CAST(sandi AS INT)) as sandi')->first();

        $sandi = intval($query->sandi) + 1;

        return response()->json([
            'sandi' => $sandi
        ]);
    }

    public function getRawDataBySandi(string $sandi)
    {
        return response()->json([
            'lembaga' => LembagaWrite::where('sandi', $sandi)->firstOrFail(),
        ]);
    }

    public function storeLembaga(LembagaFormRequest $request)
    {
        $validated = $request->validated();

        $lembagaNew = new LembagaWrite();
        $lembagaNew->sandi = $validated['sandi'];
        $lembagaNew->lengkap = $validated['lengkap'];
        $lembagaNew->nope = $validated['nope'];
        $lembagaNew->cp = $validated['cp'];

        $lembagaNew->save();

        return redirect()->route('lembaga.index');
    }

    public function updateLembaga(string $sandi, LembagaFormRequest $request)
    {
        $validated = $request->validated();

        LembagaWrite::where('sandi', $sandi)->update([
            'lengkap' => $validated['lengkap'],
            'nope' => $validated['nope'],
            'cp' => $validated['cp']
        ]);

        return redirect()->route('lembaga.index');
    }

    public function destroyLembaga(string $sandi)
    {
        LembagaWrite::where('sandi', $sandi)->delete();

        return redirect()->route('lembaga.index');
    }
}
