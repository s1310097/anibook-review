<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 
        'title',      // 🔹 作品タイトル
        'work_id',    // 🔹 APIから取得した作品ID
        'work_type',  // 🔹 作品の種類（anime / book）
        'image_url',  // 🔹 作品画像URL
        'review_text',
        'is_public',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
