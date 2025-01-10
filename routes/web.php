<?php

use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\CalendarController;
use App\Http\Controllers\ChangeLogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EHC\DiklatController;
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
use App\Http\Controllers\Utilities\DashboardReloadController;
use App\Http\Controllers\Utilities\NugieController;
use App\Http\Controllers\Master\SertifikasiController;
use Illuminate\Support\Facades\Route;

Route::get('/', [DashboardController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/test-dev', [DashboardController::class, 'test']);
Route::get('/phpinfo', function(){
    phpinfo();
});
Route::get('/le', function() {
    print_r(get_loaded_extensions());
});

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
        Route::post('/proposal/{proposal_id}', [FileController::class, 'storeProposal'])->name('file.store.proposal');
        Route::post('/event/{event_id}', [FileController::class, 'storeEvent'])->name('file.store.event');
        Route::get('/{id}', [FileController::class, 'show'])->name('file.show');
        Route::get('/download/{id}', [FileController::class, 'download'])->name('file.download');
        Route::delete('/{id}', [FileController::class, 'destroy'])->name('file.destroy');
    });

    Route::prefix('events')->group(function () {
        Route::get('', [EventController::class, 'index'])->name('event.index');
        Route::get('/create', [EventController::class, 'create'])->name('event.create');
        Route::get('/templateParticipantsDownload', [EventController::class, 'getTemplateInputParticipantsFile'])->name('event.download.templateFileParticipants');
        Route::post('', [EventController::class, 'store'])->name('event.store');
        Route::prefix('{id}')->group(function (){
            Route::get('', [EventController::class, 'show'])->name('event.show');
            Route::get('/edit', [EventController::class, 'edit'])->name('event.edit');
            Route::put('', [EventController::class, 'update'])->name('event.update');
            Route::delete('', [EventController::class, 'destroy'])->name('event.destroy');
            Route::put('/change-number-type', [EventController::class, 'changeNumberType'])->name('event.number-type');
            Route::prefix('participants')->group(function (){
                Route::post('', [EventParticipantController::class, 'store'])->name('event.participant.store');
                Route::put('', [EventParticipantController::class, 'update'])->name('event.participant.update');
                Route::get('/manage', [EventParticipantController::class, 'manage'])->name('event.participant.manage');
                Route::put('/updateAndReplace', [EventParticipantController::class,'updateAndReplace'])->name('event.participant.updateReplace');
                Route::delete('/destroyAll', [EventParticipantController::class, 'destroyAll'])->name('event.participant.destroyAll');
                Route::delete('/{nip}', [EventParticipantController::class, 'destroy'])->name('event.participant.destroy');
            });
            Route::post('importParticipantsAttendece', [EventController::class, 'importFromAbsenDiklat'])->name('event.importParticpantsAttendence');
            Route::get('exportParticipants', [EventController::class, 'exportEventParticipants'])->name('event.exportEventParticipants');
            Route::put('changeDefaultPrices', [EventController::class, 'changedefaultPrices'])->name('event.changeDefaultPrices');
            Route::put('setPrices', [EventController::class, 'setPrices'])->name('event.setPrices');
            Route::delete('resetPrices', [EventController::class, 'resetPrices'])->name('event.resetPrices');
            Route::post('migrateToDiklat', [DiklatController::class, 'storeDiklat'])->name('event.migrateToDiklat');
            Route::get('changeMigrationStatus', [EventController::class, 'changeMigrateStatus'])->name('event.changeMigrateStatus');
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

    Route::prefix('change-logs')->group(function (){
        Route::get('', [ChangeLogController::class, 'index'])->name('changeLog.index');
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


        Route::prefix('sertifikasi')->group(function() {
            Route::get('', [SertifikasiController::class, 'index'])->name('sertifikasi.index');
            Route::post('jenis', [SertifikasiController::class, 'storeJenisSertifkasi'])->name('sertifikasi.jenis.create');
            Route::post('level', [SertifikasiController::class, 'storeLevelSertifikasi'])->name('sertifikasi.level.create');
            Route::post('kursus', [SertifikasiController::class, 'storeDetailSertifikasi'])->name('sertifikasi.detail.create');
            Route::put('jenis/{id}', [SertifikasiController::class, 'updateJenisSertifikasi'])->name('sertifikasi.jenis.update');
            Route::put('level/{id}', [SertifikasiController::class, 'updateLevelSertifikasi'])->name('sertifikasi.level.update');
            Route::put('kursus/{id}', [SertifikasiController::class, 'updateDetailSertifikasi'])->name('sertifikasi.detail.update');
            Route::put('jenis/{id}', [SertifikasiController::class, 'destroyJenisSertifikasi'])->name('sertifikasi.jenis.destroy');
            Route::put('level/{id}', [SertifikasiController::class, 'destroyLevelSertifikasi'])->name('sertifikasi.level.destroy');
            Route::put('kursus/{id}', [SertifikasiController::class, 'destroyDetailSertifikasi'])->name('sertifikasi.detail.destroy');
        });

    });

    Route::prefix('utilities')->group(function() {

        Route::prefix('nugies')->group(function() {
            Route::get('', [NugieController::class, 'index'])->name('nugie.index');
            Route::post('', [NugieController::class, 'store'])->name('nugie.store');
            Route::get('/{id}', [NugieController::class, 'show'])->name('nugie.show');
            Route::put('/{id}', [NugieController::class, 'update'])->name('nugie.update');
            Route::delete('/{id}', [NugieController::class, 'destroy'])->name('nugie.destroy');
            Route::get('/{id}/duplicates', [NugieController::class, 'duplicateNugie'])->name('nugie.duplicate');
            Route::get('/{id}/export', [NugieController::class, 'export'])->name('nugie.export');
            Route::post('/{id}/details', [NugieController::class, 'storeDetails'])->name('nugie.store.details');
            Route::put("/{id}/details/{detail_id}", [NugieController::class, 'updateDetails'])->name('nugie.update.details');
            Route::delete("/{id}/details/{detail_id}", [NugieController::class, 'destroyDetails'])->name('nugie.destroy.details');
            Route::get('/{id}/details/{detail_id}/duplicates', [NugieController::class, 'duplicateNugieRules'])->name('nugie.duplicate.rule');
        });

        Route::prefix('reportReload')->group(function() {
            Route::get('', [DashboardReloadController::class, 'index'])->name('reportReload.index');
            Route::get('getAllColumns', [DashboardReloadController::class, 'getAllColumnValues'])->name('reportReload.get.AllColumnValues');
            Route::get('getColumnValueResults', [DashboardReloadController::class, 'getColumnValueResults'])->name('reportReload.get.ColumnValues');
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
        Route::get('vendors', [InputController::class, 'getVendorOptions'])->name('input.vendors');
        Route::get('diklatColumns', [InputController::class, 'getDiklatColumns'])->name('input.diklatColumns');
        Route::get('employeeColumns', [InputController::class, 'getEmployeeColumns'])->name('input.employeeColumns');
        Route::get('verbs', [InputController::class, 'getVerbOptions'])->name('input.verbs');
        Route::get('prefixes', [InputController::class, 'getPrefixOptions'])->name('input.prefixes');
        Route::get('categories', [InputController::class, 'getCategoryOptions'])->name('input.categories');
        Route::get('departments', [InputController::class, 'getEmployeeDepartments'])->name('input.employeeDepartments');
        Route::get('sections',  [InputController::class, 'getEmployeeSections'])->name('input.employeeSections');
        Route::get('branches', [InputController::class, 'getEmployeeBranches'])->name('input.employeeBranches');
        Route::get('jobs', [InputController::class, 'getEmployeeJobs'])->name('input.employeeJobs');
        Route::get('availableEmployees', [InputController::class, 'getAvailableEmployees'])->name('input.availableEmployees');
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
    Route::prefix('nugies')->group(function(){
        Route::get('/{id}/nugieData/{detail_id}', [NugieController::class, 'getNugieData'])->name('nugie.nugieData');
        Route::post('generateSQL', [NugieController::class, 'generateSQL'])->name('nugie.generateSQL');
    });
    Route::prefix('event')->group(function() {
        Route::prefix('participants')->group(function(){
            Route::post('check-participants', [EventParticipantController::class, 'checkParticipants'])->name('event.participants.check');
            Route::post('check-status', [EventParticipantController::class, 'checkStatuses'])->name('event.participant.status');
        });
    });
})->middleware('auth');

