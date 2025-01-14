<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Models\EHC\DetailSertifikasi;
use App\Models\EHC\Diklat;
use App\Models\EHC\Kursus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportSertifikasiController extends Controller
{
    public function index()
    {
        return Inertia::render('Utility/ReportSertifikasi/Index', [

        ]);
    }

    public function getAllSertifikasiStatus(Request $request)
    {
        $validated = $request->validate([
            'jenis_sertifikasi_id' => ['required', 'integer']
        ]);

        $courses = Kursus::with('level')
                        ->whereHas('level', function(Builder $query) use($validated) {
                            $query->where('jenis_sertifikasi_id', $validated['jenis_sertifikasi_id']);
                        })
                        ->pluck('sandi');

        $sertifikasies = Diklat::whereIn('kd_kursus', $courses)
                                        ->get();

        foreach ($sertifikasies as $value) {

        }

        // return response()->json([
        //     'data' =>
        // ]);
    }
}
