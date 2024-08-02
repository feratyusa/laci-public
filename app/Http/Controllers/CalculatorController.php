<?php

namespace App\Http\Controllers;

use App\Http\Requests\Calculator\CalculatorUpdateEventRequest;
use App\Models\Event\Event;
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
                'price_per_person' => $event->price_per_person, 
                'total' => $event->participant_number * $event->price_per_person,
                'dirty' => false,
            ];
            $totalParticipant += $event->participant_number;
            $totalPrice += + $event->participant_number * $event->price_per_person;
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


        // return response()->json(['mess' => $validated]);
        // Check is each event that will be updated is exist // I mean it should exist if already passed here

        foreach ($validated['events'] as $newEvent) {
            Event::findOrFail($newEvent['id']);
        }

        // If nothing failed, iterate again for updating

        foreach ($validated['events'] as $newEvent) {
            Event::findOrFail($newEvent['id'])->update([
                'participant_number' => $newEvent['participant_number'],
                'price_per_person' => $newEvent['price_per_person'],
            ]);
        }

        return redirect()->route('calculator.index');
    }
}
