<?php

namespace App\Http\Controllers;

use App\Models\Event\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CalendarController extends Controller
{
    public function index()
    {
        $events = Event::all();

        return Inertia::render('Calendar/Index', [
            'events' => $events
        ]);
    }

    public function update()
    {
        
    }
}
