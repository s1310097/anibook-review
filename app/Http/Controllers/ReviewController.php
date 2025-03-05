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
    public function store(Request $request, $workId)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'review_text' => 'required|string|max:1000',
            'is_public' => 'boolean',
            'work_type' => 'required|string|in:anime,book',
        ]);

        $review = Review::create([
            'work_id' => $workId,
            'user_id' => auth()->id(),
            'title' => $validated['title'],
            'review_text' => $validated['review_text'],
            'is_public' => $validated['is_public'],
            'work_type' => $validated['work_type'],
        ]);

        return response()->json($review, 201);
    }

    public function index()
    {
        $reviews = Review::all();
        return;
    }
}