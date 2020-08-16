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
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public static function validate($request)
    {
        $rules = [
            'user_id' => 'required'
        ];
        $request->validate($rules);
    }
}
