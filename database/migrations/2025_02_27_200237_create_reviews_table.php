<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('reviews', function (Blueprint $table) {
            $table->id();  // 自動インクリメントのID
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ユーザーID（外部キー）
            $table->string('title'); // 作品タイトル
            $table->string('work_id'); // APIから取得した作品ID
            $table->enum('work_type', ['anime', 'book']); // 作品の種類
            $table->string('image_url')->nullable(); // 作品画像URL
            $table->text('review_text'); // レビュー本文
            $table->boolean('is_public')->default(true); // 公開・非公開
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('reviews');
    }
};

