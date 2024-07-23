<?php

namespace App\Http\Controllers\Proposal;

use App\Enum\FileCategory;
use App\Enum\ProposalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\ProposalChangeStatusRequest;
use App\Http\Requests\Proposal\ProposalFormRequest;
use App\Models\Proposal\Proposal;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class ProposalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $paginator = Proposal::paginate(10);

        // Latest proposal and get the year
        $latestp = Proposal::orderByDesc('entry_date')->first();
        $latest_year = date('Y', strtotime($latestp->entry_date));
        // Last proposal and get the year
        $lastp = Proposal::orderBy('entry_date')->first();
        $last_year = date('Y', strtotime($lastp->entry_date));

        return Inertia::render('Proposal/Index', [
            'proposals' => $paginator->items(),
            'paginator' => $paginator,
            'code' => session('code'),
            'status' => session('status'),
        ]);        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Proposal/Create', []);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProposalFormRequest $request)
    {
        $validated = $request->validated();

        $proposal = Proposal::create($validated);

        return redirect()->route('proposal.show', ['id' => $proposal->id])->with(['code' => 1, 'status' => 'Proposal created!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $proposal = Proposal::findOrFail($id);

        $categories = array_column(FileCategory::cases(), 'value');
        $categorySelection = [];
        foreach ($categories as $category) {
            $categorySelection[] = (object)['label' => $category, 'value' => $category];
        }

        $files = $proposal->files()->get();

        return Inertia::render("Proposal/Show", [
            'proposal' => $proposal,
            'categories' => $categorySelection,
            'files' => $files,
            'code' => session('code'),
            'status' => session('status'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('Proposal/Edit', [
            'proposal' => Proposal::find($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProposalFormRequest $request, string $id)
    {
        $proposal = Proposal::findOrFail($id);

        $validated = $request->validated();

        $proposal->updateOrFail($validated);

        return redirect()->route('proposal.show', ['id' => $proposal->id])
            ->with(['code' => 1 ,'status' => 'Proposal updated!']);
    }

    public function changeStatus(ProposalChangeStatusRequest $request, string $id): RedirectResponse
    {
        $proposal = Proposal::findOrFail($id);

        $validate = $request->validated();

        $proposal->status = $validate['status'];

        $proposal->save();
        
        $status = ['code' => 0, 'status' => 'Proposal rejected!'];
        if($validate['status'] == ProposalStatus::ACCEPTED) $status = ['code' => 1, 'status' => 'Proposal accepted!'];
        elseif ($validate['status'] == ProposalStatus::PENDING) $status = ['code' => -1, 'status' => 'Proposal pending!'];

        return redirect()->route('proposal.show', ['id' => $proposal->id])->with($status);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): RedirectResponse
    {
        $proposal = Proposal::findOrFail($id);

        $proposal->deleteOrFail();

        return redirect()->route('proposal.index')->with(['code' => 0, 'status' => 'Proposal deleted!']);
    }
}
