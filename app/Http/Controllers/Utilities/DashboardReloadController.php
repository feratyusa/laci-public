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

        $all = [
            'lini' => $query->whereNotNull('lini')->groupBy('lini'),
            'sektor' => $query->whereNotNull('sektor')->groupBy('sektor'),
            'sertifikasi' => $query->whereNotNull('sertifikasi')->groupBy('sertifikasi'),
            'kategori' => $query->whereNotNull('kategori')->groupBy('kategori')
        ];

        return response()->json([
            'reports' => $all
        ]);
    }
}
