<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Models\EHC\Kursus;
use App\Trait\InputHelpers;
use Illuminate\Http\Request;

class InputController extends Controller
{
    use InputHelpers;
    public function getCoursesOptions()
    {
        return response()->json([
            'courses' => $this->selectOptions(Kursus::all()->toArray(), 'sandi', 'lengkap', false)
        ]);
    }

    public function getEventCategoryOptions()
    {
        return response()->json([
            'event_categories' => EventCategory::selection()
        ]);
    }
}
