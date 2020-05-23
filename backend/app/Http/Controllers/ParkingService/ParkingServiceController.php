<?php

namespace App\Http\Controllers\ParkingService;

use App\ParkingLog;
use App\ParkingService;
use App\ParkingServiceView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\ApiController;

class ParkingServiceController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parkingServices = ParkingServiceView::all();
        return $this->showAll($parkingServices);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $totalRegisters = ParkingService::count();
        $request['serial'] = $totalRegisters;

        $parkingService = null;
        DB::transaction(function () use ($request, &$parkingService) {
            ParkingService::validate($request);
            $parkingService = ParkingService::create($request->all());

            $employee_id = $request->get('employee_id');
            $parkingLog = [
                'parking_service_id' => $parkingService->id,
                'action' => 'REGISTRO',
                'employee_responsable_id' => $employee_id,
                'employee_registrant_id' => $employee_id,
            ];

            $request->merge($parkingLog);

            ParkingLog::validate($request);

            ParkingLog::create($parkingLog);
        });

        return $this->showOne($parkingService);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(ParkingService $parkingService)
    {
        return $this->showOne($parkingService->load('customer')->load('vehicle')->load('place'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ParkingService $parkingService)
    {
        ParkingService::validate($request);

        $parkingService->fill($request->all());

        if ($parkingService->isDirty()) {
            $parkingService->save();
        }

        return $this->showOne($parkingService->load('customer')->load('vehicle')->load('place'), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingService $parkingService)
    {
        $parkingService->delete();

        return $this->showOne($parkingService);
    }
}
