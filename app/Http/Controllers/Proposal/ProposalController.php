<?php

namespace App\Http\Controllers\Proposal;

use App\Enum\ProposalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\ProposalChangeStatusRequest;
use App\Http\Requests\Proposal\ProposalFormRequest;
use App\Models\EHC\Kursus;
use App\Models\File\Category;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProposalController extends Controller
{
    use InputHelpers;

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new ProposalFilterController();
        $paginator = $filter->run($request);
        
        return Inertia::render('Proposal/Index', [
            'proposals' => $paginator->items(),
            'paginator' => $paginator,
            'kursus' => $this->selectOptions(new Kursus(), 'sandi', 'lengkap'),        
            'code' => session('code'),
            'status' => session('status'),
        ]);        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Proposal/Create', [
            'kursus' => $this->selectOptions(new Kursus(), 'sandi', 'lengkap', true, ['kategori']),
        ]);
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

        return Inertia::render("Proposal/Show", [
            'proposal' => $proposal,
            'categories' => $this->selectOptions(new Category(), 'id', 'name', false),
            'files' => $proposal->files()->get(),
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
            'proposal' => Proposal::find($id),
            'kursus' => $this->selectOptions(new Kursus(), 'sandi', 'lengkap'),
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
        if($validate['status'] == ProposalStatus::ACCEPTED->value) {
            $status = [
                'status' => "Proposal accepted! Silahkan membuat event dari proposal yang telah diterima.",
                'proposal_id' => $id,
            ];
            return redirect()->route('event.create')->with($status);
        }
        elseif ($validate['status'] == ProposalStatus::PENDING->value) $status = ['code' => -1, 'status' => 'Proposal pending!'];

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
