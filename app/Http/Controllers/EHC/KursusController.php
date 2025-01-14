<?php

namespace App\Http\Controllers\EHC;

use App\Http\Controllers\Controller;
use App\Http\Requests\EHC\KursusFormRequest;
use App\Models\EHC\DetailSertifikasi;
use App\Models\EHC\Kursus;
use App\Models\EHCWRITE\DetailSertifikasiWrite;
use App\Models\EHCWRITE\KursusWrite;
use Illuminate\Http\Request;
use Inertia\Inertia;

class KursusController extends Controller
{
    public function index()
    {
        $kursus = Kursus::with('level')->get();

        return Inertia::render('Master/Kursus/Index', [
            'kursus' => $kursus
        ]);
    }

    public function getNewSandi()
    {
        $query = Kursus::selectRaw('MAX(CAST(sandi AS INT)) as sandi')->first();

        $sandi = intval($query->sandi) + 1;

        return response()->json([
            'sandi' => $sandi
        ]);
    }

    public function getKursusRawDataBySandi(string $sandi)
    {
        return response()->json([
            'course' => KursusWrite::where('Sandi', $sandi)->firstOrFail(),
            'level' => DetailSertifikasi::where('kursus_id', $sandi)->first()
        ]);
    }

    public function storeKursus(KursusFormRequest $request)
    {
        $validated = $request->validated();

        $kursus = new KursusWrite();

        $kursus->Sandi = $validated['sandi'];
        $kursus->Lengkap = $validated['nama'];
        $kursus->tempat = $validated['tempat'];
        $kursus->npublic = $validated['npublic'];
        $kursus->nlini = $validated['nlini'];
        $kursus->nsektor = $validated['nsektor'];
        $kursus->sertifikat = $validated['sertifikat'];
        $kursus->nskill = $validated['nskill'];

        DetailSertifikasiWrite::create([
            'kursus_id' => $validated['sandi'],
            'level_sertifikasi_id' => $validated['level_sertifikasi_id']
        ]);

        $kursus->save();

        return redirect()->route('kursus.index');
    }

    public function updateKursus(string $sandi, KursusFormRequest $request)
    {
        $validated = $request->validated();

        KursusWrite::where('Sandi', $sandi)->update([
            'Lengkap' => $validated['nama'],
            'tempat' => $validated['tempat'],
            'npublic' => $validated['npublic'],
            'nlini' => $validated['nlini'],
            'nsektor' => $validated['nsektor'],
            'sertifikat' => $validated['sertifikat'],
            'nskill' => $validated['nskill']
        ]);

        switch ($validated['sertifikat']) {
            case 'non':
                DetailSertifikasiWrite::where('kursus_id', $sandi)->delete();
                break;

            default:
                DetailSertifikasiWrite::updateOrCreate(
                    ['kursus_id' => $validated['sandi']],
                    ['level_sertifikasi_id' => $validated['level_sertifikasi_id']]
                );
                break;
        }


        return redirect()->route('kursus.index');
    }

    public function destroyKursus(string $sandi)
    {
        $kursus = KursusWrite::where('Sandi', $sandi);

        $kursus->delete();

        DetailSertifikasiWrite::where('kursus_id', $sandi)->delete();

        return redirect()->route('kursus.index');
    }
}
