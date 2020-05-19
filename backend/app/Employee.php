<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'code',
        'photo',
        'first_name',
        'last_name',
        'gender',
        'birthdate',
        'document_type',
        'document_number',
        'nacionality',
        'phone',
        'address',
        'job_title'
    ];

    protected $filters = [
        'code', 'name', 'full_name', 'document_number', 'job_title'
    ];

    public static function validate($request, $employee=null)
    {
        $rules=[
            'code' => $employee ? 'required|unique:employees,code,'.$employee->id : 'required|unique:employees',
            'first_name' => 'required',
            'last_name' => 'required',
            'gender' => 'required',
            'birthdate' => 'required',
            'document_type' => 'required',
            'document_number' => $employee ? 'required|unique:employees,document_number,'.$employee->id : 'required|unique:employees',
            'job_title' => 'required',
        ];
        $request->validate($rules);
    }

    public function getFilters()
    {
        return $this->filters;
    }

    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function contact()
    {
        return $this->hasOne('App\Contact');
    }

    public function setFirstNameAttribute($value)
    {
        $this->attributes['first_name'] = mb_convert_case($value, MB_CASE_TITLE, "UTF-8");
    }

    public function setLastNameAttribute($value)
    {
        $this->attributes['last_name'] = mb_convert_case($value, MB_CASE_TITLE, "UTF-8");
    }

    public function getFullNameAttribute()
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function setBirthdayAttribute($value)
    {
        $this->attributes['birthday'] = Carbon::parse($value)->format('Y-m-d');
    }
}
