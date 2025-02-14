<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\User;

class MyprofileController extends Controller
{
    public function index()
    {
        $profiles = User::all(); // ユーザーのプロフィール情報を取得

        return Inertia::render('Myprofile/Index', [
            'profiles' => $profiles,
        ]);
    }
}