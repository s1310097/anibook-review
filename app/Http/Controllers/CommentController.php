<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * 指定したレビューのコメント一覧取得
     */
    public function index($reviewId)
    {
        $comments = Comment::where('review_id', $reviewId)
            ->with('user:id,name')
            ->latest()
            ->get();

        return response()->json($comments);
    }

    /**
     * コメント作成
     */
    public function store(Request $request, $reviewId)
    {
        $validator = Validator::make($request->all(), [
            'comment_text' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comment = Comment::create([
            'user_id' => Auth::id(),
            'review_id' => $reviewId,
            'comment_text' => $request->comment_text,
        ]);

        return response()->json($comment, 201);
    }

    /**
     * コメント編集
     */
    public function update(Request $request, $id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validator = Validator::make($request->all(), [
            'comment_text' => 'required|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $comment->update([
            'comment_text' => $request->comment_text,
        ]);

        return response()->json($comment);
    }

    /**
     * コメント削除
     */
    public function destroy($id)
    {
        $comment = Comment::findOrFail($id);

        if ($comment->user_id !== Auth::id()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $comment->delete();

        return response()->json(['message' => 'コメントを削除しました。']);
    }
}
