<?php

use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Proposal\ProposalController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {   
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::middleware('auth')->group(function () {
    Route::prefix('proposals')->group(function () {
        Route::get('', [ProposalController::class, 'index'])->name('proposal.index');
        Route::get('/create', [ProposalController::class, 'create'])->name('proposal.create');
        Route::post('', [ProposalController::class, 'store'])->name('proposal.store');
        Route::post('/{id}', [ProposalController::class, 'changeStatus'])->name('proposal.status');
        Route::get('/{id}', [ProposalController::class, 'show'])->name('proposal.show');
        Route::get('/edit/{id}', [ProposalController::class, 'edit'])->name('proposal.edit');
        Route::put('/{id}', [ProposalController::class, 'update'])->name('proposal.update');
        Route::delete('/{id}', [ProposalController::class, 'destroy'])->name('proposal.destroy');
    });

    Route::prefix('files')->group(function () {
        Route::post('', [FileController::class, 'store'])->name('file.store');
    });
    
    Route::prefix('events')->group(function () {
        Route::get('', [EventController::class, 'index'])->name('event.index');
        Route::get('/create', [EventController::class, 'create'])->name('event.create');
        Route::post('', [EventController::class, 'store'])->name('event.store');    
        Route::get('/{id}', [EventController::class, 'show'])->name('event.show');
        Route::get('/edit/{id}', [EventController::class, 'edit'])->name('event.edit');
        Route::put('/{id}', [EventController::class, 'update'])->name('event.update');
        Route::delete('/{id}', [EventController::class, 'destroy'])->name('event.destroy');
    });

    Route::prefix('calculator')->group(function (){
        Route::get('', [CalculatorController::class, 'calculator'])->name('calculator.index');
        Route::put('/save', [CalculatorController::class, 'updateEvents'])->name('calculator.update');
    });
});

