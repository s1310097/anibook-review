<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        \Log::info('Accessing dashboard');
        return Inertia::render('Dashboard');
    }
}