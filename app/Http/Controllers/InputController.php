<?php

namespace App\Http\Controllers;

use App\Enum\EventCategory;
use App\Enum\Prefixes;
use App\Enum\Verbs;
use App\Models\EHC\Employee;
use App\Models\EHC\JenisSertifikasi;
use App\Models\EHC\KelKursus;
use App\Models\EHC\Kursus;
use App\Models\EHC\LevelSertifikasi;
use App\Models\EHC\Vendor;
use App\Models\EHCWRITE\KursusWrite;
use App\Models\Event\EventParticipant;
use App\Models\File\Category;
use App\Models\Master\Budget;
use App\Models\Master\BudgetType;
use App\Models\Master\Location;
use App\Models\User;
use App\Trait\InputHelpers;
use App\Trait\TableColumnsHelper;
use Illuminate\Http\Request;

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

    public function getAvailableEmployees(Request $request)
    {
        $validated = $request->validate([
            'event_id' => ['required', 'numeric']
        ]);

        $eventParticipants = EventParticipant::select('nip')
                                                ->where('event_id', $validated['event_id'])
                                                ->get();

        $availables = Employee::whereNotIn('nip', $eventParticipants)
                                ->get()
                                ->toArray();

        return response()->json([
            'availableEmployees' => $this->selectOptions($availables, 'nip', 'nama')
        ]);
    }

    public function getJenisSertifikasi()
    {
        $jenisSertifikasi = JenisSertifikasi::select('id', 'nama')->get()->toArray();

        return response()->json([
            'sertifikasi' => $this->selectOptions($jenisSertifikasi, 'id', 'nama', true)
        ]);
    }

    public function getLevelSertifikasi()
    {
        $temps = LevelSertifikasi::with('jenis')->get();

        $levels = [];

        foreach ($temps as $value) {
            $levels[] = [
                'id' => $value->id,
                'label' => $value->jenis->nama." - ".$value->level
            ];
        }

        return response()->json([
            'levels' => $this->selectOptions($levels, 'id', 'label')
        ]);
    }

    public function getSertifikasiOnlyCourse()
    {
        return response()->json([
            'courses' => $this->selectOptions(Kursus::where('sertifikasi', 'sertifikasi')->get()->toArray(), 'sandi', 'lengkap')
        ]);
    }

    public function getLiniKursus()
    {
        return response()->json([
            'lini' => $this->selectOptions(KelKursus::groupBy('lini')->get()->toArray(), 'lini', 'lini', false)
        ]);
    }

    public function getSektorKursus(Request $request)
    {
        $lini = $request->input('lini');

        $sektors = $lini ?
            KelKursus::where('lini', $lini)->get()->toArray() :
            KelKursus::all()->toArray();

        return response()->json([
            'sektor' => $this->selectOptions($sektors, 'sektor', 'sektor', false)
        ]);
    }
}
