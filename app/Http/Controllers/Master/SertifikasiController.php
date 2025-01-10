<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Http\Requests\JenisSertifikasi\JenisSertifikasiFormRequest;
use App\Http\Requests\JenisSertifikasi\KursusSertifikasiFormRequest;
use App\Http\Requests\JenisSertifikasi\LevelSertifikasiFormRequest;
use App\Models\EHC\DetailSertifikasi;
use App\Models\EHC\JenisSertifikasi;
use App\Models\EHC\Kursus;
use App\Models\EHC\LevelSertifikasi;
use App\Models\EHCWRITE\DetailSertifikasiWrite;
use App\Models\EHCWRITE\JenisSertifikasiWrite;
use App\Models\EHCWRITE\LevelSertifikasiWrite;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class SertifikasiController extends Controller
{
    public function index()
    {
        $jenis = JenisSertifikasi::with('levels')->get();

        $kursus = Kursus::whereHas('level')->with('level')->get();

        return Inertia::render('Master/Sertifikasi/Index', [
            'jenis' => $jenis,
            'kursus' => $kursus,
        ]);
    }

    public function storeJenisSertifikasi(JenisSertifikasiFormRequest $request)
    {
        $validated = $request->validated();

        JenisSertifikasiWrite::create($validated);

        return redirect()->route('sertifikasi.index');
    }

    public function storeLevelSertifikasi(LevelSertifikasiFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        if(JenisSertifikasi::findOrFail($validated['jenis_sertifikasi_id']))
        {
            LevelSertifikasiWrite::create($validated);
        }

        return redirect()->route('sertifikasi.index');
    }

    public function storeDetailSertifikasi(KursusSertifikasiFormRequest $request)
    {
        $validated = $request->validated();


        if (DetailSertifikasi::where('kursus_id', $validated['kursus_id'])
                                ->first()
        ) {
            throw ValidationException::withMessages(['entity' => 'entity already exist']);
        }

        if (LevelSertifikasi::findOrFail($validated['level_sertifikasi_id']) && Kursus::where('sandi', $validated['kursus_id'])->firstOrFail()) {
            DetailSertifikasiWrite::create($validated);
        }

        return redirect()->route('sertifikasi.index');
    }

    public function updateJenisSertifikasi(string $id, JenisSertifikasiFormRequest $request): RedirectResponse
    {
        $jenisSertifikasi = JenisSertifikasiWrite::findOrFail($id);

        $validated = $request->validated();

        $jenisSertifikasi->update($validated);

        return redirect()->route('sertifikasi.index');
    }

    public function updateLevelSertifikasi(string $id, LevelSertifikasiFormRequest $request): RedirectResponse
    {
        $levelSertifikasi = LevelSertifikasiWrite::findOrFail($id);

        $validated = $request->validated();

        if (JenisSertifikasi::findOrFail($validated['jenis_sertifikasi_id'])
            && ! DetailSertifikasi::where('level_sertifikasi_id', $validated['level_sertifikasi_id'])
                                    ->where('kursus_id', $validated['kursus_id'])
                                    ->first()
        ) {
            $levelSertifikasi->update($validated);
        }

        return redirect()->route('sertifikasi.index');
    }

    public function updateDetailSertifikasi(string $kursus_id, KursusSertifikasiFormRequest $request)
    {
        $validated = $request->validated();

        $entity = DetailSertifikasiWrite::where('kursus_id', $kursus_id)
                                        ->firstOrFail();

        if (LevelSertifikasi::findOrFail($validated['level_sertifikasi_id'])) {
            $entity->update(['level_sertifikasi_id' => $validated['level_sertifikasi_id']]);
        }

        return redirect()->route('sertifikasi.index');
    }

    public function destroyJenisSertifikasi(string $id)
    {
        $entity = JenisSertifikasiWrite::findOrFail($id);

        $entity->delete();

        return redirect()->route('sertifikasi.index');
    }

    public function destroyLevelSertifikasi(string $id)
    {
        $entity = LevelSertifikasiWrite::findOrFail($id);

        $entity->delete();

        return redirect()->route('sertifikasi.index');
    }

    public function destroyDetailSertifikasi(string $kursus_id)
    {
        $entity = DetailSertifikasiWrite::where('kursus_id', $kursus_id);

        $entity->delete();

        return redirect()->route('sertifikasi.index');
    }
}
