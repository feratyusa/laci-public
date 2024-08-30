<?php

namespace App\Http\Controllers\Event;

use App\Enum\EventCategory;
use App\Http\Controllers\FilterController;
use App\Models\Event\Event;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class EventFilterController extends FilterController
{
    public function run(Request $request)
    {
        $rules['event_category'] = [Rule::enum(EventCategory::class)];
        $rules['kd_kursus'] = ['integer', 'numeric'];
        
        $query = $this->filters($request, $rules);

        
        if(count($query)){
            $proposal_attribute = ['event_category', 'kd_kursus'];
            $queryProposal = [];
            $queryEvent = [];
            foreach ($query as $q) {
                if(in_array(explode(" ", $q[0])[0], $proposal_attribute)){
                    $queryProposal[] = $q;
                }
                else{
                    $queryEvent[] = $q;
                }
            }

            // Proposal Filter
            $qConcatProposal = "";
            $dConcatProposal = [];
            if(count($queryProposal)){
                foreach ($queryProposal as $index => $q) {
                    $qConcatProposal = $qConcatProposal . "{$q[0]}";
                    if($index != count($queryProposal)-1) $qConcatProposal = $qConcatProposal . " AND ";
                    foreach ($q[1] as $data) {
                        $dConcatProposal[] = $data;
                    }
                }
            }
            // Event Filter
            $qConcatEvent = "";
            $dConcatEvent = [];
            if(count($queryEvent)){
                foreach ($queryEvent as $index => $q) {
                    $qConcatEvent = $qConcatEvent . "{$q[0]}";
                    if($index != count($queryEvent)-1) $qConcatEvent = $qConcatEvent . " AND ";
                    foreach ($q[1] as $data) {
                        $dConcatEvent[] = $data;
                    }
                }
            }

            if(count($queryEvent) && count($queryProposal))
            {
                $paginator = Event::with('proposal')->whereHas('proposal', function (Builder $query) use($qConcatProposal, $dConcatProposal) {
                                            $query->whereRaw($qConcatProposal, $dConcatProposal);
                                        })
                                        ->whereRaw($qConcatEvent, $dConcatEvent)->orderByDesc('id')->paginate(10)->appends($request->all());   
            }
            else if(!count($queryEvent) && count($queryProposal))
            {
                $paginator = Event::with('proposal')->whereHas('proposal', function (Builder $query) use($qConcatProposal, $dConcatProposal) {
                                            $query->whereRaw($qConcatProposal, $dConcatProposal);
                                        })->orderByDesc('id')->paginate(10)->appends($request->all());
            }
            else if(count($queryEvent) && !count($queryProposal))
            {
                $paginator = Event::with('proposal')->whereRaw($qConcatEvent, $dConcatEvent)->orderByDesc('id')->paginate(10)->appends($request->all());
            }

        }else{
            $paginator = Event::with('proposal')->orderByDesc('id')->paginate(10);
        }

        return $paginator;
        
    }
}
