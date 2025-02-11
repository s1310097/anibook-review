<?php

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

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

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



require __DIR__ . '/auth.php';