<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('favorite_work')->nullable(); // お気に入りの作品
            $table->text('bio')->nullable(); // 自己紹介
            $table->boolean('is_public')->default(false); // プロフィールの公開設定
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('favorite_work');
            $table->dropColumn('bio');
            $table->dropColumn('is_public');
        });
    }
};

