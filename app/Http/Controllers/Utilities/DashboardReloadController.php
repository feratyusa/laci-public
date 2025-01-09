<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DashboardReloadController extends Controller
{
    public function index(){
        return Inertia::render('Utility/DashboardReload/Index');
    }
    public function getColumnValueResults(Request $request){
        $validated = $request->validate([
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
            'column' => Rule::in(['lini', 'sektor', 'kategori', 'sertifikasi']),
            'value' => ['string']
        ]);

        $diklatTable = env('EHC_DIKLAT', 'diklat');
        $courseTable = env('EHC_KURSUS', 'courses');
        $startDate = $validated['start_date'];
        $endDate = $validated['end_date'];
        $column = $validated['column'];
        $value = $validated['value'];

        $result = DB::connection(env('EHC_ENV', 'sqlite'))
                                ->table($diklatTable)
                                ->leftJoin($courseTable, $courseTable.".sandi", '=', $diklatTable.'.kd_kursus')
                                ->select('nip', 'nama', 'jabatan', 'cabang', 'pelatihan', 'tgl_mulai', 'tgl_selesai', $column, 'sektor', 'sertifikasi', 'kategori', 'keterangan', 'deskripsi')
                                ->whereBetween('tgl_mulai', [$startDate, $endDate])
                                ->where($column, $value)
                                ->get();

        return response()->json([
            'result' => $result
        ]);
    }

    private function getColumnValues($column){
        $courseTable = env('EHC_KURSUS', 'courses');

        $temps = DB::connection(env('EHC_ENV', 'sqlite'))
                    ->table($courseTable)
                    ->select($column)
                    ->whereNotNull($column)
                    ->groupBy($column)
                    ->pluck($column)
                    ->toArray();

        return $temps;
    }

    public function getAllColumnValues(){
        $all = [
            'lini' => $this->getColumnValues('lini'),
            'sektor' => $this->getColumnValues('sektor'),
            'kategori' => $this->getColumnValues('kategori'),
            'sertifikasi' => $this->getColumnValues('sertifikasi'),
        ];

        return response()->json([
            'result' => $all
        ]);
    }
}
