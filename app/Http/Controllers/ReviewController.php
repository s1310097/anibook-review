<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Review;
use Illuminate\Support\Facades\Http;

class ReviewController extends Controller
{
    // 作品ごとのレビューを取得
    public function getByWork($workId, $workType)
    {
        if ($workType === 'anime') {
            // JIKAN APIを使用してアニメの詳細を取得
            $response = Http::get("https://api.jikan.moe/v4/anime/{$workId}");
        } elseif ($workType === 'book') {
            // Google Books APIを使用して本の詳細を取得
            $response = Http::get("https://www.googleapis.com/books/v1/volumes/{$workId}");
        }

        $workDetails = $response->json();
        $reviews = Review::where('work_id', $workId)->where('work_type', $workType)->get();

        return response()->json([
            'work_details' => $workDetails,
            'reviews' => $reviews,
        ]);
    }

    // レビューを保存する
    public function store(Request $request, $workId, $workType)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'review_text' => 'required|string|max:1000',
            'is_public' => 'boolean',
        ]);

        $review = Review::create([
            'work_id' => $workId,
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'review_text' => $validated['review_text'],
            'is_public' => $validated['is_public'],
            'work_type' => $workType,
        ]);

        return response()->json($review, 201);
    }

    public function index($workId, $workType)
    {
        $reviews = Review::where('work_id', $workId)->where('work_type', $workType)->get();
        return response()->json($reviews);
    }

    public function show($workId, $workType, $reviewId)
    {
        $review = Review::where('work_id', $workId)->where('work_type', $workType)->where('id', $reviewId)->first();
        if (!$review) {
            return response()->json(['message' => 'レビューが見つかりません。'], 404);
        }

        return response()->json($review);
    }

    public function update(Request $request, $workId, $workType, $reviewId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'review_text' => 'required|string|max:1000',
            'is_public' => 'boolean',
        ]);

        $review = Review::where('work_id', $workId)->where('work_type', $workType)->where('id', $reviewId)->first();
        if (!$review) {
            return response()->json(['message' => 'レビューが見つかりません。'], 404);
        }

        $review->update($validated);

        return response()->json($review);
    }

    public function destroy($workId, $workType, $reviewId)
    {
        $review = Review::where('work_id', $workId)->where('work_type', $workType)->where('id', $reviewId)->first();
        if (!$review) {
            return response()->json(['message' => 'レビューが見つかりません。'], 404);
        }

        $review->delete();

        return response()->json(['message' => 'レビューが削除されました。']);
    }
}