<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Like;
use App\Models\Review;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function toggleLike(Request $request, $reviewId) {
        $user = Auth::user();
        $review = Review::findOrFail($reviewId);

        $like = Like::where('user_id', $user->id)->where('review_id', $reviewId)->first();

        if ($like) {
            $like->delete(); // いいね削除
            return response()->json(['liked' => false, 'likes_count' => $review->likes()->count()]);
        } else {
            Like::create(['user_id' => $user->id, 'review_id' => $reviewId]);
            return response()->json(['liked' => true, 'likes_count' => $review->likes()->count()]);
        }
    }
}
