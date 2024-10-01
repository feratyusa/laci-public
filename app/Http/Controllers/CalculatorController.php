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
        // Check and get the value for input field or session key of 'start' and 'end' for the events
        if($request->filled('start') && $request->filled('end'))
        {
            $validated = $request->validate([
                'start' => ['date'],
                'end' => ['date']
            ]);
            $start_date = $validated['start'];
            $end_date = $validated['end'];

            session(['calc_start_date' => $start_date, 'calc_end_date' => $end_date]);
        }   
        else if(session()->has('calc_start_date') && session()->has('calc_end_date')) 
        {
            $start_date = session('calc_start_date');
            $end_date = session('calc_end_date');
        }
        // If there's none yet return index as is
        else
        {
            return Inertia::render('Calculator/Index');
        }

        $query = "start_date between ? and ?";
        $data = [$start_date, $end_date];

        if(count($data)){
            $inHouses = Event::with('prices')->whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::IHT->value);
            })->whereRaw($query, $data)->get(); 
    
            $publics = Event::with('prices')->whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::PT->value);
            })->whereRaw($query, $data)->get();
        }
        else{
            $inHouses = Event::with('prices')->whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::IHT->value);
            })->get(); 
    
            $publics = Event::with('prices')->whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::PT->value);
            })->get();
        }

        $budgetTypePrices['total_value'] = 0;
        $totPrice['inHouse'] = 0; $totPrice['public'] = 0;
        $totParticipants['inHouse'] = 0; $totParticipants['public'] = 0;

        foreach($inHouses as $event){

            $totalPrice = 0;
            $totalParticipants = $event->participant_number_type == ParticipantNumberType::DYNAMIC->value ? $event->participants()->count() : $event->participant_number;
            foreach($event->prices as $price){

                if($price->defaultParticipants) $participants = $event->participants()->count();
                else $participants = intval($price->participantNum);
                
                $totalPrice += intval($price->price) * $participants;

                $budgetTypePrices = $this->calculateBudgetTypePrices($budgetTypePrices, $price->budget_type_id, intval($price->price) * $participants);
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
                $budgetTypePrices = $this->calculateBudgetTypePrices($budgetTypePrices, $price->budget_type_id, intval($price->price) * $participants);          
            }
            
            $event->setAttribute('total_price', $totalPrice);
            $event->setAttribute('total_participants', $totalParticipants);
            $totPrice['public'] += $totalPrice;
            $totParticipants['public'] += $totalParticipants;
        }

        // Check and get input field of 'budget_id' for the budget
        if($request->filled('budget_id')){
            $validated = $request->validate([
                'budget_id' => ['numeric']
            ]);

            $budget = Budget::with('details')->findOrFail($validated['budget_id']);            
            $budget['total_value'] = 0;
            foreach ($budget->details as $detail) {
                $budget['total_value'] += $detail->value;
            }
        }

        $request->flash();

        return Inertia::render('Calculator/Index',[
            'calc_start_date' => session('calc_start_date'),
            'calc_end_date' => session('calc_end_date'),
            'events' => [$publics, $inHouses],
            'publics' => $publics,
            'inHouses' => $inHouses,
            'totalPrice' => $totPrice,
            'totalParticipants' => $totParticipants,
            'budgetTypePrices' => $budgetTypePrices,
            'budget' => $budget ?? null,
            'budgets' => $this->selectOptions(Budget::all()->toArray(), 'id', 'year', false),
        ]);
    }

    public function reset()
    {
        session()->forget('calc_start_date');
        session()->forget('calc_end_date');

        return redirect()->route('calculator.index');
    }

    public function changeEvent()
    {
        
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
}
