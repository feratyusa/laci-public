<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Models\EHC\Diklat;
use App\Models\EHC\Kursus;
use App\Models\EHC\Vendor;
use App\Models\Master\Budget;
use App\Models\Master\BudgetType;
use App\Models\Master\Location;
use App\Models\User;
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

    public function getUserOptions()
    {
        return response()->json([
            'users' => $this->selectOptions(User::all()->toArray(), 'username', 'username', false)
        ]);
    }

    public function getBudgetTypeOptions()
    {
        return response()->json([
            'budgetTypes' => $this->selectOptions(BudgetType::all()->toArray(), 'id', 'name'    ),
        ]);
    }

    public function getLocationOptions()
    {
        return response()->json([
            'locations' => $this->selectOptions(Location::all()->toArray(), 'id', 'name')
        ]);
    }

    public function getBudgetOptions()
    {
        return response()->json([
            'budgets' => $this->selectOptions(Budget::all()->toArray(), 'id', 'year', false)
        ]);
    }

    public function getVendorOptions()
    {
        return response()->json([
            'vendors' => $this->selectOptions(Vendor::all()->toArray(), 'sandi', 'lengkap')
        ]);
    }
}
