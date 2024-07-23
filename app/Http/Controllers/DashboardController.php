<?php

namespace App\Http\Controllers;

use App\Enum\FileCategory;
use App\Models\Event\Event;
use App\Models\Proposal\Proposal;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(){
        $proposals = Proposal::all();
        $proposalSelection = [];
        foreach ($proposals as $proposal) {
            $temp = (object) ['value' => $proposal->id, 'label' => "({$proposal->id}) {$proposal->name}"];
            array_push($proposalSelection, $temp);
        }

        $events = Event::all();
        $eventSelection = [];
        foreach ($events as $event) {
            $temp = (object) ['value' => $proposal->id, 'label' => "({$event->id}) {$event->name}"];
        }

        $categories = FileCategory::cases();
        $categorySelection = [];
        foreach ($categories as $category) {
            $temp = (object) ['value' => $category->value, 'label' => $category->value];
            array_push($categorySelection, $temp);
        }

        return Inertia::render('Dashboard', [
            'proposals' => $proposalSelection,
            'events' => $eventSelection,
            'categories' => $categorySelection,
        ]);
    }
}
