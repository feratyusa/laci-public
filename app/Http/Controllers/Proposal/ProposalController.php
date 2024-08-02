<?php

namespace App\Http\Controllers\Proposal;

use App\Enum\EventCategory;
use App\Enum\EventStatus;
use App\Enum\FileCategory;
use App\Enum\ProposalStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\Proposal\ProposalChangeStatusRequest;
use App\Http\Requests\Proposal\ProposalFormRequest;
use App\Models\EHC\Kursus;
use App\Models\Proposal\Proposal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class ProposalController extends Controller
{
    private function getKursusOptions(){
        $kursus = Kursus::all();
        $kursusOptions = [];
        foreach ($kursus as $k) {
            $kursusOptions[] = (object)['value' => $k->Sandi, 'label' => "($k->Sandi) {$k->Lengkap}"];
        }

        return $kursusOptions;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = [];
        if($request->filled('search')){
            $search = $request->search;
            $query[] = ["name like ?", ["%".$search."%"]];
        }
        if($request->filled('start_date') && $request->isNotFilled('end_date')){
            $start_date = $request->validate([
                'start_date' => ['date']
            ]);
            $start_date = date("Y-m-d", strtotime($start_date['start_date']));
            $query[] = ["entry_date = ?", [$start_date]]; // Don't forget the end space for additional query if needed
        }
        if($request->isNotFilled('start_date') && $request->filled('end_date')){
            $end_date = $request->validate([
                'end_date' => ['date']
            ]);
            $end_date = date("Y-m-d", strtotime($end_date['end_date']));
            $query[] = ["entry_date = ?", [$end_date]];; // Don't forget the end space for additional query if needed
        }
        if($request->filled('start_date') && $request->filled('end_date')){
            $date = $request->validate([
                'start_date' => ['date'],
                'end_date' => ['date']
            ]);
            $start_date = date("Y-m-d", strtotime($date['start_date']));
            $end_date = date("Y-m-d", strtotime($date['end_date']));
            $query[] = ["entry_date between ? and ?", [$start_date, $end_date]]; // Don't forget the end space for additional query if needed
        }
        if($request->filled('category')){
            $category = $request->validate([
                'category' => [Rule::enum(EventCategory::class)]
            ]);
            $category = $category['category'];
            $query[] = ["event_category = ?", [$category]]; // Don't forget the end space for additional query if needed
        }
        if($request->filled('status')){
            $status = $request->validate([                    
                'status.*.value' => [Rule::enum(EventStatus::class)]
            ]);    
            $status = $status['status'];
            $tempQuery = "status in (";
            $tempData = [];
            $i = 0;
            foreach ($status as $s) {
                $tempData[] = $s['value'];
                $tempQuery = $tempQuery."?";
                if($i != count($status)-1) $tempQuery = $tempQuery.", ";
                $i++;
            }
            $tempQuery = $tempQuery.")";
            $query[] = [$tempQuery, $tempData];
        }
         
        if(count($query)){
            $queryConcate = "";
            $dataConcate = [];
            foreach ($query as $index => $q) {
                $queryConcate = $queryConcate . "{$q[0]}";
                if($index != count($query)-1) $queryConcate = $queryConcate . " AND ";
                foreach ($q[1] as $data) {
                    $dataConcate[] = $data;
                }
            }
            $paginator = DB::table('proposals')
                            ->whereRaw($queryConcate, $dataConcate)->paginate(10)->appends($request->all());
        }else{
            $paginator = Proposal::paginate(10);
        }
        
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
        $kursusOptions = $this->getKursusOptions();

        return Inertia::render('Proposal/Create', [
            'kursus' => $kursusOptions,
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
        $kursusOptions = $this->getKursusOptions();
        return Inertia::render('Proposal/Edit', [
            'proposal' => Proposal::find($id),
            'kursus' => $kursusOptions,
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
