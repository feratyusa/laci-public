<?php

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

Route::prefix('proposals')->group(function () {
    Route::get('', [ProposalController::class, 'index'])->name('proposal.index');
    Route::get('/create', [ProposalController::class, 'create'])->name('proposal.create');
    Route::post('', [ProposalController::class, 'store'])->name('proposal.store');
    Route::post('/{id}', [ProposalController::class, 'changeStatus'])->name('proposal.status');
    Route::get('/{id}', [ProposalController::class, 'show'])->name('proposal.show');
    Route::put('/{id}', [ProposalController::class, 'update'])->name('proposal.update');
    Route::delete('/{id}', [ProposalController::class, 'destroy'])->name('proposal.destroy');
});
