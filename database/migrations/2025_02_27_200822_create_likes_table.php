<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('likes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // ユーザーID
            $table->foreignId('review_id')->constrained()->onDelete('cascade'); // レビューID
            $table->timestamps();
            $table->unique(['user_id', 'review_id']); // 1人1回のみの制限
        });
    }

    public function down(): void {
        Schema::dropIfExists('likes');
    }
};
