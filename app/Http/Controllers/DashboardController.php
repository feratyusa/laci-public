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
use Inertia\Inertia;

class DashboardController extends Controller
{
    use InputHelpers;
    use MonthHelper;

    public function dashboard(){
        $proposals = Proposal::all();
        $proposalSelection = [];
        foreach ($proposals as $proposal) {
            $temp = (object) ['value' => $proposal->id, 'label' => "({$proposal->id}) {$proposal->name}"];
            array_push($proposalSelection, $temp);
        }

        $events = Event::whereHas('proposal')->orderBy('start_date')->get();
        $recapEvents = [];
        foreach ($events as $event) {
            $type = $event->proposal->event_category == EventCategory::PT->value ? 'public' : 'inhouse';
            $yearMonth = date('Y-m', strtotime($event->start_date));
            if(array_key_exists($yearMonth, $recapEvents) && array_key_exists($type, $recapEvents[$yearMonth])){                
                $recapEvents[$yearMonth][$type]['count'] += 1;
                $recapEvents[$yearMonth][$type]['cost'] += $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                $recapEvents[$yearMonth][$type]['participants'] += $event->getTotalParticipants();
            }
            else{
                $recapEvents[$yearMonth][$type]['count'] = 1;
                $recapEvents[$yearMonth][$type]['cost'] = $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                $recapEvents[$yearMonth][$type]['participants'] = $event->getTotalParticipants();
            }
        }

        $temps = Proposal::with('files')->get();
        $unfinishedProposal = 0;
        $mandatoriesProposal = MandatoryFileCategory::where('mandatory_type', MandatoryCategoryLink::USULAN->value)->pluck('category_id')->toArray();

        foreach($temps as $proposal){
            $files = $proposal->files()->pluck('category_id')->toArray();
            $finished = true;
            foreach ($mandatoriesProposal as $mandatory) {               
                if(! in_array($mandatory, $files)){
                    $finished = false;
                    break;
                }
            }
            if(! $finished) $unfinishedProposal += 1;
        }

        $temps = Event::with('proposal')->get();
        $unfinishedPublic = 0;
        $unfinishedInHouse = 0;
        $mandatoriesPublic = MandatoryFileCategory::where('mandatory_type', MandatoryCategoryLink::IHT->value)->pluck('category_id')->toArray();
        $mandatoriesInHouse = MandatoryFileCategory::where('mandatory_type', MandatoryCategoryLink::PT->value)->pluck('category_id')->toArray();

        foreach($temps as $event){
            $files = $event->files()->pluck('category_id')->toArray();
            $finished = true;
            if($event->proposal->event_category == EventCategory::PT->value){
                foreach ($mandatoriesPublic as $mandatory) {               
                    if(! in_array($mandatory, $files)){
                        $finished = false;
                        break;
                    }
                }
                if(!$finished) $unfinishedPublic += 1;
            }
            else if($event->proposal->event_category == EventCategory::IHT->value){
                foreach ($mandatoriesInHouse as $mandatory) {               
                    if(! in_array($mandatory, $files)){
                        $finished = false;
                        break;
                    }
                }
                if(!$finished) $unfinishedInHouse += 1;
            }
        } 
        
        $tempsChart = [];
        foreach($events as $event){
            $year = date('Y', strtotime($event->start_date));
            $month = date('m', strtotime($event->start_date));
            if(array_key_exists($year, $tempsChart) && array_key_exists($month, $tempsChart[$year])){
                $tempsChart[$year][$month]['total']['cost'] += $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                $tempsChart[$year][$month]['total']['participants'] += $event->getTotalParticipants();
                
            }
            else{
                $tempsChart[$year][$month]['total']['cost'] = $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                $tempsChart[$year][$month]['total']['participants'] = $event->getTotalParticipants();
            }

            if($event->proposal->event_category == EventCategory::IHT->value){
                if(array_key_exists('inHouse', $tempsChart[$year][$month])){
                    $tempsChart[$year][$month]['inHouse']['cost'] += $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                    $tempsChart[$year][$month]['inHouse']['participants'] += $event->getTotalParticipants();
                }
                else{
                    $tempsChart[$year][$month]['inHouse']['cost'] = $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                    $tempsChart[$year][$month]['inHouse']['participants'] = $event->getTotalParticipants();
                }
            }
            else if($event->proposal->event_category == EventCategory::PT->value){
                if(array_key_exists('public', $tempsChart[$year][$month])){
                    $tempsChart[$year][$month]['public']['cost'] += $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                    $tempsChart[$year][$month]['public']['participants'] += $event->getTotalParticipants();
                }
                else{
                    $tempsChart[$year][$month]['public']['cost'] = $event->getTotalParticipants() * ($event->prices->training_price + $event->prices->accomodation_price);
                    $tempsChart[$year][$month]['public']['participants'] = $event->getTotalParticipants();
                }
            }
        }
        $chartValues = [];
        foreach ($tempsChart as $year => $months) {
            foreach($months as $month => $categories){
                foreach($categories as $category => $types)
                    foreach($types as $type => $value){
                        $chartValues[$year][$category][$type]['x'][] = $this->getMonthString($month);
                        $chartValues[$year][$category][$type]['y'][] = $value;
                    }
            }
        }        

        return Inertia::render('Dashboard', [            
            'events' => $recapEvents,
            'budgets' => $this->selectOptions(Budget::with('details')->orderByDesc('year')->get()->toArray(), 'year', 'year', false, ['details']),
            'unfinished' => ['proposal' => $unfinishedProposal, 'public' => $unfinishedPublic, 'inHouse' => $unfinishedInHouse],
            'chartValues' => $chartValues,
        ]);
    }
}
