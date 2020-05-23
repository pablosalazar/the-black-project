<?php

namespace App\Http\Controllers\ParkingLog;

use App\ParkingLog;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class ParkingLogController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parkingLogs = ParkingLog::all();

        return $this->showAll($parkingLogs);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        ParkingLog::validate($request);

        $parkingLog = Employee::create($request->all());

        return $this->showOne($parkingLog, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ParkingLog $parkingLog)
    {
        return $this->showOne($parkingLog->load('parkingService'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ParkingLog $parkingLog)
    {
        ParkingLog::validate($request, $parkingLog);

        $parkingLog->fill($request->all());

        if ($parkingLog->isDirty()){
            $parkingLog->save();
        }

        return $this->showOne($parkingLog->load('parkingService')->load('employee'), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingLog $parkingLog)
    {
        $parkingLog->delete();

        return $this->showOne($parkingLog);
    }
}
