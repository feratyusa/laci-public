<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use App\Http\Requests\Nugie\NugieDetailFormRequest;
use App\Http\Requests\Nugie\NugieFormRequest;
use App\Http\Requests\Nugie\NugieSQL;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\Utilities\Nugie\Nugie;
use App\Models\Utilities\Nugie\NugieDetail;
use App\Models\Utilities\Nugie\NugieRule;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NugieController extends Controller
{
    private function handleParameters(array $rules)
    {
        $sql = [];
        foreach($rules as $index => $rule){            
            $data = explode(";", $rule['parameter']);
            
            $param = "";
            if(strcmp('in', $rule['verb']) == 0 || strcmp('not in', $rule['verb']) == 0){
                $bindParam = array_fill(0, count($data), "?");

                $param .= "(" . implode(",", $bindParam) . ")";               
            }
            else if((strcmp('like', $rule['verb']) == 0 || strcmp('not like', $rule['verb']) == 0)){
                $param .= "?";
            }
            else{
                throw ValidationException::withMessages(['parameter' => 'invalid parameter length with verb']);
            }
            
            $temp = $rule['column'] . " " . $rule['verb'] . " " . $param;
            $sql[$rule['index']][$rule['child']] = ['prefix' => $rule['prefix'], 'sql' => $temp, 'parameters' => $data];
        }

        return $sql;

    }

    private function queryBuilder(array $rules)
    {
        $sql = ''; 
        $bind = [];

        $tempRes = $this->handleParameters($rules);
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

        $details = [];
        foreach($nugie->details as $index => $detail){
            
            $diklatSQL = $this->queryBuilder($detail->rules()->where('type', 'course')->get()->toArray());
            $employeeSQL = $this->queryBuilder($detail->rules()->where('type', 'employee')->get()->toArray());            

            $details[] = [     
                'id' => $detail->id,           
                'name' => $detail->name,
                'rules' => [
                    'id' => $detail->id,
                    'name' => $detail->name,
                    'course_rules' => $detail->rules()->where('type', 'course')->get(),
                    'emp_rules' => $detail->rules()->where('type', 'employee')->get()
                ],
                'diklatSQL' => Diklat::select('nip')->whereRaw($diklatSQL['sql'], $diklatSQL['bind'])->toRawSql(),
                'empSQL' => Employee::whereRaw($employeeSQL['sql'], $employeeSQL['bind'])                                    
                                    ->toRawSql(),                
            ];
        }        

        return Inertia::render('Utility/Nugie/Show', [
            'nugie' => $nugie,
            'details' => $details,
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

        $rules = array_merge($validated['emp_rules'], $validated['course_rules']);

        DB::beginTransaction();

        try{
            $detail = $nugie->details()->create([
                'name' => $validated['name']
            ]);
            
            foreach($rules as $rule){
                NugieRule::create([
                    'nugie_detail_id' => $detail->id,
                    'type' => $rule['type'],
                    'index' => $rule['index'],
                    'child' => $rule['child'],
                    'prefix' => $rule['prefix'] == 'null' ? null : $rule['prefix'],
                    'column' => $rule['column'],
                    'verb' => $rule['verb'],
                    'parameter' => $rule['parameter'],
                ]);
            }

            DB::commit();
        }
        catch(Exception $e){           
            DB::rollback();
            throw $e;
        }

        return redirect()->route('nugie.show', ['id' => $nugie->id]);
    }

    public function updateDetails(NugieDetailFormRequest $request, string $id, string $detail_id)
    {

        $nugie = Nugie::findOrFail($id);
        
        $detail = $nugie->details()->findOrFail($detail_id);

        $validated = $request->validated();

        $rules = array_merge($validated['emp_rules'], $validated['course_rules']);

        DB::beginTransaction();
        
        try{
            $detail->updateOrFail([
                'name' => $validated['name']
            ]);

            $detail->rules()->delete();

            foreach($rules as $rule){                
                NugieRule::create([
                    'nugie_detail_id' => $detail->id,
                    'type' => $rule['type'],
                    'index' => $rule['index'],
                    'child' => $rule['child'],
                    'prefix' => $rule['prefix'] == 'null' ? null : $rule['prefix'],
                    'column' => $rule['column'],
                    'verb' => $rule['verb'],
                    'parameter' => $rule['parameter'],
                ]);
            }
            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return redirect()->route('nugie.show', ['id' => $nugie->id]);
    }

    public function destroyDetails(string $id, string $detail_id)
    {
        $nugie = Nugie::findOrFail($id);

        $detail = $nugie->details()->findOrFail($detail_id);

        $detail->deleteOrFail();

        return redirect()->route('nugie.show', ['id' => $nugie->id]);
    }

    public function getNugieData(string $id, string $detail_id)
    {
        $nugieDetail = NugieDetail::findOrFail($detail_id);
        
        $diklatSQL = $this->queryBuilder($nugieDetail->rules()->where('type', 'course')->get()->toArray());
        $employeeSQL = $this->queryBuilder($nugieDetail->rules()->where('type', 'employee')->get()->toArray());

        $diklat = Diklat::select('nip')->whereRaw($diklatSQL['sql'], $diklatSQL['bind']);
        $empIn = Employee::whereIn('nip', $diklat)
                            ->whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                            ->get();
        $empOut = Employee::whereNotIn('nip', $diklat)
                            ->whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                            ->get();
        
        return response()->json([
            'employees' => ['in' => $empIn, 'not' => $empOut]
        ]);
    }
}
