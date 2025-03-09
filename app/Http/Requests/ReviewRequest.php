<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ReviewRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true; // 認証ロジックを追加する場合はここに記述
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'review_text' => ['required', 'string', 'max:1000'],
            'is_public' => ['boolean'],
            'work_id' => ['required', 'string', 'max:255'],
            'work_type' => ['required', 'string', Rule::in(['anime', 'book'])],
            'image_url' => ['nullable', 'url', 'max:255'],
        ];
    }
}