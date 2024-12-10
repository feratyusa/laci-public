<?php

namespace App\Http\Controllers\Utilities;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardReloadController extends Controller
{
    public function index(){
        return Inertia::render('Utility/DashboardReload/Index');
    }
}
