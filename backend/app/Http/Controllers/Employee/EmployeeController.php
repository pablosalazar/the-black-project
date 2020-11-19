<?php

namespace App\Http\Controllers\Employee;

use App\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Controller;
use Image;
use File;

class EmployeeController extends ApiController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $employees = Employee::all();

        return $this->showAll($employees);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        Employee::validate($request);

        $fields = $request->all();
        $employee = Employee::create($fields);

        if ($request->file('photo')) {
            $this->savePhoto($employee, $request->file('photo'));
        }

        return $this->showOne($employee, "Empleado guardado con exito", 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Employee $employee)
    {
        $employee = $employee->load('user')->load('contact');
        return $employee;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Employee $employee)
    {
        Employee::validate($request, $employee);

        $fields = $request->all();
        $employee->fill($fields);

        if ($employee->isDirty() || $request->file('photo')) {
            if ($request->file('photo')) {

                $currentPhoto = glob(public_path('img/employees/') . $employee->document_number .  '-' . '*');

                $savePhotoSuccess = $this->savePhoto($employee, $request->file('photo'));

                if ($savePhotoSuccess) {
                    $this->deleteCurrentPhoto($employee, $currentPhoto);
                } else {
                    return $this->errorResponse('No se pudo actualizar la foto del usuario, por favor intente más tarde', 422);
                }
            }

            $employee->save();
        }

        return $this->showOne($employee->load('user')->load('contact'), 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Employee $employee)
    {
        $employee->delete();

        return $this->showOne($employee);
    }

    /**
     * Save profile employee photo.
     *
     * @param  Model  $employee
     * @param  File  $file
     * @return Boolean
     */

    private function savePhoto($employee, $file)
    {
        $filename = $employee->document_number .  '-' . time() .  ".jpg";
        $image = Image::make($file)->widen(300)->encode('jpg', 75);
        $imageSaved = $image->save(public_path('img/employees/') . $filename);

        if ($imageSaved->filename) {
            $employee->photo = $filename;
            $employee->save();
            return true;
        }

        return false;
    }

    /**
     * Save profile employee photo.
     *
     * @param  Model  $employee
     * @param  Array  $currentPhoto
     */
    private function deleteCurrentPhoto($employee, $currentPhoto)
    {
        if ($currentPhoto) {
            if (File::exists($currentPhoto[0])) {
                unlink($currentPhoto[0]);
            }
        }
    }
}
