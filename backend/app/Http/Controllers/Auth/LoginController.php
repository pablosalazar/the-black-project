<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'login'       => 'required|string',
            'password'    => 'required|string',
            'remember_me' => 'boolean',
        ]);

        $field = $this->findUsername();

        $credentials = [
            $field => $request->login,
            'password' => $request->password
        ];

        if (!Auth::attempt($credentials))
            return response()->json([
                'error' => 'Usuario o contraseña no válidos'
            ], 404);

        $user = $request->user();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;

        if ($request->remember_me) {
            $token->expires_at = Carbon::now()->addWeeks(1);
        }

        $token->save();

        return response()->json([
            'user' => [
                'name' => $user->name,
                'role' => $user->role,
                'photo' => $user->photo,
            ],
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Sesion cerrada correctamente'
        ]);
    }

    public function verify(Request $request)
    {

        $user = $request->user();
        return response()->json([
            'user' => [
                'name' => $user->name,
                'role' => $user->role,
                'photo' => $user->photo,
            ],
        ]);
    }

    private function findUsername()
    {
        $login = request()->input('login');
        $fieldType = filter_var($login, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        request()->merge([$fieldType => $login]);
        return $fieldType;
    }
}
