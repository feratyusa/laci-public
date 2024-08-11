<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FilterController extends Controller
{
    private array $TEXT = ['name'];
    private array $DATE = ['entry_date', 'start_date', 'end_date'];
    private array $SELECT = ['event_category'];
    private array $MULTISELECT = ['kd_kursus', 'status'];

    private function filterText(Request $request, string $attr)
    {
        if($request->filled($attr))
        {
            $search = $request->input($attr);
            return ["{$attr} like ?", ["%".$search."%"]];
        }
        return false;
    }

    private function filterDate(Request $request, string $attr)
    {
        if($request->filled("{$attr}.start") && $request->isNotFilled("{$attr}.end")){
            $start_date = $request->validate([
                "{$attr}.start" => ['date']
            ]);
            $start_date = date("Y-m-d", strtotime($start_date[$attr]['start']));
            return ["{$attr} = ?", [$start_date]];
        }
        if($request->isNotFilled("{$attr}.start") && $request->filled("{$attr}.end")){
            $end_date = $request->validate([
                "{$attr}.end" => ['date']
            ]);
            $end_date = date("Y-m-d", strtotime($end_date[$attr]['end']));
            return ["{$attr} = ?", [$end_date]]; 
        }
        if($request->filled("{$attr}.start") && $request->filled("{$attr}.end")){
            $date = $request->validate([
                "{$attr}.start" => ['date'],
                "{$attr}.end" => ['date']
            ]);
            $start_date = date("Y-m-d", strtotime($date[$attr]['start']));
            $end_date = date("Y-m-d", strtotime($date[$attr]['end']));
            return ["{$attr} between ? and ?", [$start_date, $end_date]];
        }
        return false;
    }

    private function filterSelect(Request $request, string $attr, array $rule)
    {
        if($request->filled($attr)){
            $select = $request->validate([
                $attr => $rule
            ]);
            $select = $select[$attr];
            return ["{$attr} = ?", [$select]]; 
        }
        return false;
    }    

    private function filterMultiSelect(Request $request, string $attr, array $rule)
    {
        if($request->filled($attr)){
            $validated = $request->validate([
                "{$attr}.*" => $rule
            ]);
            $tempQ = "{$attr} in (";
            $tempD = [];
            $i = 0;
            foreach ($validated[$attr] as $k) {
                $tempD[] = $k;
                $tempQ = $tempQ . "?";
                if($i != count($validated[$attr])-1) $tempQ = $tempQ . ", ";
                $i++;
            }
            $tempQ = $tempQ . ")";
            return [$tempQ, $tempD];
        }
        return false;
    }

    public function filters(Request $request, Array $rules)
    {
        $query = [];

        $filters = $request->all();

        foreach($filters as $key => $value)
        {
            if(in_array($key, $this->TEXT)){
                $q = $this->filterText($request, $key);
                if($q) $query[] = $q;
            }
            else if(in_array($key, $this->DATE)){
                $q = $this->filterDate($request, $key);
                if($q) $query[] = $q;
            }
            else if(in_array($key, $this->SELECT)){
                $q = $this->filterSelect($request, $key, $rules[$key]);
                if($q) $query[] = $q;
            }
            else if(in_array($key, $this->MULTISELECT))
            {
                $q = $this->filterMultiSelect($request, $key, $rules[$key]);
                if($q) $query[] = $q;
            }
        }

        return $query;
    }
}
