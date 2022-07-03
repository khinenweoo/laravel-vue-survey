<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|string|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)->mixedCase()->numbers()->symbols()
            ]
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => \bcrypt($data['password'])
        ]);

        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email|string|exists:users,email',
            'password' => [
                'required',
            ],
            'remember' => 'boolean'
        ]);

        //take out the remember in a separate variable and unset it from credentials
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);

        if (!Auth::attempt($credentials, $remember)) {
            //if credentials incorrect it's gonna return false,
            // it's okay the user can authorized with the corresponding remember me value
             return response([
                'error' => 'The Provided credentials are not correct'
             ], 422);
             //422 means that the validation was not successfully passed
        }

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    public function logout()
    {
        //get the current user auth
        $user = Auth::user();

        //Revoke the token that was used to authenticate the current request
        $user->currentAccessToken()->delete();

        return response([
            'success' => true
        ]);
    }
}
