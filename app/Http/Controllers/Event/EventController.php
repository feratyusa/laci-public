<?php

namespace App\Http\Controllers\Event;

use App\Enum\EventCategory;
use App\Enum\FileCategory;
use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\EventFormRequest;
use App\Http\Requests\NumberTypeRequest;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\File\Category;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class EventController extends Controller
{
    use InputHelpers;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginator = Event::paginate(30);

        return Inertia::render("Event/Index", [
            "events" => $paginator->items(),
            'paginator' => $paginator,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Event/Create', [
            'proposals' => $this->selectOptions(new Proposal(), 'id', 'name', true, ['kursus', 'event_category']),
            'proposal_id' => session('proposal_id') ? intval(session('proposal_id')) : null,
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

        $files = $event->files()->get();        

        return Inertia::render('Event/Show', [
            'event' => $event,
            'files' => $files,
            'proposalRoute' => route('proposal.show', ['id' => $event->proposal->id]),
            'categories' => $this->selectOptions(new Category(), 'id', 'name'),
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
            'proposals' => $this->selectOptions(new Proposal(), 'id', 'name', true, ['kursus', 'event_category']),
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

        return redirect()->route('event.index')
            ->with([]);
    }
}
