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
        'code',
        'photo',
        'name',
        'gender',
        'birthdate',
        'document_type',
        'document_number',
        'nacionality',
        'phone',
        'address',
        'username',
        'email',
        'password',
        'active',
        'role',
    ];

    protected $filters = [
        'code', 'name', 'document_number', 'email', 'role'
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

    public static function validate($request, $user = null)
    {
        $rules = [
            'code' => $user ? 'unique:users,code,' . $user->id : 'required|unique:users',
            'name' => 'required',
            'document_type' => 'required',
            'document_number' => $user ? 'required|unique:employees,document_number,' . $user->id : 'required|unique:employees',
            'username' => $user ? 'unique:users,username,' . $user->id : 'unique:users',
            'email' => $user ? 'email|unique:users,email,' . $user->id : 'email|unique:users',
            'password' => 'sometimes|required|min:6',
            'active' => 'required',
            'role' => 'required',
        ];
        $request->validate($rules);
    }

    public function getFilters()
    {
        return $this->filters;
    }

    public function contact()
    {
        return $this->hasOne('App\Contact');
    }

    public function vehicles()
    {
        return $this->belongsToMany(Vehicle::class);
    }

    public function setNameAttribute($value)
    {
        $this->attributes['name'] = mb_convert_case($value, MB_CASE_TITLE, "UTF-8");
    }

    public function setBirthdayAttribute($value)
    {
        $this->attributes['birthday'] = Carbon::parse($value)->format('Y-m-d');
    }

    public function isActive()
    {
        return $this->active == User::ACTIVE_USER;
    }
}
