<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    /**
     * Login user and create token
     *
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     */
    public function login(Request $request)  {
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

        if(!Auth::attempt($credentials))
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
                'employee_id' => $user->employee->id,
                'full_name' => $user->employee->full_name,
                'job_title' => $user->employee->job_title,
                'role' => $user->role,
                'image' => $user->employee->photo,
            ],
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString()
        ]);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json([
            'message' => 'Sesion cerrada correctamente'
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
