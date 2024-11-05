<?php

namespace App\Http\Controllers\Utilities;

use App\Exports\NugieExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Nugie\NugieDetailFormRequest;
use App\Http\Requests\Nugie\NugieFormRequest;
use App\Http\Requests\Nugie\NugieGenerateSQLRequest;
use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\Utilities\Nugie\Nugie;
use App\Models\Utilities\Nugie\NugieDetail;
use App\Models\Utilities\Nugie\NugieRule;
use App\Trait\NugieVerbHelper;
use App\Trait\TableColumnsHelper;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class NugieController extends Controller
{
    use TableColumnsHelper;
    use NugieVerbHelper;

    private function handleParameters(array $rules)
    {
        $sql = [];
        foreach($rules as $rule){            
            $result = $this->generateParams($rule);
            
            if($result == false) throw ValidationException::withMessages(['rules' => 'one of the verbs is invalid, stupid']);

            $prefix = strcmp($rule['prefix'], "null") == 0 ? null : $rule['prefix'];
            $temp = $rule['column'] . " " . $rule['verb'] . " " . $result['params'];
            $sql[$rule['index']][$rule['child']] = ['prefix' => $prefix, 'sql' => $temp, 'parameters' => $result['data']];
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
        foreach($nugie->details as $detail){
            
            $diklatSQL = $this->queryBuilder($detail->rules()->where('type', 'course')->get()->toArray());
            $employeeSQL = $this->queryBuilder($detail->rules()->where('type', 'employee')->get()->toArray());            

            $details[] = [     
                'id' => $detail->id,    
                'name' => $detail->name,
                'rules' => [
                    'id' => $detail->id,
                    'name' => $detail->name,
                    'nugie_id' => $nugie->id,
                    'course_rules' => $detail->rules()->where('type', 'course')->get(),
                    'emp_rules' => $detail->rules()->where('type', 'employee')->get(),
                    'sql' => Employee::whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                                    ->whereIn('nip', Diklat::select('nip')->whereRaw($diklatSQL['sql'], $diklatSQL['bind']))
                                    ->toRawSql(),
                ],                 
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

        if($this->isDiklatColumnsValid(array_column($validated['course_rules'],'column')) == false) throw ValidationException::withMessages(['rules' => 'diklat column name is invalid']);

        if($this->isEmployeeColumnsValid(array_column($validated['emp_rules'], 'column')) == false) throw ValidationException::withMessages(['rules' => 'employee column name is invalid']);

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

        if($this->isDiklatColumnsValid(array_column($validated['course_rules'],'column')) == false) throw ValidationException::withMessages(['rules' => 'diklat column name is invalid']);

        if($this->isEmployeeColumnsValid(array_column($validated['emp_rules'], 'column')) == false) throw ValidationException::withMessages(['rules' => 'employee column name is invalid']);

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

    public function generateSQL(NugieGenerateSQLRequest $request)
    {
        $validated = $request->validated();        

        if($this->isDiklatColumnsValid(array_column($validated['course_rules'],'column')) == false) throw ValidationException::withMessages(['rules' => 'diklat column name is invalid']);

        if($this->isEmployeeColumnsValid(array_column($validated['emp_rules'], 'column')) == false) throw ValidationException::withMessages(['rules' => 'employee column name is invalid']);

        $diklatSQL = $this->queryBuilder($validated['course_rules']);
        $employeeSQL = $this->queryBuilder($validated['emp_rules']);

        $diklat = Diklat::select('nip')->whereRaw($diklatSQL['sql'], $diklatSQL['bind']);

        return response()->json([
            'sql' => Employee::whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                                ->whereIn('nip', $diklat)
                                ->toRawSql()
        ]);
    }

    public function getNugieResultsForSheet(string $detail_id, bool $in){
        $nugieDetail = NugieDetail::findOrFail($detail_id);

        $diklatSQL = $this->queryBuilder($nugieDetail->rules()->where('type', 'course')->get()->toArray());
        $employeeSQL = $this->queryBuilder($nugieDetail->rules()->where('type', 'employee')->get()->toArray());

        $diklat = Diklat::select('nip')->whereRaw($diklatSQL['sql'], $diklatSQL['bind']);

        if($in) return Employee::select('nip', 'nama', 'jabatan', 'cabang', 'seksi', 'eselon', 'jobfam')
                                ->whereIn('nip', $diklat)
                                ->whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                                ->get();
        else return Employee::select('nip', 'nama', 'jabatan', 'cabang', 'seksi', 'eselon', 'jobfam')
                                ->whereNotIn('nip', $diklat)
                                ->whereRaw($employeeSQL['sql'], $employeeSQL['bind'])
                                ->get();
    }

    public function export(string $id)
    {
        $nugie = Nugie::findOrFail($id);
        $date = date('Y-m-d');

        return (new NugieExport($id))->download("{$nugie->name}-{$date}.xlsx");
    }

    public function duplicateNugie(string $id)
    {        
        $nugie = Nugie::findOrFail($id);

        $dateString = date('Y-m-d H:i:s');

        DB::beginTransaction();

        try{
            $duplicate = Nugie::create([
                'name' => $nugie->name . " (Copy {$dateString})",
                'description' => $nugie->description,
                'created_by' => Auth::user()->username
            ]);

            foreach($nugie->details as $detail){
                $nugieDetail = NugieDetail::create([
                    'name' => $detail->name,
                    'nugie_id' => $duplicate->id
                ]);
                
                foreach($detail->rules as $rule){
                    $nugieDetail->rules()->create([
                        'type' => $rule->type,
                        'index' => $rule->index,
                        'child' => $rule->child,
                        'prefix' => $rule->prefix,
                        'column' => $rule->column,
                        'verb' => $rule->verb,
                        'parameter' => $rule->parameter
                    ]);
                }
            }

            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
        
        return redirect()->route('nugie.show', ['id' => $duplicate->id]);
    }

    public function duplicateNugieRules(string $id, string $detail_id)
    {
        $nugie = Nugie::findOrFail($id);

        $nugieDetail = $nugie->details()->findOrFail($detail_id);        

        DB::beginTransaction();

        try{
            $newDetail = $nugie->details()->create([
                'name' => $nugieDetail->name,
                'nugie_id' => $nugie->id
            ]);

            foreach($nugieDetail->rules as $rule){
                $newDetail->rules()->create([
                    'type' => $rule->type,
                    'index' => $rule->index,
                    'child' => $rule->child,
                    'prefix' => $rule->prefix,
                    'column' => $rule->column,
                    'verb' => $rule->verb,
                    'parameter' => $rule->parameter
                ]);
            }
            
            DB::commit();
        }
        catch(Exception $e){
            DB::rollBack();
            throw $e;
        }

        return to_route('nugie.show', ['id' => $nugie->id]);
    }
}
