<?php

namespace App;

use Carbon\Carbon;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    const ACTIVE_USER = 'true';
    const INACTIVE_USER = 'false';

    protected $dates = ['deleted_at'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'email',
        'password',
        'active',
        'role',
        'employee_id'
    ];

    protected $filters = [
         'email', 'role'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public static function validate($request, $user=null)
    {
        $rules=[
            'username' => $user ? 'required|unique:users,username,'.$user->id : 'required|unique:users',
            'email' => $user ? 'required|email|unique:users,email,'.$user->id : 'required|email|unique:users',
            'password' => 'sometimes|required|min:6',
            'active' => 'required',
            'role' => 'required',
            'employee_id' => 'required'
        ];
        $request->validate($rules);
    }

    public function getFilters()
    {
        return $this->filters;
    }

    public function isActive()
    {
        return $this->active == User::ACTIVE_USER;
    }

    public function employee()
    {
        return $this->belongsTo('App\Employee');
    }
}
