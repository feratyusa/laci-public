<?php

namespace App\Http\Controllers\Event;

use App\Enum\EventCategory;
use App\Enum\FileCategory;
use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\EventFormRequest;
use App\Http\Requests\Event\EventPriceFormRequest;
use App\Http\Requests\NumberTypeRequest;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Models\File\Category;
use App\Models\File\MandatoryFileCategory;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

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
        $event = Event::findOrFail($id);

        $event_participants = EventParticipant::where('event_id', $event->id)->pluck('nip')->toArray();

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
            'participants' => $this->selectOptions(Employee::whereNotIn('nip', $event_participants)->get()->toArray(), 'nip', 'nama')
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
        $events = Event::with('proposal')->orderByDesc('id')->get();
        foreach ($events as $event) {
            $event->setAttribute('isComplete', $event->isMissingCategories());
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
}
