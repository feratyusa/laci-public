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
        return Inertia::render('Dashboard');
    }
}
