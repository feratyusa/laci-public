<?php

namespace App\Http\Controllers\Event;

use App\Enum\EventCategory;
use App\Enum\FileCategory;
use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\EventFormRequest;
use App\Http\Requests\NumberTypeRequest;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\Event\EventParticipant;
use App\Models\File\Category;
use App\Models\File\MandatoryFileCategory;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    use InputHelpers;
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new EventFilterController();
        $paginator = $filter->run($request);

        return Inertia::render("Event/Index", [
            "events" => $paginator->items(),
            'paginator' => $paginator,
            "kursus" => $this->selectOptions(Kursus::all()->toArray(), 'sandi', 'lengkap', true),
        ]);
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
    public function store(EventFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $event = Event::create($validated);
        
        $event->prices()->create($validated);

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

    public function changeNumberType(NumberTypeRequest $request, string $id): RedirectResponse
    {
        $event = Event::findOrFail($id);

        $validated = $request->validated();

        if($validated === ParticipantNumberType::DYNAMIC->value){
            $numbers = $event->participants()->count();
            $event->update([
                'participant_number_type' => $validated['participant_number_type'],
                'participant_number' => $numbers,
            ]);
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

        return back()
            ->with(['message' => 'Event berhasil dihapus!']);
    }
}
