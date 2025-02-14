<?php
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MyprofileController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ReviewController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile/{id}', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/{id}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::put('/profile/{id}', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * 作品画面URLの設定
     */
    Route::prefix('works')->group(function () {
        Route::get('/', [WorkController::class, 'index']);
    });

    /**
     * マイプロフィール画面URLの設定
     */
    Route::prefix('myprofile')->group(function () {
        Route::get('/', [MyprofileController::class, 'index']);
    });

    /**
     * レビュー画面URLの設定
     */
    Route::prefix('works/{worksId}/reviews')->group(function () {
        Route::get('/', [ReviewController::class, 'index']);
    });
});

require __DIR__.'/auth.php';