<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ParkingService extends Model
{
    const STATUS = [
        'ACTIVE' => 'ACTIVO',
        'ANNULLED' => 'ANULADO',
        'CANCELED' => 'CANCELADO',
        'SUCCESSED' => "EXITOSO",
        'VIP' => "VIP",
    ];



    protected $fillable = [
        'serial',
        'customer_id',
        'vehicle_id',
        'service_point_id',
        'place_id',
        'customer_signing',
        'parking_lot',
        'photos',
        'total',
        'status',
        'observations',
    ];

    protected $filters = [
        'serial'
    ];

    public static function validate($request)
    {
        $rules = [
            'serial' => 'required',
            'customer_id' => 'required',
            'vehicle_id' => 'required',
            'service_point_id' => 'required',
        ];
        $request->validate($rules);
    }

    public function customer()
    {
        return $this->hasOne('App\Customer');
    }

    public function vehicle()
    {
        return $this->hasOne('App\Vehicle');
    }

    public function place()
    {
        return $this->hasOne('App\Place');
    }
}
