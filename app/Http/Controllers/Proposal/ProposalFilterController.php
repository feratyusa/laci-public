<?php

namespace App\Http\Controllers\Proposal;

use App\Enum\EventCategory;
use App\Enum\EventStatus;
use App\Enum\ProposalStatus;
use App\Models\Proposal\Proposal;
use App\Http\Controllers\FilterController;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class ProposalFilterController extends FilterController
{
    public function run(Request $request)
    {
        $rules['event_category'] = [Rule::enum(EventCategory::class)];
        $rules['kd_kursus'] = ['integer', 'numeric'];
        $rules['status'] = [Rule::enum(ProposalStatus::class)];

        $query = $this->filters($request, $rules);

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
            $paginator = Proposal::whereRaw($queryConcate, $dataConcate)->orderByDesc('id')->paginate(10)->appends($request->all());
        }else{
            $paginator = Proposal::orderByDesc('id')->paginate(10);
        }

        return $paginator;
    }
}
