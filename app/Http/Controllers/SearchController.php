<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class SearchController extends Controller
{
    /**
     * Handle the search request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function search(Request $request)
    {
        $query = $request->input('query');

        if (!$query) {
            return response()->json(['error' => '検索クエリが必要です。'], 400);
        }

        try {
            // アニメの検索結果を取得
            $animeResponse = Http::get('https://api.jikan.moe/v4/anime', [
                'q' => $query,
            ]);
            $animeResults = $animeResponse->json()['data'] ?? [];

            // 本の検索結果を取得
            $bookResponse = Http::get('https://www.googleapis.com/books/v1/volumes', [
                'q' => $query,
            ]);
            $bookResults = $bookResponse->json()['items'] ?? [];

            return response()->json([
                'animeResults' => $animeResults,
                'bookResults' => $bookResults,
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'データの取得に失敗しました。'], 500);
        }
    }
}