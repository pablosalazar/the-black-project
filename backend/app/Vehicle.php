<?php

namespace App;

use App\Customer;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'brand',
        'plate',
        'color'
    ];

    protected $filters = [
        'plate', 'brand', 'color'
   ];

    public static function validate($request, $vehicle = null)
    {
        $rules=[
            'brand' => 'required',
            'plate' => $vehicle ? 'required|unique:vehicles,plate,'.$vehicle->id : 'required|unique:vehicles',
            'color' => 'required',
        ];
        $request->validate($rules);
    }

    public function setPlateAttribute($value)
    {
        $this->attributes['plate'] = mb_convert_case($value, MB_CASE_UPPER, "UTF-8");
    }

    public function getFilters()
    {
        return $this->filters;
    }

    public function customers()
    {
        return $this->belongsToMany(Customer::class);
    }
}
