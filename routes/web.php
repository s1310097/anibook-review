<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MyprofileController;
use App\Http\Controllers\WorkController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\SearchController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::middleware('auth')->group(function () {
    /**
     * プロフィール関連
     */
    Route::prefix('profile')->group(function () {
        Route::get('/{id}', [ProfileController::class, 'show'])->name('profile.show');
        Route::get('/{id}/edit', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::put('/{id}', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/destroy', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });

    /**
     * 作品関連
     */
    Route::prefix('works')->group(function () {
        Route::get('/', [WorkController::class, 'index'])->name('works.index');

        // 作品のレビュー一覧
        Route::get('/{workId}/{workType}/reviews', [ReviewController::class, 'index'])->name('works.reviews');

        // 作品のレビュー詳細
        Route::get('/{workId}/{workType}/reviews/{reviewId}', [ReviewController::class, 'show'])->name('reviews.detail');
    });

    /**
     * マイプロフィール関連
     */
    Route::prefix('myprofile')->group(function () {
        Route::get('/', [MyprofileController::class, 'index'])->name('myprofile.index');
    });

    /**
     * 作品ごとのレビュー関連ルート
     */
    Route::prefix('works/{workId}/{workType}/reviews')->group(function () {
        // 作品ごとのレビュー一覧
        Route::get('/', [ReviewController::class, 'index'])->name('works.reviews.index');

        // レビュー作成ページ
        Route::get('/create', function ($workId, $workType) {
            if (!in_array($workType, ['anime', 'book'])) {
                abort(404, '無効な作品タイプです');
            }
            return Inertia::render('Reviews/Create', ['workId' => $workId, 'workType' => $workType]);
        })->middleware('auth')->name('works.reviews.create');

        // レビュー作成（POST）
        Route::post('/', [ReviewController::class, 'store'])->name('works.reviews.store');

        // レビュー詳細
        Route::get('/{reviewId}', [ReviewController::class, 'show'])->name('works.reviews.show');

        // レビュー編集
        Route::get('/{reviewId}/edit', [ReviewController::class, 'edit'])->name('works.reviews.edit');
        Route::put('/{reviewId}', [ReviewController::class, 'update'])->name('works.reviews.update');

        // レビュー削除
        Route::delete('/{reviewId}', [ReviewController::class, 'destroy'])->name('works.reviews.destroy');
    });

    /**
     * いいね機能
     */
    Route::post('/reviews/{reviewId}/like', [LikeController::class, 'toggle'])->name('reviews.like');

    /**
     * コメント機能
     */
    Route::prefix('reviews/{reviewId}/comments')->group(function () {
        Route::post('/', [CommentController::class, 'store'])->name('comments.store');
        Route::put('/{commentId}', [CommentController::class, 'update'])->name('comments.update');
        Route::delete('/{commentId}', [CommentController::class, 'destroy'])->name('comments.destroy');
    });

    /**
     * 検索機能
     */
    Route::get('/search', [SearchController::class, 'search'])->name('search');
});

require __DIR__.'/auth.php';
