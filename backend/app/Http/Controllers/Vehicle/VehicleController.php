<?php

namespace App\Http\Controllers\Vehicle;

use App\Vehicle;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class VehicleController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = Vehicle::all();

        return $this->showAll($vehicles);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Vehicle::validate($request);
        $vehicle = Vehicle::create($request->all());
        
        if ($request->has('customer_id')) {
            $customerId = $request->get('customer_id');
            $vehicle->customers()->attach($customerId);
        }

        return $this->showOne($vehicle);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Vehicle $vehicle)
    {
        $vehicle = Vehicle::with('customers')->findOrFail($vehicle->id);

        return $this->showOne($vehicle);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Vehicle $vehicle)
    {
        Vehicle::validate($request, $vehicle);

        $fields = $request->all();
        $vehicle->fill($fields);

        if ($vehicle->isDirty()) {
            $vehicle->save();            
        }

        return $this->showOne($vehicle);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();

        return $this->showOne($vehicle);
    }

    public function searchByPlate(Request $request)
    {
        $list = Vehicle::where('plate', 'LIKE', $request->q . '%')->with('customers')->get();
        return $this->showAll($list);
    }
}
