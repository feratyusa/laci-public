<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Enum\ParticipantNumberType;
use App\Http\Requests\Calculator\CalculatorUpdateEventRequest;
use App\Models\Event\Event;
use App\Models\Event\EventPrices;
use App\Models\Master\Budget;
use App\Trait\InputHelpers;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculatorController extends Controller
{    
    use InputHelpers;

    private function calculateBudgetTypePrices(array $budgetTypePrices, int $budgetTypeID, int $price){
        if(array_key_exists($budgetTypeID, $budgetTypePrices)) $budgetTypePrices[$budgetTypeID] += $price;
        else $budgetTypePrices[$budgetTypeID] = $price;
        $budgetTypePrices['total_value'] += $price;
        return $budgetTypePrices;
    }

    public function index(Request $request)
    {
        return Inertia::render('Calculator/Index', [
            'budget' => Budget::where('year', date('Y'))->first()->id,
        ]);
    }

    public function reset()
    {
        session()->forget('calc_start_date');
        session()->forget('calc_end_date');

        return redirect()->route('calculator.index');
    }

    public function updateEvents(CalculatorUpdateEventRequest $request)
    {
        $validated = $request->validated();
        $event_validated = array_merge($validated['public'], $validated['inHouse']);

        // Check is each event and prices that will be updated is exist // I mean it should exist if already passed here

        foreach ($event_validated as $newEvent) {
            Event::findOrFail($newEvent['id']);
            EventPrices::where('event_id', $newEvent['id'])->firstOrFail();            
        }

        // If nothing failed, iterate again for updating

        foreach ($event_validated as $newEvent) {
            Event::findOrFail($newEvent['id'])->update([
                'participant_number' => $newEvent['participant_number'],
            ]);
            EventPrices::where('event_id', $newEvent['id'])->firstOrFail()->update([
                'training_price' => $newEvent['training_price'],
                'accomodation_price' => $newEvent['accomodation_price']
            ]);
        }

        return redirect()->route('calculator.index');
    }

    public function changeEvents(Request $request)
    {
        $validated = $request->validate([
            'start' => ['nullable', 'date'],
            'end' => ['nullable', 'date'],
            'mode' => ['required', 'integer']
        ]);

        $start = $validated['start'] ?? null;
        $end = $validated['end'] ?? null;
        $query = 'start_date between ? and ?';

        $dataBind = [$start, $end];
        if($validated['mode'] == 1) {
            $query .= ' and defaultPrices in (? ,?)';
            $dataBind[] = 0;
            $dataBind[] = 1;
        }
        else{
            $query .= ' and defaultPrices = ?';
            $dataBind[] = 0;
        }
        
        $publics = [];
        $inHouses = [];
        $totPrice['inHouse'] = 0; $totPrice['public'] = 0;
        $totParticipants['inHouse'] = 0; $totParticipants['public'] = 0;

        if($start != null && $end != null && strtotime($start) <= strtotime($end)){
            $publics = Event::whereHas('proposal', function(Builder $query){
                $query->where('event_category', EventCategory::PT->value);
            })->whereRaw($query, $dataBind)->get();
            $inHouses = Event::whereHas('proposal', function(Builder $query){
                $query->where('event_category', EventCategory::IHT->value);
            })->whereRaw($query, $dataBind)->get();
            
            foreach($inHouses as $event){
                $totalPrice = 0;
                $totalParticipants = $event->participant_number_type == ParticipantNumberType::DYNAMIC->value ? $event->participants()->count() : $event->participant_number;
                foreach($event->prices as $price){
                    if($price->defaultParticipants) $participants = $event->participants()->count();
                    else $participants = intval($price->participantNum);
                    
                    $totalPrice += intval($price->price) * $participants;
                }
                
                $event->setAttribute('total_price', $totalPrice);
                $event->setAttribute('total_participants', $totalParticipants);
                $totPrice['inHouse'] += $totalPrice;
                $totParticipants['inHouse'] += $totalParticipants;
            }

            foreach($publics as $event){

                $totalPrice = 0;
                $totalParticipants = $event->participant_number_type == ParticipantNumberType::DYNAMIC->value ? $event->participants()->count() : $event->participant_number;
                foreach($event->prices as $price){

                    if($price->defaultParticipants) $participants = $event->participants()->count();
                    else $participants = intval($price->participantNum);
                    
                    $totalPrice += intval($price->price) * $participants;      
                }
                
                $event->setAttribute('total_price', $totalPrice);
                $event->setAttribute('total_participants', $totalParticipants);
                $totPrice['public'] += $totalPrice;
                $totParticipants['public'] += $totalParticipants;
            }

        }        

        return response()->json([            
            'events' => [
                'publics' => $publics, 
                'inHouses' => $inHouses, 
                'totalPrice' => $totPrice,
                'totalParticipants' => $totParticipants,
            ]
        ]);
    }

    public function budgetReport(Request $request)
    {
        $validated = $request->validate([
            'budgetID' => [ 'required', 'numeric'],
            'start' => ['required', 'date'],
            'end' => ['required', 'date'],
            'mode' => ['nullable', 'integer']
        ]);
        
        // Year Budget
        $budget = Budget::with('details')->where('id', $validated['budgetID'])->first();

        $budget['total_value'] = 0;
        foreach($budget->details as $detail){
            $budgetTypePrices[$detail->budget_type_id] = 0;            
            $budget['total_value'] += intval($detail->value);
        }

        $budgetTypePrices['total_value'] = 0;        

        $events = Event::whereRaw('start_date between ? and ?', [$validated['start'], $validated['end']])->get();        

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
            'data' => ['budget' => $budget, 'budgetTypePrices' => $budgetTypePrices],
        ]);
    }
}
