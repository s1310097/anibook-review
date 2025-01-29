<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class MyprofileController extends Controller
{
    public function index()
    {
        return Inertia::render('Myprofile/Index', []);
    }
}
