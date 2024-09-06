<?php

namespace App\Http\Controllers;

use App\Http\Requests\Calendar\CalendarUpdateEventRequest;
use App\Models\Event\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $start = session()->exists('calendar_start_date') ? session('calendar_start_date') : '';
        $end = session()->exists('calendar_end_date') ? session('calendar_end_date') : '';

        if($request->filled('start') && $request->filled('end')){
            $validated = $request->validate([
                'start' => ['date'],
                'end' => ['date'],
            ]);

            $start = $validated['start'];
            $end = $validated['end'];
            session(['calendar_start_date' => $validated['start'], 'calendar_end_date' => $validated['end']]);
        }
        else if(session('calendar_start_date') && session('calendar_end_date')){
            $start = session('calendar_start_date');
            $end = session('calendar_end_date');
        }
        else{
            return Inertia::render('Calendar/Index');
        }

        $events = Event::with('proposal')->whereRaw('start_date between ? and ?', [$start, $end])->get();

        return Inertia::render('Calendar/Index', [
            'start' => $start,
            'end' => $end,
            'events' => $events
        ]);
    }
    
    public function reset()
    {
        session()->forget(['calculator_start_date', 'calculator_end_date']);
        return redirect()->route('calendar.index');
    }

    public function update(CalendarUpdateEventRequest $request)
    {
        $validated = $request->validated();

        // Check if event exists // duh it should be
        foreach($validated['tasks'] as $task){
            Event::findOrFail($task['id']);
        }

        // Iterate again to update
        foreach($validated['tasks'] as $task){
            Event::findOrFail($task['id'])->updateOrFail([
                'start_date' => date('Y-m-d', strtotime($task['start'])),
                'end_date' => date('Y-m-d', strtotime($task['end']))
            ]);
        }

        return redirect()->route('calendar.index');
    }
}
