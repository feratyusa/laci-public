<?php

namespace App\Http\Controllers\Event;

use App\Enum\ParticipantNumberType;
use App\Exports\EventParticipantsExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\EventFormRequest;
use App\Http\Requests\Event\EventPriceFormRequest;
use App\Models\EHC\AbsenDiklat;
use App\Models\EHC\Employee;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Models\File\Category;
use App\Models\File\MandatoryFileCategory;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class EventController extends Controller
{
    use InputHelpers;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render("Event/Index");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $proposal_id =  intval(session('proposal_id'));
        if($request->filled('proposal_id')){
            $validated = $request->validate([
                'proposal_id' => ['integer']
            ]);
            $proposal_id = $validated['proposal_id'];
        }

        return Inertia::render('Event/Create', [
            'proposals' => $this->selectOptions(Proposal::all()->toArray(), 'id', 'name', true, ['kursus', 'event_category']),
            'proposal_id' => $proposal_id,
            'status' => session('status'),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventFormRequest $request)
    {
        $validated = $request->validated();
        $validated['created_by'] = Auth::user()->username;

        DB::beginTransaction();

        try{
            $event = Event::create($validated);        
            
            $proposal = $event->proposal;

            foreach($proposal->prices as $price){                
                $event->prices()->create([                    
                    'budget_type_id' => $price->budget_type_id,
                    'price' => $price->price,
                    'participantNum' => $validated['participant_number'],
                ]);
            }

            DB::commit();
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }        

        return redirect()->route('event.show', ['id' => $event->id])
            ->with([]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::with('proposal')->findOrFail($id);

        // $event_participants = EventParticipant::where('event_id', $event->id)->pluck('nip')->toArray();

        $files = $event->files()->get();

        $event['total_prices'] = 0;
        foreach($event->prices as $price){
            if($price->defaultParticipants) $participants = $event->participants()->count();
            else $participants = $price->participantNum;
            $event['total_prices'] += intval($price->price) * $participants;
        }        

        return Inertia::render('Event/Show', [
            'event' => $event,
            'files' => $files,
            'mandatoryFiles' => $this->mandatoriesOptions(MandatoryFileCategory::where(['mandatory_type' => $event->proposal->event_category])->get()->toArray()),
            'proposalRoute' => route('proposal.show', ['id' => $event->proposal->id]),
            'categories' => $this->selectOptions(Category::all()->toArray(), 'id', 'name', false),
            // 'participants' => $this->selectOptions(Employee::whereNotIn('nip', $event_participants)->get()->toArray(), 'nip', 'nama')
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $event = Event::findOrFail($id);

        return Inertia::render('Event/Edit', [
            'event' => $event,
            'proposal_id' => $event->proposal->id,
            'proposals' => $this->selectOptions(Proposal::all()->toArray(), 'id', 'name', true, ['kursus', 'event_category']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EventFormRequest $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validated();

        $event->updateOrFail($validated);

        return redirect()->route('event.show', ['id' => $event->id])
            ->with([]);
    }

    public function changeNumberType(string $id)
    {
        $event = Event::findOrFail($id);

        switch($event->participant_number_type){
            case ParticipantNumberType::FIXED->value:
                $event->update([
                    'participant_number_type' => ParticipantNumberType::DYNAMIC->value
                ]);
                break;

            case ParticipantNumberType::DYNAMIC->value:
                $event->update([
                    'participant_number_type' => ParticipantNumberType::FIXED->value
                ]);
                break;
            
            default:
                break;
        }

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $event = Event::findOrFail($id);

        $event->deleteOrFail();

        return redirect()->route('event.index');            
    }

    public function get()
    {
        $events = Event::whereHas('proposal')->with('proposal')->orderByDesc('id')->get();

        foreach ($events as $event) {
            $status = [];
            
            if($event->isMissingCategories()) $status[] = 1;
            else $status[] = -1;
            
            if($event->defaultPrices == 0) $status[] = 4;
            else $status[] = -4;

            if($event->is_migrated == 1) $status[] = 5;
            else $status[] = -5;

            $event->setAttribute('status', $status);
        }
        
        return response()->json([
            'events' => $events
        ]);
    }

    public function setPrices(EventPriceFormRequest $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validated();

        DB::beginTransaction();

        try{
            foreach ($event->prices as $price) {
                $deleteFlag = true;
                foreach($validated['details'] as $check){
                    if($check['budget_type_id'] == $price->budget_type_id){
                        $deleteFlag = false;
                        break;
                    }
                }
                if($deleteFlag){
                    $price->deleteOrFail();
                }
            }
    
            foreach ($validated['details'] as $detail) {
                $event->prices()->updateOrCreate(
                    ['budget_type_id' => $detail['budget_type_id']],
                    $detail
                );
            }

            $event->update([
                'defaultPrices' => 0
            ]);
            
            DB::commit();
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    public function resetPrices(string $id)
    {
        $event = Event::findOrFail($id);

        $event->prices()->delete();

        $event->update([
            'defaultPrices' => 0
        ]);

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    public function changeDefaultPrices(string $id)
    {        
        $event = Event::findOrFail($id);
        $proposal = $event->proposal;

        if($event->defaultPrices == 0){
            foreach ($event->prices as $eventPrice) {
                $deleteFlag = true;
                foreach($proposal->prices as $proposalPrice){
                    if($proposalPrice->budget_type_id == $eventPrice->budget_type_id){
                        $deleteFlag = false;
                        break;
                    }
                }
                if($deleteFlag){
                    $eventPrice->deleteOrFail();
                }
            }

            foreach($proposal->prices as $price){
                $event->prices()->updateOrCreate(
                    ['budget_type_id' => $price->budget_type_id],
                    [
                                'budget_type_id' => $price->budget_type_id,
                                'price' => $price->price,
                                'participantNum' => $event->participant_number
                            ]
                );
            }
        }

        $event->update([
            'defaultPrices' => ! $event->defaultPrices
        ]);

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    public function exportEventParticipants(string $id)
    {
        $event = Event::findOrFail($id);
        $eventCount = EventParticipant::select('nip')->where('event_id', $event->id)->get()->count();
        $fileName = "Peserta {$event->name} [ID{$event->id}].xlsx";

        return Excel::download(new EventParticipantsExport($id, $eventCount), $fileName);       
    }

    public function importFromAbsenDiklat(Request $request, string $id)
    {
        $event = Event::findOrFail($id);

        $validated = $request->validate([
            'quiz_id' => ['required', 'numeric']
        ]);

        $absen = AbsenDiklat::select('nip')
                                ->where('quiz_id', $validated['quiz_id'])
                                ->distinct()
                                ->get()
                                ->toArray();

        DB::beginTransaction();

        try{
            $event->participants()->delete();

            $employees = Employee::select('nip', 'nama', 'jabatan', 'cabang')
                                    ->whereIn('nip', $absen)
                                    ->get();

            foreach($employees as $employee){
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
            
            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('event.show', ['id' => $event->id]);
    }

    public function getTemplateInputParticipantsFile()
    {
        return Storage::download('public\TEMPLATE_INPUT_PESERTA.xlsx');
    }

    public function changeMigrateStatus(string $id)
    {
        $event = Event::findOrFail($id);

        $event->updateOrFail([
            'is_migrated' => ! $event->is_migrated
        ]);

        return redirect()->route('event.show', $event->id);
    }
}
