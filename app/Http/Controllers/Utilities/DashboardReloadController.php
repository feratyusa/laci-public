<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardReloadController extends Controller
{
    public function index(){
        return Inertia::render('Utility/DashboardReload/Index');
    }

    public function getDiklat(Request $request){
        $validated = $request->validate([
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ]);

        $query = DB::connection(env('EHC_ENV', 'sqlite'))
                        ->table('diklat')
                        ->leftJoin('courses', 'courses.sandi', '=', 'diklat.kd_kursus')
                        ->whereBetween('diklat.tgl_mulai', [$validated['start_date'], $validated['end_date']])
                        ->get();

        $withOut = $query->whereNull('keterangan');
        $with = $query->whereNotNull('keterangan');

        $withOutGet = [
            'lini' => $withOut->groupBy('lini'),
            'sektor' => $withOut->groupBy('sektor'),
            'sertifikasi' => $withOut->groupBy('sertifikasi'),
            'kategori' => $withOut->groupBy('kategori')
        ];

        $withGet = [
            'lini' => $with->groupBy('lini'),
            'sektor' => $with->groupBy('sektor'),
            'sertifikasi' => $with->groupBy('sertifikasi'),
            'kategori' => $with->groupBy('kategori')
        ];

        return response()->json([
            'with' => $withGet,
            'withOut' => $withOutGet,
        ]);
    }
}
