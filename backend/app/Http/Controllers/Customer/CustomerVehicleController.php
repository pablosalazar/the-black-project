<?php

namespace App\Http\Controllers\Customer;

use App\Vehicle;
use App\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class CustomerVehicleController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Customer $customer)
    {
        $vehicles = $customer->vehicles;

        return $this->showAll($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Customer $customer)
    {
        $rules=[
            'vehicle_id' => 'required'
        ];
        $request->validate($rules);

        $vehicleId = $request->get('vehicle_id');

        if ($customer->vehicles()->find($vehicleId)) {
            return $this->errorResponse('El vehículo ya se encuentra asociado a este cliente.', 400);
        }
        $customer->vehicles()->attach($vehicleId);

        return $this->showAll($customer->vehicles);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer, Vehicle $vehicle)
    {
        if (!$customer->vehicles()->find($vehicle->id)) {
            return $this->errorResponse('El vehículo especificado no está asociado a este cliente.', 404);
        }

        $customer->vehicles()->detach([$vehicle->id]);

        return $this->showAll($customer->vehicles);
    }
}
