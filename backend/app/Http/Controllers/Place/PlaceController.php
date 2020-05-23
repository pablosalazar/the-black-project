<?php

namespace App\Http\Controllers\Place;

use App\Place;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;

class PlaceController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = Place::select('id', 'name')
            ->where('category', '!=', 'PUNTO DE SERVICIO')
            ->get();
            

        return $list;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Place::validate($request);

        $place = Place::create($request->all());

        return $this->showOne($place);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Place $place)
    {
        return $this->showOne($place);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Place $place)
    {
        Place::validate($request);

        $place->fill($request->all());

        if ($place->isDirty()){
            $place->save();
        }

        return $this->showOne($place, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Place $place)
    {
        $place->delete();

        return $this->showOne($place);
    }

    public function getSevicePoints() {
        $list = Place::select('id', 'name')
            ->where('category', 'PUNTO DE SERVICIO')
            ->get();
        return $list;
    }
}
