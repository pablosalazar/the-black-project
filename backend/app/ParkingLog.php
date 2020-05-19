<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingLog extends Model
{
    protected $fillable = [
        'parking_service_id',
        'action',
        'employee_responsable_id',
        'employee_registrant_id'
    ];

    protected $filters = [
        'parking_service_id',
        'action',
        'employee_responsable_id',
        'employee_registrant_id'
   ];

   public static function validate($request)
    {
        $rules=[
            'parking_service_id' => 'required',
            'action' => 'required',
            'employee_responsable_id' => 'required',
            'employee_registrant_id' => 'required'
        ];
        $request->validate($rules);
    }

    public function parkingService()
    {
        return $this->hasOne('App\ParkingService');
    }

    public function employee()
    {
        return $this->hasOne('App\Employee');
    }
}
