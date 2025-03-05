<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('works', function (Blueprint $table) {
            $table->id();  // 自動インクリメントのID
            $table->string('title'); // 作品タイトル
            $table->string('work_type'); // 作品の種類（例: anime, book）
            $table->string('image_url')->nullable(); // 作品画像URL
            $table->timestamps(); // created_at, updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void {
        Schema::dropIfExists('works');
    }
};

