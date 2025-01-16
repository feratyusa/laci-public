<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Models\EHC\DetailSertifikasi;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHC\JenisSertifikasi;
use App\Models\EHC\Kursus;
use App\Models\EHC\LevelSertifikasi;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportSertifikasiController extends Controller
{
    public function index()
    {
        return Inertia::render('Utility/ReportSertifikasi/Index', [
            'jenis_sertifikasi' => JenisSertifikasi::select('id', 'nama')->orderBy('id')->get(),
            'levels' => LevelSertifikasi::select('id', 'jenis_sertifikasi_id', 'level')->orderBy('id')->get(),
        ]);
    }

    public function getAllSertifikasiStatus(Request $request)
    {
        $validated = $request->validate([
            'jenis_sertifikasi_id' => ['required', 'integer'],
            'level_id' => ['required']
        ]);

        $diklatTable = (new Diklat())->getTable();
        $courseTable = (new Kursus())->getTable();
        $detailSertfikasiTable = (new DetailSertifikasi())->getTable();
        $levelSertfikasiTable = (new LevelSertifikasi())->getTable();
        $jenisSertifikasiTable = (new JenisSertifikasi())->getTable();
        $employeeTable = (new Employee())->getTable();

        $temps = null;
        if ($validated['jenis_sertifikasi_id'] == 0) {
            $temps = Diklat::selectRaw("
                                {$employeeTable}.nip,
                                {$employeeTable}.nama,
                                {$employeeTable}.jabatan,
                                kd_kursus,
                                CAST(tgl_selesai as DATE) as tgl_lulus,
                                urutan,
                                CAST(DATEADD(YEAR, masa_berlaku_tahun, tgl_selesai) AS DATE) as expired,
                                {$levelSertfikasiTable}.level,
                                {$jenisSertifikasiTable}.nama as jenis_sertifikasi,
                                jenis_sertifikasi_id
                            ")
                            ->leftJoin($employeeTable, "{$employeeTable}.nip", "=", "{$diklatTable}.nip")
                            ->leftJoin($courseTable, "{$courseTable}.sandi", "=", "{$diklatTable}.kd_kursus")
                            ->leftJoin($detailSertfikasiTable, "{$detailSertfikasiTable}.kursus_id", "=", "{$courseTable}.sandi")
                            ->leftJoin($levelSertfikasiTable, "{$levelSertfikasiTable}.id", "=", "{$detailSertfikasiTable}.level_sertifikasi_id")
                            ->leftJoin($jenisSertifikasiTable, "{$jenisSertifikasiTable}.id", "=", "{$levelSertfikasiTable}.jenis_sertifikasi_id")
                            ->whereNotNull('jenis_sertifikasi_id')
                            ->whereRaw("((nilai2 IS NULL AND nilai3 IS NULL) OR (nilai2 IS NULL AND nilai3 <> ?) OR (nilai2 <> ? AND nilai3 IS NULL) OR NOT(nilai2 = ? OR nilai3 = ?))",
                                    ['0', 'TIDAK KOMPETEN', '0', 'TIDAK KOMPETEN'])
                            ->orderBy('expired')
                            ->get();
        }
        else if($validated['level_id'] == 0){
            $temps = Diklat::selectRaw("
                                {$employeeTable}.nip,
                                {$employeeTable}.nama,
                                {$employeeTable}.jabatan,
                                kd_kursus,
                                CAST(tgl_selesai as DATE) as tgl_lulus,
                                urutan,
                                CAST(DATEADD(YEAR, masa_berlaku_tahun, tgl_selesai) AS DATE) as expired,
                                {$levelSertfikasiTable}.level,
                                {$jenisSertifikasiTable}.nama as jenis_sertifikasi,
                                jenis_sertifikasi_id
                            ")
                            ->leftJoin($employeeTable, "{$employeeTable}.nip", "=", "{$diklatTable}.nip")
                            ->leftJoin($courseTable, "{$courseTable}.sandi", "=", "{$diklatTable}.kd_kursus")
                            ->leftJoin($detailSertfikasiTable, "{$detailSertfikasiTable}.kursus_id", "=", "{$courseTable}.sandi")
                            ->leftJoin($levelSertfikasiTable, "{$levelSertfikasiTable}.id", "=", "{$detailSertfikasiTable}.level_sertifikasi_id")
                            ->leftJoin($jenisSertifikasiTable, "{$jenisSertifikasiTable}.id", "=", "{$levelSertfikasiTable}.jenis_sertifikasi_id")
                            ->where('jenis_sertifikasi_id', "=", $validated['jenis_sertifikasi_id'])
                            ->whereRaw("((nilai2 IS NULL AND nilai3 IS NULL) OR (nilai2 IS NULL AND nilai3 <> ?) OR (nilai2 <> ? AND nilai3 IS NULL) OR NOT(nilai2 = ? OR nilai3 = ?))",
                                    ['0', 'TIDAK KOMPETEN', '0', 'TIDAK KOMPETEN'])
                            ->orderBy('expired')
                            ->get();
        }
        else{
            $temps = Diklat::selectRaw("
                                {$employeeTable}.nip,
                                {$employeeTable}.nama,
                                {$employeeTable}.jabatan,
                                kd_kursus,
                                CAST(tgl_selesai as DATE) as tgl_lulus,
                                urutan,
                                CAST(DATEADD(YEAR, masa_berlaku_tahun, tgl_selesai) AS DATE) as expired,
                                {$levelSertfikasiTable}.level,
                                {$jenisSertifikasiTable}.nama as jenis_sertifikasi,
                                jenis_sertifikasi_id
                            ")
                            ->leftJoin($employeeTable, "{$employeeTable}.nip", "=", "{$diklatTable}.nip")
                            ->leftJoin($courseTable, "{$courseTable}.sandi", "=", "{$diklatTable}.kd_kursus")
                            ->leftJoin($detailSertfikasiTable, "{$detailSertfikasiTable}.kursus_id", "=", "{$courseTable}.sandi")
                            ->leftJoin($levelSertfikasiTable, "{$levelSertfikasiTable}.id", "=", "{$detailSertfikasiTable}.level_sertifikasi_id")
                            ->leftJoin($jenisSertifikasiTable, "{$jenisSertifikasiTable}.id", "=", "{$levelSertfikasiTable}.jenis_sertifikasi_id")
                            ->where('jenis_sertifikasi_id', "=", $validated['jenis_sertifikasi_id'])
                            ->where('level_sertifikasi_id', '=', $validated['level_id'])
                            ->whereRaw("((nilai2 IS NULL AND nilai3 IS NULL) OR (nilai2 IS NULL AND nilai3 <> ?) OR (nilai2 <> ? AND nilai3 IS NULL) OR NOT(nilai2 = ? OR nilai3 = ?))",
                                    ['0', 'TIDAK KOMPETEN', '0', 'TIDAK KOMPETEN'])
                            ->orderBy('expired')
                            ->get();
        }

        $temps = $temps->groupBy('jenis_sertifikasi_id');
        $tempsGrouped = [];
        foreach ($temps as $key => $values) {
            $tempsGrouped[$key] = $values->groupBy('nip');
        }

        $results = [];
        foreach ($tempsGrouped as $key => $temps) {
            foreach ($temps as $nip => $values) {
                $resTemp = [
                    'nip' => $nip,
                    'jenis_sertifikasi_id' => $key,
                    'nama' => $values[0]->nama,
                    'jabatan' => $values[0]->jabatan,
                    'level' => '',
                    'jenis_sertifikasi' => '',
                    'kd_kursus' => '',
                    'tgl_lulus' => '',
                    'expired' => date('1990-01-01'),
                    'urutan' => 0
                ];

                foreach ($values as $value) {
                    if($resTemp['urutan'] < $value->urutan){
                        $resTemp['level'] = $value['level'];
                        $resTemp['jenis_sertifikasi'] = $value['jenis_sertifikasi'];
                        $resTemp['kd_kursus'] = $value['kd_kursus'];
                        $resTemp['tgl_lulus'] = $value['tgl_lulus'];
                        $resTemp['urutan'] = $value['urutan'];
                        $resTemp['expired'] = $value['expired'];
                    }
                    else if($resTemp['urutan'] == $value->urutan && $resTemp['expired'] < date($value->expired)){
                        $resTemp['level'] = $value['level'];
                        $resTemp['jenis_sertifikasi'] = $value['jenis_sertifikasi'];
                        $resTemp['kd_kursus'] = $value['kd_kursus'];
                        $resTemp['tgl_lulus'] = $value['tgl_lulus'];
                        $resTemp['expired'] = $value['expired'];
                    }
                }

                $results[] = $resTemp;
            }
        }

        if ($validated['jenis_sertifikasi_id'] == 0) {
            $subtitle = 'Semua';
        }
        else{
            $tempSub = JenisSertifikasi::find($validated['jenis_sertifikasi_id']);
            $subtitle = $tempSub->nama;
            if ($validated['level_id'] != 0) {
                $tempSub = LevelSertifikasi::find($validated['level_id']);
                $subtitle .= " " . $tempSub->level;
            }
        }

        return response()->json([
            'results' => $results,
            'subtitle' => $subtitle,
        ]);
    }

    public function getKursusLevelDetailsBySandi(string $id)
    {
        return response()->json([
            'level' => LevelSertifikasi::findOrFail($id)
        ]);
    }

    public function getAllSertifikasiDataByNip(string $nip, Request $request)
    {
        $validated = $request->validate([
            'jenis_sertifikasi_id' => ['required', 'integer']
        ]);

        $diklatTable = (new Diklat())->getTable();
        $courseTable = (new Kursus())->getTable();
        $detailSertfikasiTable = (new DetailSertifikasi())->getTable();
        $levelSertfikasiTable = (new LevelSertifikasi())->getTable();
        $jenisSertifikasiTable = (new JenisSertifikasi())->getTable();

        $results = Diklat::selectRaw("
                                kd_kursus,
                                {$courseTable}.lengkap,
                                level,
                                {$jenisSertifikasiTable}.nama,
                                CAST(tgl_selesai as DATE) as tgl_lulus,
                                urutan,
                                CAST(DATEADD(YEAR, masa_berlaku_tahun, tgl_selesai) AS DATE) as expired
                            ")
                        ->leftJoin($courseTable, "{$courseTable}.sandi", "=", "{$diklatTable}.kd_kursus")
                        ->leftJoin($detailSertfikasiTable, "{$detailSertfikasiTable}.kursus_id", "=", "{$courseTable}.sandi")
                        ->leftJoin($levelSertfikasiTable, "{$levelSertfikasiTable}.id", "=", "{$detailSertfikasiTable}.level_sertifikasi_id")
                        ->leftJoin($jenisSertifikasiTable, "{$jenisSertifikasiTable}.id", "=", "{$levelSertfikasiTable}.jenis_sertifikasi_id")
                        ->where('jenis_sertifikasi_id', "=", $validated['jenis_sertifikasi_id'])
                        ->whereRaw("((nilai2 IS NULL AND nilai3 IS NULL) OR (nilai2 IS NULL AND nilai3 <> ?) OR (nilai2 <> ? AND nilai3 IS NULL) OR NOT(nilai2 = ? OR nilai3 = ?))",
                                    ['0', 'TIDAK KOMPETEN', '0', 'TIDAK KOMPETEN'])
                        ->where('nip', $nip)
                        ->orderByDesc('urutan')
                        ->orderByDesc('tgl_selesai')
                        ->get();

        return response()->json([
            'courses' => $results,
            'employee' => Employee::select('nip', 'nama')->where('nip', $nip)->first()
        ]);
    }
}
