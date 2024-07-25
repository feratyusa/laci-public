<?php

namespace App\Http\Controllers\Event;

use App\Enum\EventCategory;
use App\Enum\FileCategory;
use App\Enum\ParticipantNumberType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Event\EventFormRequest;
use App\Models\Event\Event;
use App\Models\Proposal\Proposal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
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
        $proposals = Proposal::all();
        $proposalSelection = [];
        foreach ($proposals as $proposal) {
            $proposalSelection[] = (object)['value' => $proposal->id, 'label' => "({$proposal->id}) {$proposal->name}"];
        }

        return Inertia::render('Event/Create', [
            'proposals' => $proposalSelection,
            'event_categories' => EventCategory::selection(),
            'number_types' => ParticipantNumberType::selection(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EventFormRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        $event = Event::create($validated);        

        return redirect()->route('event.show', ['id' => $event->id])
            ->with([]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $event = Event::findOrFail($id);

        return Inertia::render('Event/Show', [
            'event' => $event,
            'proposal' => $event->proposal,
            'proposalRoute' => route('proposal.show', ['id' => $event->proposal->id]),
            'categories' => FileCategory::selection(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $event = Event::findOrFail($id);

        $proposals = Proposal::all();
        $proposalSelection = [];
        foreach ($proposals as $proposal) {
            $proposalSelection[] = (object)['value' => $proposal->id, 'label' => "({$proposal->id}) {$proposal->name}"];
        }

        return Inertia::render('Event/Edit', [
            'event' => $event,
            'proposal_id' => $event->proposal->id,
            'proposals' => $proposalSelection,
            'event_categories' => EventCategory::selection(),
            'number_types' => ParticipantNumberType::selection(),
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
