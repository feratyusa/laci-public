<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Http\Requests\Calculator\CalculatorUpdateEventRequest;
use App\Models\Event\Event;
use App\Models\Event\EventPrices;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculatorController extends Controller
{    
    public function index(Request $request)
    {
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
        else
        {
            return Inertia::render('Calculator/Index');
        }

        $query = "start_date between ? and ?";
        $data = [$start_date, $end_date];

        if(count($data)){
            $inHouses = Event::whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::IHT->value);
            })->whereRaw($query, $data)->get(); 
    
            $publics = Event::whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::PT->value);
            })->whereRaw($query, $data)->get();
        }
        else{
            $inHouses = Event::whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::IHT->value);
            })->whereRaw($query, $data)->get(); 
    
            $publics = Event::whereHas('proposal', function (Builder $q) {
                $q->where('event_category', EventCategory::PT->value);
            })->get();
        }

    
        $totPriceInHouse = 0;
        $totPartcInHouse = 0;
        $inHousePrices = [];
        foreach ($inHouses as $event) {
            $inHousePrices[] = (object)[
                'id' => $event->id, 
                'name' => $event->name,
                'participant_number' => $event->participant_number, 
                'training_price' => $event->prices->training_price, 
                'accomodation_price' => $event->prices->accomodation_price, 
                'total' => intval($event->participant_number) * (intval($event->prices->training_price) + intval($event->prices->accomodation_price)),
                'dirty' => false,
            ];
            $totPartcInHouse += $event->participant_number;
            $totPriceInHouse += $event->participant_number * ($event->prices->training_price + $event->prices->accomodation_price);
        }
        

        $totPricePublic = 0;
        $totPartcPublic = 0;
        $publicPrices = [];
        foreach ($publics as $event) {
            $publicPrices[] = (object)[
                'id' => $event->id, 
                'name' => $event->name,
                'participant_number' => $event->participant_number, 
                'training_price' => $event->prices->training_price, 
                'accomodation_price' => $event->prices->accomodation_price, 
                'total' => intval($event->participant_number) * (intval($event->prices->training_price) + intval($event->prices->accomodation_price)),
                'dirty' => false,
            ];
            $totPartcPublic += $event->participant_number;
            $totPricePublic += $event->participant_number * ($event->prices->training_price + $event->prices->accomodation_price);
        }
        
        return Inertia::render('Calculator/Index',[
            'calc_start_date' => session('calc_start_date'),
            'calc_end_date' => session('calc_end_date'),
            'publics' => $publicPrices,
            'totalPricePublic' => $totPricePublic,
            'totalPartcPublic' => $totPartcPublic,
            'inHouses' => $inHousePrices,
            'totalPriceInHouse' => $totPriceInHouse,
            'totalPartcInHouse' => $totPartcInHouse,
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
