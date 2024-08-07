<?php

namespace App\Http\Controllers\Proposal;

use App\Models\Proposal\Proposal;
use App\Enum\EventCategory;
use App\Enum\EventStatus;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProposalFilterController extends Controller
{
    public function filters(Request $request)
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
            $query[] = ["entry_date = ?", [$start_date]]; 
        }
        if($request->isNotFilled('start_date') && $request->filled('end_date')){
            $end_date = $request->validate([
                'end_date' => ['date']
            ]);
            $end_date = date("Y-m-d", strtotime($end_date['end_date']));
            $query[] = ["entry_date = ?", [$end_date]];; 
        }
        if($request->filled('start_date') && $request->filled('end_date')){
            $date = $request->validate([
                'start_date' => ['date'],
                'end_date' => ['date']
            ]);
            $start_date = date("Y-m-d", strtotime($date['start_date']));
            $end_date = date("Y-m-d", strtotime($date['end_date']));
            $query[] = ["entry_date between ? and ?", [$start_date, $end_date]]; 
        }
        if($request->filled('category')){
            $category = $request->validate([
                'category' => [Rule::enum(EventCategory::class)]
            ]);
            $category = $category['category'];
            $query[] = ["event_category = ?", [$category]]; 
        }
        if($request->filled('kursus')){
            $validated = $request->validate([
                'kursus.*' => ['integer', 'numeric']
            ]);
            $tempQ = "kd_kursus in (";
            $tempD = [];
            $i = 0;
            foreach ($validated['kursus'] as $k) {
                $tempD[] = $k;
                $tempQ = $tempQ . "?";
                if($i != count($validated['kursus'])-1) $tempQ = $tempQ . ", ";
                $i++;
            }
            $tempQ = $tempQ . ")";
            $query[] = [$tempQ, $tempD];
        }
        if($request->filled('status')){
            $status = $request->validate([                    
                'status.*' => [Rule::enum(EventStatus::class)]
            ]);    
            $status = $status['status'];
            $tempQuery = "status in (";
            $tempData = [];
            $i = 0;
            foreach ($status as $s) {
                $tempData[] = $s;
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
            $paginator = Proposal::whereRaw($queryConcate, $dataConcate)->paginate(10)->appends($request->all());
        }else{
            $paginator = Proposal::paginate(10);
        }

        return $paginator;
    }
}
