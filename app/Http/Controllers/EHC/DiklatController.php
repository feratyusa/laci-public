<?php

namespace App\Http\Controllers\EHC;

use App\Exports\DiklatExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\EHC\DiklatFormRequest;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHCWRITE\DiklatWrite;
use App\Models\Event\Event;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class DiklatController extends Controller
{
    public function storeDiklat(DiklatFormRequest $request, string $event_id)
    {
        $event = Event::with('proposal')->findOrFail($event_id);

        $user = Auth::user();

        $validated = $request->validated();

        DB::beginTransaction();

        try{
            foreach ($validated['nip'] as $nip) {
                $employee = Employee::where('nip', $nip)->firstOrFail();

                $diklat = new DiklatWrite();

                $diklat->Nip = $nip;
                $diklat->kd_kursus = $event->proposal->kd_kursus;
                $diklat->kd_lembaga = $event->proposal->kd_lembaga;
                $diklat->Tgl_mulai = $event->start_date;
                $diklat->tgl_lulus = $event->end_date;
                $diklat->user_nm = "LACI_" . $user->username;
                $diklat->tgl_input = date('Y-m-d H:i:s');
                $diklat->statusRec = 'A'; // I don't know what is this
                $diklat->JNS_DKT = 1; // and this too

                $diklat->save();
            }

            $event->updateOrFail([
                'is_migrated' => true
            ]);

            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    public function getDiklatData(Request $request)
    {
        $validated = $request->validate([
            'kd_kursus' => ['required']
        ]);

        $results = Diklat::selectRaw('nip, MAX(tgl_selesai) as tgl_selesai')
                            ->where('kd_kursus', $validated['kd_kursus'])
                            ->groupBy('nip')
                            ->get();

        return Excel::download(new DiklatExport($results, ['nip', 'tgl_selesai']), "skibidi_diklat.xlsx");
    }
}
