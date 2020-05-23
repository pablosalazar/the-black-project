<?php

namespace App\Http\Controllers\Vehicle;

use App\Vehicle;
use App\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class VehicleCustomerController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Vehicle $vehicle)
    {
        $customers = $vehicle->customers;

        return $this->showAll($customers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Vehicle $vehicle)
    {
        $rules=[
            'customer_id' => 'required'
        ];
        $request->validate($rules);

        $customerId = $request->get('customer_id');

        if ($vehicle->customers()->find($customerId)) {
            return $this->errorResponse('El cliente ya se encuentra asociado a este vehículo.', 400);
        }

        $vehicle->customers()->attach($customerId);

        return $this->showAll($vehicle->customers);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle, Customer $customer)
    {
        if (!$vehicle->customers()->find($customer->id)) {
            return $this->errorResponse('El cliente especificado no está asociado a este vehículo.', 404);
        }

        $vehicle->customers()->detach([$customer->id]);

        return $this->showAll($vehicle->customers);
    }
}
