<?php

namespace App\Http\Controllers\Event;

use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\CheckEventParticipantForm;
use App\Http\Requests\Event\ParticipantFormRequest;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Trait\FlashMessage;
use Error;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class EventParticipantController extends Controller
{
    use FlashMessage;
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
    }

    public function manage(string $id)
    {
        $event = Event::findOrFail($id);

        return Inertia::render("Event/ManageParticipants", [
            'event' => $event,
            'kursus' => $event->proposal->kursus()->first(['sandi', 'lengkap'])
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ParticipantFormRequest $request, string $id): RedirectResponse
    {
        $event = Event::findOrFail($id);

        $validated = $request->validated();

        if($request->filled('file')){

        }
        else{
            $ids = $validated['nip'];

            DB::beginTransaction();

            try{
                foreach ($ids as $id) {
                    $employee = Employee::where('nip', $id)->firstOrFail();
                    $trashed = EventParticipant::withTrashed()->where('event_id', $event->id)->where('nip', $employee->nip)->first();
                    if($trashed) $trashed->restore();
                    else{
                        EventParticipant::create([
                            'nip' => $employee->nip,
                            'nama' => $employee->nama,
                            'jabatan' => $employee->jabatan,
                            'cabang' => $employee->cabang,
                            'event_id' => $event->id
                        ]);
                    }
                }

                $event->update([
                    'participant_number_type' => ParticipantNumberType::DYNAMIC->value
                ]);

                DB::commit();
            }catch(Error){
                DB::rollBack();
            }
        }

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ParticipantFormRequest $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validated();

        DB::beginTransaction();

        try{
            if($request->filled('file')){

            }
            else{
                $ids = $validated['nip'];
                foreach($ids as $id){
                    $employee = Employee::where('nip', $id)->firstOrFail();
                    EventParticipant::withTrashed()->updateOrCreate(
                        ['nip' => $employee->nip, 'event_id' => $event->id],
                        [
                            'nama' => $employee->nama,
                            'cabang' => $employee->cabang,
                            'jabatan' => $employee->jabatan,
                            'deleted_at' => null
                        ]
                    )->restore();
                }

                $event->update([
                    'participant_number_type' => ParticipantNumberType::DYNAMIC->value
                ]);
            }

            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    public function destroy(string $id, string $nip)
    {
        $event = Event::findOrFail($id);

        DB::beginTransaction();

        try{
            $event->participants()->where('nip', $nip)->first()->deleteOrFail();

            DB::commit();
        }catch(Error){
            DB::rollBack();
        }

        $event->update([
            'participant_number_type' => ParticipantNumberType::DYNAMIC->value
        ]);

        return redirect()->back();
    }

    private function checkParticipantStatuses(mixed $participants, string $eventID, string $start_date, string $end_date)
    {
        $events = Event::select('id', 'name', 'start_date', 'end_date')
                            ->where('id', '!=', $eventID)
                            ->whereRaw('((start_date >= ? AND start_date <= ?) or (start_date <= ? AND end_date >= ?))',
                                [$start_date, $end_date, $start_date, $start_date])
                            ->get();

        foreach($participants as $index => $participant){
            $participants[$index]['countIn'] = [];

            foreach($events as $event){
                if(! in_array($participant['nip'], $event->participants()->pluck('nip')->toArray())) continue;

                $participants[$index]['countIn'][] = $event;
            }
        }

        // return $events;
        return $participants;
    }

    private function bulkParticipants(string $courseID, string $date, array $bulks)
    {
        $sqls = [];
        $bind = [];
        foreach ($bulks as $bulk) {
            $binder = array_fill(0, count($bulk['value']), '?');

            $sqls[] = $bulk['column'] . ' in (' . implode(', ', $binder) . ')';

            $bind = array_merge($bind, $bulk['value']);
        }

        $mergeSQL = implode(' AND ', $sqls);

        $diklat = Diklat::select('nip')
                        ->whereRaw('kd_kursus like ? and tgl_mulai > ?', [$courseID, $date]);

        $participants = Employee::select('nip', 'nama', 'cabang', 'jabatan', 'seksi', 'jobfam')
                                ->whereRaw($mergeSQL, $bind)
                                ->whereNotIn('nip', $diklat)
                                ->get()->toArray();

        return $participants;
    }

    private function getEventParticipants(string $event_id)
    {
        $eventParticipants = EventParticipant::select('nip')
                                                ->where('event_id', $event_id)
                                                ->pluck('nip')
                                                ->toArray();

        return Employee::select('nip', 'nama', 'cabang', 'jabatan', 'seksi', 'jobfam')
                                                ->whereIn('nip', $eventParticipants)
                                                ->get()->toArray();
    }

    private function getParticipants(string $mode, array $validated)
    {
        $participants = null;
        switch ($mode) {
            case 'bulk':
                $participants = $this->bulkParticipants($validated['kd_kursus'], $validated['start_date'], $validated['bulk']);
                break;

            default:
                $participants = $this->getEventParticipants($validated['event_id']);
                break;
        }

        $result = $this->checkParticipantStatuses($participants, $validated['event_id'], $validated['event_start'], $validated['event_end']);

        return $result;
    }

    public function checkParticipants(CheckEventParticipantForm $request)
    {
        $validated = $request->validated();

        return response()->json([
            'result' => $this->getParticipants($validated['mode'], $validated)
        ]);
    }

    public function updateAndReplace(ParticipantFormRequest $request, string $id)
    {
        $validated = $request->validated();

        $event = Event::findOrFail($id);

        DB::beginTransaction();

        $nips = $validated['nip'];

        try{
            $event->participants()->delete();

            foreach($nips as $nip){
                $employee = Employee::where('nip', $nip)->firstOrFail();

                EventParticipant::withTrashed()->updateOrCreate(
                    ['nip' => $employee->nip, 'event_id' => $event->id],
                    [
                        'nama' => $employee->nama,
                        'cabang' => $employee->cabang,
                        'jabatan' => $employee->jabatan,
                    ]
                )->restore();
            }

            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('event.show', $event->id);
    }
}
