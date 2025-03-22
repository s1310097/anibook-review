<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ReviewFactory extends Factory
{
    protected $model = Review::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(),
            'title' => $this->faker->sentence,
            'work_id' => $this->faker->uuid,
            'work_type' => $this->faker->randomElement(['anime', 'book']),
            'image_url' => $this->faker->imageUrl,
            'review_text' => $this->faker->paragraph,
            'is_public' => $this->faker->boolean,
        ];
    }
}