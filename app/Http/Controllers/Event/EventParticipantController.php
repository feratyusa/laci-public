<?php

namespace App\Http\Controllers\Event;

use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\CheckEventParticipantForm;
use App\Http\Requests\Event\ParticipantFormRequest;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Trait\FlashMessage;
use Error;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
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

        return Inertia::render("Event/Participants", [            
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

        if($request->filled('file')){

        }
        else{
            $ids = $validated['nip'];

            $delete = EventParticipant::where('event_id', $event->id)->delete();

            foreach($ids as $id){
                $employee = Employee::where('nip', $id)->firstOrFail();
                $trashed = EventParticipant::withTrashed()->where('nip', $employee->nip)->first();
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
    
    private function checkParticipantStatuses(mixed $participants, string $courseID)
    {
        $events = Event::select('events.id', 'events.name', 'events.start_date', 'events.end_date')
                            ->leftJoin('proposals', 'proposals.id', '=', 'events.proposal_id')
                            ->where('proposals.kd_kursus', '=', $courseID)
                            ->where('start_date', '>', date('Y-m-d', strtotime('now')))
                            ->get();

        foreach($participants as $index => $participant){
            $participants[$index]['countIn'] = [];

            foreach($events as $event){
                if(! in_array($participant['nip'], $event->participants()->pluck('nip')->toArray())) continue;

                $participants[$index]['countIn'][] = $event;
            }
        }

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

    private function getParticipants(string $mode, array $validated)
    {
        $participants = null;
        switch ($mode) {
            case 'bulk':
                $participants = $this->bulkParticipants($validated['kd_kursus'], $validated['start_date'], $validated['bulk']);
                break;
            
            default:
                # code...
                break;
        }

        $result = $this->checkParticipantStatuses($participants, $validated['kd_kursus']);

        return $result;
    }

    public function checkParticipants(CheckEventParticipantForm $request)
    {
        $validated = $request->validated();

        return response()->json([
            'result' => $this->getParticipants($validated['mode'], $validated)    
        ]);
    }
    public function checkStatuses(Request $request)
    {
        $validated = $request->validate([
            'participants' => ['required', 'array'],
            'kd_kursus' => ['required', 'numeric']  
        ]);

        $participants = $validated['participants'];        

        $events = Event::select('events.id', 'events.name', 'events.start_date', 'events.end_date')
                            ->leftJoin('proposals', 'proposals.id', '=', 'events.proposal_id')
                            ->where('proposals.kd_kursus', '=', $validated['kd_kursus'])
                            ->where('start_date', '>', date('Y-m-d', strtotime('now')))
                            ->get();

        foreach($validated['participants'] as $index => $participant){
            foreach($events as $event){
                if(! in_array($participant['nip'], $event->participants()->pluck('nip')->toArray())) continue;
                $participants[$index]['countIn'][] = $event;
            }
        }

        return response()->json([
            'mess' => $participants
        ]);
    }    
}
