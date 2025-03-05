<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'favorite_work' => 'ドラゴンボール', // お気に入りの作品を設定
            'bio' => 'よろしくお願いします！', // 自己紹介
            'is_public' => true, // 公開設定
        ]);
    }
}
