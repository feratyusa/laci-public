<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Enum\MandatoryCategoryLink;
use App\Models\Event\Event;
use App\Models\File\MandatoryFileCategory;
use App\Models\Master\Budget;
use App\Models\Proposal\Proposal;
use App\Trait\InputHelpers;
use App\Trait\MonthHelper;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    use InputHelpers;
    use MonthHelper;

    public function dashboard(){                    
        return Inertia::render('Dashboard');
    }

    public function unfinishedDocuments()
    {
        $user = Auth::user();

        $uncompleteCount['proposal'] = 0;
        $proposals = Proposal::where('assign_to', $user->username)->get();
        foreach($proposals as $proposal){
            if($proposal->isMissingCategories() == false) $uncompleteCount['proposal'] += 1;            
        }
        
        $uncompleteCount['public'] = 0;
        $publics = Event::whereHas('proposal', function(Builder $query) {
            $query->where('event_category', EventCategory::PT->value);
        })->where('assign_to', $user->username)->get();
        foreach($publics as $event){
            if($event->isMissingCategories()  == false) $uncompleteCount['public'] += 1;
        }

        $uncompleteCount['inHouse'] = 0;
        $inHouses = Event::whereHas('proposal', function(Builder $query) {
            $query->where('event_category', EventCategory::PT->value);
        })->where('assign_to', $user->username)->get();
        foreach($inHouses as $event){
            if($event->isMissingCategories()  == false) $uncompleteCount['inHouse'] += 1;
        }

        return response()->json([
            'uncompleteCount' => $uncompleteCount
        ]);
    }

    public function budgetReport(Request $request)
    {
        $validated = $request->validate([
            'year' => ['required', 'numeric'],
            'range' => ['required', 'integer'],
            'mode' => ['required', 'integer'],
        ]);

        // Year Budget
        $budget = Budget::with('details')->where('year', $validated['year'])->first();

        
        $budget['total_value'] = 0;
        foreach($budget->details as $detail){
            $budgetTypePrices[$detail->budget_type_id] = 0;            
            $budget['total_value'] += intval($detail->value);
        }

        $budgetTypePrices['total_value'] = 0;

        // Events based on range
        $range = $validated['range'] > 11 ? 11 : $validated['range'];
        $dateString = "first day of -{$range} month";

        if(intval(date('m', strtotime($dateString))) > intval(date('m', strtotime("now")))){
            $dateString = "first day of January";
        }
        
        $dateStrings = (object)[
            'start' => $budget->year."-".date('m-d', strtotime($dateString)),
            'end' => $budget->year."-".date('m-d', strtotime('last day of now')),
        ];        

        $events = Event::whereRaw('start_date between ? and ?', [$dateStrings->start, $dateStrings->end])->get();        

        foreach($events as $event){
            if($validated['mode'] == 0 && $event->defaultPrices == 1) continue;
            foreach($event->prices as $price){
                $participants = $price->defaultParticipants ? $event->participants()->count() : intval($price->participantNum);
                $total = intval($price->price) * $participants;
                if(array_key_exists($price->budget_type_id, $budgetTypePrices)){
                    $budgetTypePrices[$price->budget_type_id] += $total;
                    $budgetTypePrices['total_value'] += $total;
                }
            }
        }

        return response()->json([
            'data' => ['dateStrings' => $dateStrings, 'eventsCount' => count($events), 'budget' => $budget, 'budgetTypePrices' => $budgetTypePrices],
        ]);
    }
}
