<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Contact extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name',
        'relationship',
        'phone',
        'employee_id',
    ];

    public function employee()
    {
        return $this->belongsTo('App\Employee');
    }

    public static function validate($request)
    {
        $rules=[
            'employee_id' => 'required'
        ];
        $request->validate($rules);
    }

    
}
