<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Http\Requests\Nugie\NugieDetailFormRequest;
use App\Http\Requests\Nugie\NugieFormRequest;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\Utilities\Nugie\Nugie;
use App\Models\Utilities\Nugie\NugieDetail;
use App\Models\Utilities\Nugie\NugieRule;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NugieController extends Controller
{
    private function handleParameters(NugieDetail $detail, string $type)
    {
        $emp_rules = $detail->rules()->where('type', $type)->get();

        $sql = [];
        foreach($emp_rules as $rule){
            $data = explode(";", $rule->parameter);

            $param = "";
            if(strcmp('in', $rule->verb) == 0 || strcmp('not in', $rule->verb) == 0){
                $bindParam = array_fill(0, count($data), "?");

                $param .= "(" . implode(",", $bindParam) . ")";               
            }
            else if((strcmp('like', $rule->verb) == 0 || strcmp('not like', $rule->verb) == 0) 
                        && count($data) == 1){
                $param .= "?";
            }
            else{
                throw ValidationException::withMessages(['parameter' => 'invalid parameter length with verb']);
            }
            
            $temp = $rule->column . " " . $rule->verb . " " . $param;
            $sql[$rule->index][$rule->child] = ['prefix' => $rule->prefix, 'sql' => $temp, 'parameters' => $data];
        }

        return $sql;

    }

    private function queryBuilder(NugieDetail $nugie_detail, string $type)
    {
        $sql = ''; 
        $bind = [];

        $tempRes = $this->handleParameters($nugie_detail, $type);        
        foreach ($tempRes as $index => $array) {                 
            foreach($array as $child => $value){
                $temp = $value['sql'];
                if($child == 1){
                    $temp = "(" . $temp;
                    if($value['prefix'] != null) $temp = $value['prefix'] . " " . $temp;                
                }
                else{
                    $temp = $value['prefix'] . " " . $temp;
                }
                
                if($child == count($tempRes[$index])){
                    $temp .= ")";
                }
    
                $sql .= $temp . " ";
                foreach($value['parameters'] as $param) $bind[] = $param;
            }
        }
        return ['sql' => trim($sql), 'bind' => $bind];
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

        $result = []; $temp = [];
        foreach($nugie->details as $detail){
            $diklatSQL = $this->queryBuilder($detail, 'course');
            $employeeSQL = $this->queryBuilder($detail, 'employee');

            $diklat = Diklat::whereRaw($diklatSQL['sql'], $diklatSQL['bind'])->pluck('nip')->toArray();
            $empIn = Employee::whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                            ->whereIn('nip', $diklat)
                            ->get();
            $empOut = Employee::whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                            ->whereNotIn('nip', $diklat)
                            ->get();
            $temp[] = [$diklatSQL, $employeeSQL];
            $result[] = ['name' => $detail->name, 'countIn' => count($empIn), 'empIn' => $empIn, 'countOut' => count($empOut), 'empOut' => $empOut];
        }

        return response()->json([
            'temp' => $temp,
            'result' => $result
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

        return redirect()->route('nugie.show', ['id' => $nugie->id]);
    }

    public function destroy(string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $nugie->deleteOrFail();

        return redirect()->route('nugie.index');
    }

    public function storeDetails(NugieDetailFormRequest $request, string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $validated = $request->validated();

        DB::beginTransaction();

        try{
            $detail = $nugie->details()->create([
                'name' => $validated['name']
            ]);
            
            foreach($validated['rules'] as $rule){
                $param = implode(";", $rule['parameters']);
                NugieRule::create([
                    'nugie_detail_id' => $detail->id,
                    'type' => $rule->type,
                    'index' => $rule->index,
                    'child' => $rule->child,
                    'prefix' => $rule->prefix,
                    'column' => $rule->column,
                    'verb' => $rule->verb,
                    'parameter' => $param,
                ]);
            }

            DB::commit();
        }
        catch(Exception){
            DB::rollback();
        }

        return redirect()->route('nugie.show', ['id' => $nugie->id]);
    }

    public function updateDetails(NugieDetailFormRequest $request, string $id)
    {
        $nugie = Nugie::findOrFail($id);

        $validated = $request->validated();


    }
}
