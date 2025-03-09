<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\WorkController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\SearchController;

Route::middleware('auth:sanctum')->group(function () {
    /**
     * 作品関連
     */
    Route::prefix('works')->group(function () {
        Route::get('/', [WorkController::class, 'index'])->name('api.works.index');
        Route::get('/{workId}', [WorkController::class, 'show'])->name('api.works.show');
        Route::get('/{workId}/{workType}/reviews', [ReviewController::class, 'index'])->name('api.works.reviews.index');
    });

    /**
     * 作品ごとのレビュー関連
     */
    Route::prefix('works/{workId}/{workType}/reviews')->group(function () {
        Route::post('/', [ReviewController::class, 'store'])->name('api.works.reviews.store');
        Route::get('/{reviewId}', [ReviewController::class, 'show'])->name('api.works.reviews.show');
        Route::put('/{reviewId}', [ReviewController::class, 'update'])->name('api.works.reviews.update');
        Route::delete('/{reviewId}', [ReviewController::class, 'destroy'])->name('api.works.reviews.destroy');
    });

    /**
     * いいね機能
     */
    Route::post('/reviews/{reviewId}/like', [LikeController::class, 'toggle'])->name('api.reviews.like');

    /**
     * コメント機能
     */
    Route::prefix('reviews/{reviewId}/comments')->group(function () {
        Route::post('/', [CommentController::class, 'store'])->name('api.comments.store');
        Route::put('/{commentId}', [CommentController::class, 'update'])->name('api.comments.update');
        Route::delete('/{commentId}', [CommentController::class, 'destroy'])->name('api.comments.destroy');
    });

    /**
     * 検索機能
     */
    Route::get('/search', [SearchController::class, 'search'])->name('api.search');
});

/**
 * 公開APIルート
 */
Route::prefix('public')->group(function () {
    Route::get('/works', [WorkController::class, 'publicIndex'])->name('api.public.works.index');
    Route::get('/works/{workId}', [WorkController::class, 'publicShow'])->name('api.public.works.show');
    Route::get('/works/{workId}/{workType}/reviews', [ReviewController::class, 'publicIndex'])->name('api.public.works.reviews.index');
    Route::get('/reviews/{reviewId}', [ReviewController::class, 'publicShow'])->name('api.public.reviews.show');
});