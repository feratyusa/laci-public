<?php

namespace App\Http\Controllers;

use App\Http\Requests\Calculator\CalculatorUpdateEventRequest;
use App\Models\Event\Event;
use App\Models\Event\EventPrices;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalculatorController extends Controller
{
    public function calculator()
    {
        $events = Event::all();

        $totalPrice = 0;
        $totalParticipant = 0;
        $prices = [];
        foreach ($events as $event) {
            $prices[] = (object)[
                'id' => $event->id, 
                'name' => $event->name,
                'participant_number' => $event->participant_number, 
                'training_price' => $event->prices->training_price, 
                'accomodation_price' => $event->prices->accomodation_price, 
                'total' => intval($event->participant_number) * (intval($event->prices->training_price) + intval($event->prices->accomodation_price)),
                'dirty' => false,
            ];
            $totalParticipant += $event->participant_number;
            $totalPrice += $event->participant_number * ($event->prices->training_price + $event->prices->accomodation_price);
        }

        return Inertia::render('Calculator/Index',[
            'events' => $events,
            'prices' => $prices,
            'totalPrice' => $totalPrice,
            'totalParticipant' => $totalParticipant,
        ]);
    }

    public function changeEvent()
    {
        
    }

    public function updateEvents(CalculatorUpdateEventRequest $request)
    {
        $validated = $request->validated();

        // Check is each event and prices that will be updated is exist // I mean it should exist if already passed here

        foreach ($validated['events'] as $newEvent) {
            Event::findOrFail($newEvent['id']);
            EventPrices::where('event_id', $newEvent['id'])->firstOrFail();            
        }

        // If nothing failed, iterate again for updating

        foreach ($validated['events'] as $newEvent) {
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
