<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Ramsey\Uuid\Uuid;
use Symfony\Component\HttpFoundation\Response;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->get('email', '_'))->first();
        if ($user === null || !Hash::check($request->get('password'), $user->getAuthPassword())) {
            return response('Invalid credentials', Response::HTTP_UNAUTHORIZED);
        }

        return $user->createToken(Uuid::uuid4().$user->email);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
    }
}
