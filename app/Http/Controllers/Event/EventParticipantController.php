<?php

namespace App\Http\Controllers\Event;

use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\ParticipantFormRequest;
use App\Models\EHC\Employee;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Trait\FlashMessage;
use Error;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\DB;

class EventParticipantController extends Controller
{
    use FlashMessage;
    /**
     * Display a listing of the resource.
     */
    public function index(string $id)
    {
        return EventParticipant::where('event_id', $id)->get();
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 
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
}
