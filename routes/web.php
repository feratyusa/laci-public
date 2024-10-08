<?php

use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Event\EventController;
use App\Http\Controllers\Event\EventParticipantController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\InputController;
use App\Http\Controllers\Master\BudgetController;
use App\Http\Controllers\Master\BudgetTypeController;
use App\Http\Controllers\Master\CategoryController;
use App\Http\Controllers\Master\LocationController;
use App\Http\Controllers\Master\MandatoryCategoryController;
use App\Http\Controllers\Master\UserController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Proposal\ProposalController;
use App\Http\Controllers\TutorialController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {   
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');

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
        Route::get('/{id}/edit', [ProposalController::class, 'edit'])->name('proposal.edit');
        Route::put('/{id}', [ProposalController::class, 'update'])->name('proposal.update');
        Route::delete('/{id}', [ProposalController::class, 'destroy'])->name('proposal.destroy');
        Route::put('/{id}/setPrices', [ProposalController::class, 'setPrices'])->name('proposal.setPrices');
        Route::delete('/{id}/resetPrices', [ProposalController::class, 'resetPrices'])->name('proposal.resetPrices');
    });

    Route::prefix('files')->group(function () {
        Route::post('', [FileController::class, 'store'])->name('file.store');
        Route::get('/{id}', [FileController::class, 'show'])->name('file.show');
        Route::get('/download/{id}', [FileController::class, 'download'])->name('file.download');
        Route::delete('/{id}', [FileController::class, 'destroy'])->name('file.destroy');
    });
    
    Route::prefix('events')->group(function () {
        Route::get('', [EventController::class, 'index'])->name('event.index');
        Route::get('/create', [EventController::class, 'create'])->name('event.create');
        Route::post('', [EventController::class, 'store'])->name('event.store');   
        Route::prefix('{id}')->group(function (){
            Route::get('', [EventController::class, 'show'])->name('event.show');
            Route::get('/edit', [EventController::class, 'edit'])->name('event.edit');
            Route::put('', [EventController::class, 'update'])->name('event.update');
            Route::delete('', [EventController::class, 'destroy'])->name('event.destroy');
            Route::put('/change-number-type', [EventController::class, 'changeNumberType'])->name('event.number-type');
            Route::prefix('participants')->group(function (){
                Route::get('', [EventParticipantController::class, 'index'])->name('event.participant.index');
                Route::post('', [EventParticipantController::class, 'store'])->name('event.participant.store');
                Route::put('', [EventParticipantController::class, 'update'])->name('event.participant.update');
                Route::delete('/{nip}', [EventParticipantController::class, 'destroy'])->name('event.participant.destroy');
            });
            Route::put('changeDefaultPrices', [EventController::class, 'changedefaultPrices'])->name('event.changeDefaultPrices');
            Route::put('setPrices', [EventController::class, 'setPrices'])->name('event.setPrices');
            Route::delete('resetPrices', [EventController::class, 'resetPrices'])->name('event.resetPrices');
        }); 
        
    });

    Route::prefix('calculator')->group(function (){
        Route::get('', [CalculatorController::class, 'index'])->name('calculator.index');
        Route::get('/reset', [CalculatorController::class, 'reset'])->name('calculator.reset');
        Route::put('/save', [CalculatorController::class, 'updateEvents'])->name('calculator.update');
    });

    Route::prefix('calendar')->group(function (){
        Route::get('', [CalendarController::class, 'index'])->name('calendar.index');
        Route::get('/reset', [CalendarController::class, 'reset'])->name('calendar.reset');
        Route::put('/update', [CalendarController::class, 'update'])->name('calendar.update');
    });

    Route::prefix('tutorials')->group(function (){
        Route::get('', [TutorialController::class, 'index'])->name('tutorial.index');        
    });

    Route::prefix('master')->group(function(){
   
        Route::prefix('categories')->group(function(){
            Route::get('', [CategoryController::class, 'index'])->name('category.index');
            Route::post('', [CategoryController::class, 'store'])->name('category.store');
            Route::put('/{id}', [CategoryController::class, 'update'])->name('category.update');
            Route::delete('/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');
        });

        Route::prefix('mandatory-categories')->group(function(){
            Route::get('', [MandatoryCategoryController::class, 'index'])->name('mandatory-category.index');
            Route::post('', [MandatoryCategoryController::class, 'store'])->name('mandatory-category.store');
            Route::get('/{mandatory_type}', [MandatoryCategoryController::class, 'show'])->name('mandatory-category.show');
            Route::put('/{mandatory_type}', [MandatoryCategoryController::class, 'update'])->name('mandatory-category.update');
            Route::delete('/{id}', [MandatoryCategoryController::class, 'destroy'])->name('mandatory-category.destroy');
        });

        Route::prefix('budgets')->group(function (){
            Route::get('', [BudgetController::class, 'index'])->name('budget.index');
            Route::post('', [BudgetController::class, 'store'])->name('budget.store');
            Route::put('/{id}', [BudgetController::class, 'update'])->name('budget.update');
            Route::delete('/{id}', [BudgetController::class, 'destroy'])->name('budget.destroy');
            Route::prefix('{id}/details')->group(function (){
                Route::post('', [BudgetController::class, 'detailStore'])->name('budget.details.store');
                Route::put('', [BudgetController::class, 'detailUpdate'])->name('budget.details.update');
                Route::delete('/{detail_id}', [BudgetController::class, 'detailDestroy'])->name('budget.details.destroy');
            });
        });

        Route::prefix('budgetTypes')->group(function(){
            Route::post('', [BudgetTypeController::class, 'store'])->name('budgetType.store');
            Route::put('/{id}', [BudgetTypeController::class, 'update'])->name('budgetType.update');
            Route::delete('/{id}', [BudgetTypeController::class, 'destroy'])->name('budgetType.destroy');
        });

        Route::prefix('users')->group(function(){
            Route::get('', [UserController::class, 'index'])->name('users.index');
            Route::post('', [UserController::class, 'store'])->name('users.store');
            Route::delete('/{username}', [UserController::class, 'destroy'])->name('users.destroy');
        });

        Route::prefix('locations')->group(function() {
            Route::get('', [LocationController::class, 'index'])->name('location.index');
            Route::post('', [LocationController::class, 'store'])->name('location.store');
            Route::put('/{id}', [LocationController::class, 'update'])->name('location.update');
            Route::delete('/{id}', [LocationController::class, 'destroy'])->name('location.destroy');
        });

    });
});

Route::prefix('api')->group(function (){
    Route::prefix('get')->group(function(){
        Route::get('proposals', [ProposalController::class, 'get'])->name('get.proposals');
        Route::get('events', [EventController::class, 'get'])->name('get.events');
    });
    Route::prefix('categories')->group(function(){
        Route::get('selections', [CategoryController::class, 'getSelections'])->name('api.category.selection');
    });
    Route::prefix('input')->group(function(){
        Route::get('courses', [InputController::class, 'getCoursesOptions'])->name('input.courses');
        Route::get('event-categories', [InputController::class, 'getEventCategoryOptions'])->name('input.event-categories');
        Route::get('users', [InputController::class, 'getUserOptions'])->name('input.users');
        Route::get('budgetTypes', [InputController::class, 'getBudgetTypeOptions'])->name('input.budgetTypes');
        Route::get('locations', [InputController::class, 'getLocationOptions'])->name('input.locations');
        Route::get('budgets', [InputController::class, 'getBudgetOptions'])->name('input.budgets');
    });
    Route::prefix('dashboard')->group(function() {
        Route::get('unfinishedDocuments', [DashboardController::class, 'unfinishedDocuments'])->name('dashboard.unfinishedDocuments');
        Route::get('budgetReport', [DashboardController::class, 'budgetReport'])->name('dashboard.budgetReport');
    });
    Route::prefix('calculator')->group(function() {
        Route::get('changeEvents', [CalculatorController::class, 'changeEvents'])->name('calculator.changeEvents');
        Route::get('budgetReport', [CalculatorController::class, 'budgetReport'])->name('calculator.budgetReport');
    });
    Route::prefix('calendar')->group(function() {
        Route::get('changeEvents', [CalendarController::class, 'changeEvents'])->name('calendar.changeEvents');
    });
});

