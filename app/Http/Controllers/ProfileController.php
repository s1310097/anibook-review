<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use App\Models\User;

class ProfileController extends Controller
{
    
    public function show($id)
    {
        $user = User::findOrFail($id);
        \Log::info('Showing user:', $user->toArray());

     return Inertia::render('Profile/MyProfile', [
            'user' => $user,
        ]);
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return Inertia::render('Profile/EditProfile', [
            'user' => $user,
        ]);
    }

    
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        \Log::info('Updating user:', $request->all());
        $user->update($request->only('name', 'favorite_work', 'bio', 'is_public'));
        \Log::info('Updated user:', $user->toArray());

        return Redirect::route('profile.show', ['id' => $user->id]);
    }

    public function destroy(Request $request)
    {
        $user = $request->user();
        Auth::logout();
        $user->delete();

        return Redirect::to('/');
    }
}