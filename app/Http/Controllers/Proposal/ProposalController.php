<?php

namespace App\Http\Controllers\Proposal;

use App\Enum\MandatoryCategoryLink;
use App\Enum\ProposalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\ProposalChangeStatusRequest;
use App\Http\Requests\Proposal\ProposalFormRequest;
use App\Http\Requests\Proposal\ProposalPricesFormRequest;
use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\File\Category;
use App\Models\File\MandatoryFileCategory;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProposalController extends Controller
{
    use InputHelpers;

    /**
     * Display a listing of the resource.
     */
    public function index()
    {       
        return Inertia::render('Proposal/Index');        
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Proposal/Create', [
            'kursus' => $this->selectOptions(Kursus::all()->toArray(), 'sandi', 'lengkap', true, ['kategori']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProposalFormRequest $request)
    {
        $validated = $request->validated();
        
        $validated['created_by'] = Auth::user()->username;

        $proposal = Proposal::create($validated);

        return redirect()->route('proposal.show', ['id' => $proposal->id])->with(['code' => 1, 'status' => 'Proposal created!']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $proposal = Proposal::with('events')->findOrFail($id);

        return Inertia::render("Proposal/Show", [
            'proposal' => $proposal,
            'categories' => $this->selectOptions(Category::all()->toArray(), 'id', 'name', false),            
            'files' => $proposal->files()->get(),
            'mandatoryFiles' => $this->mandatoriesOptions(MandatoryFileCategory::where(['mandatory_type' => MandatoryCategoryLink::USULAN->value])->get()->toArray()),
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
            'kursus' => $this->selectOptions(Kursus::all()->toArray(), 'sandi', 'lengkap', true, ['kategori']),
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

    public function get()
    {
        $proposals = Proposal::orderByDesc('id')->get();
        foreach($proposals as $key => $proposal){
            $status = [];
            if($proposal->isMissingCategories()) $status[] = 1;
            else $status[] = -1;

            if($proposal->events()->count() > 0) $status[] = 2;
            else $status[] = -2;

            if($proposal->isEventsComplete()) $status[] = 3;
            else $status[] = -3;

            $proposal->setAttribute('status', $status);
        }

        return response()->json([
            'proposals' => $proposals,
        ]);
    }

    public function setPrices(ProposalPricesFormRequest $request, string $id)
    {
        $proposal = Proposal::findOrFail($id);

        $validated = $request->validated();

        foreach ($proposal->prices as $price) {
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
            $proposal->prices()->updateOrCreate(
                ['budget_type_id' => $detail['budget_type_id']],
                $detail
            );
        }

        return redirect()->route('proposal.show', [$proposal->id]);
    }

    public function resetPrices(string $id){
        $proposal = Proposal::findOrFail($id);

        $proposal->prices()->delete();
        
        $proposal->touch();

        return redirect()->route('proposal.show', [$proposal->id]);
    }
}
