<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Http\Requests\Nugie\NugieDetailFormRequest;
use App\Http\Requests\Nugie\NugieFormRequest;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\Utilities\Nugie\Nugie;
use App\Models\Utilities\Nugie\NugieDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NugieController extends Controller
{

    private function handleSQL(NugieDetail $detail, array $activeCourse)
    {
        $completed = Employee::whereIn('nip', $activeCourse)
                                ->whereRaw($detail->sql)
                                ->get();
        $notCompleted = Employee::whereNotIn('nip', $activeCourse)                                
                                ->whereRaw($detail->sql)
                                ->get();
        return ['completed' => $completed, 'notCompleted' => $notCompleted];
    }

    private function handleNonSQL(NugieDetail $detail, array $activeCourse)
    {
        $sql = [];
        foreach($detail->rules as $rule){
            $temp = '';
            if($rule->index != 1 && $rule->child != 1) $temp .= $rule->prefix;
            

            if(array_key_exists($rule->index, $sql)) $sql[$rule->index] .= " ".$temp;
            $sql[$rule->index] = $temp;
        }
    }

    public function index()
    {
        return Inertia::render('Utility/Nugie/Index', [
            'nugies' => Nugie::orderByDesc('id')->get(),
        ]);
    }

    public function show(string $id)
    {
        $nugie = Nugie::findOrFail($id);

        foreach($nugie->details as $detail){
            $activeCourse = Diklat::select('nip')->where('kd_kursus', $detail->kd_kursus)->pluck('nip')->toArray();
    
            if($detail->is_sql){
                $result = $this->handleSQL($detail, $activeCourse);
            }
            else{

            }
            
        }

        return response()->json([
            'res' => $result
        ]);
    }

    public function store(NugieFormRequest $request)
    {
        $validated = $request->validated();

        $nugie = Nugie::create($validated);

        return redirect()->route('nugie.show', ['id' => $nugie->id]);
    }

    public function update(NugieFormRequest $request, string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $validated = $request->validated();

        $nugie->updateOrFail($validated);

        return redirect();
    }

    public function destroy(string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $nugie->deleteOrFail();

        return redirect();
    }

    public function storeDetails(NugieDetailFormRequest $request, string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $validated = $request->validated();

        return response()->json([
            'mess' => $validated,
        ]);
    }

    public function updateDetails(NugieDetailFormRequest $request, string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $validated = $request->validated();

    
    }
}
