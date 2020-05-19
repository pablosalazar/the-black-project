<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Place extends Model
{
    protected $fillable = [
        'name',
        'category',
        'zone'
    ];

    protected $filters = [
        'name',
        'category'
    ];

    public static function validate($request)
    {
        $rules=[
            'name' => 'required',
            'category' => 'required'
        ];
        $request->validate($rules);
    }
}
