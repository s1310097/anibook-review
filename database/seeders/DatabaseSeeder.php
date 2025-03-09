<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Review;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // ユーザーのテストデータを生成
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'favorite_work' => 'ドラゴンボール', // お気に入りの作品を設定
            'bio' => 'よろしくお願いします！', // 自己紹介
            'is_public' => true, // 公開設定
        ]);

        // レビューのテストデータを生成
        Review::factory()->count(10)->create([
            'user_id' => $user->id, // 上記で作成したユーザーのIDを使用
        ]);
    }
}
