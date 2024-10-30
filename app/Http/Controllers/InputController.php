<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Enum\Prefixes;
use App\Enum\Verbs;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\EHC\Vendor;
use App\Models\File\Category;
use App\Models\Master\Budget;
use App\Models\Master\BudgetType;
use App\Models\Master\Location;
use App\Models\User;
use App\Trait\InputHelpers;
use App\Trait\TableColumnsHelper;

class InputController extends Controller
{
    use InputHelpers;
    use TableColumnsHelper;

    public function getCoursesOptions()
    {
        return response()->json([
            'courses' => $this->selectOptions(Kursus::all()->toArray(), 'sandi', 'lengkap')
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

    public function getDiklatColumns()
    {
        $options = $this->getTableDiklatColumns();
        return response()->json([
            'diklatColumns' => $this->selectOptions($options, 'value', 'value', false)
        ]);
    }

    public function getEmployeeColumns()
    {
        $options = $this->getTableEmployeeColumns();
        return response()->json([
            'empColumns' => $this->selectOptions($options, 'value', 'value', false)
        ]);
    }

    public function getVerbOptions()
    {
        return response()->json([
            'verbs' => Verbs::selection()
        ]);
    }

    public function getPrefixOptions()
    {
        return response()->json([
            'prefixes' => Prefixes::selection()
        ]);
    }

    public function getCategoryOptions()
    {
        return response()->json([
            'categories' => $this->selectOptions(Category::all()->toArray(), 'id', 'name', false)
        ]);
    }

    public function getEmployeeDepartments()
    {
        $department = Employee::select('jabatan')->groupBy('jabatan')->get()->toArray();

        return response()->json([
            'departments' => $this->selectOptions($department, 'jabatan', 'jabatan', false)
        ]);
    }

    public function getEmployeeBranches()
    {
        $branches = Employee::select('cabang')->groupBy('cabang')->get()->toArray();

        return response()->json([
            'branches' => $this->selectOptions($branches, 'cabang', 'cabang', false)
        ]);
    }

    public function getEmployeeSections()
    {
        $sections = Employee::select('seksi')->groupBy('seksi')->get()->toArray();

        return response()->json([
            'sections' => $this->selectOptions($sections, 'seksi', 'seksi',enableIdOnLabel:  false)
        ]);
    }

    public function getEmployeeJobs()
    {
        $jobs = Employee::select('jobfam')->groupBy('jobfam')->get()->toArray();

        return response()->json([
            'jobs' => $this->selectOptions($jobs, 'jobfam', 'jobfam', false)
        ]);
    }
}
