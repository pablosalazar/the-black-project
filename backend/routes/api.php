<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('auth')->group(function () {
    Route::post('login', 'Auth\LoginController@login');

    Route::group(['middleware' => 'auth:api'], function () {
        Route::get('logout', 'Auth\LoginController@logout');
    });
});

// Route::group(['middleware' => 'auth:api'], function () {
Route::resource('users', 'User\UserController', ['except' => ['create', 'edit']]);
Route::resource('employees', 'Employee\EmployeeController', ['except' => ['create', 'edit']]);
/**
 * Customers
 */
Route::resource('customers', 'Customer\CustomerController', ['except' => ['create', 'edit']]);
Route::resource('customers.vehicles', 'Customer\CustomerVehicleController', ['only' => ['index', 'store', 'destroy']]);

/**
 * Contacts
 */
// Route::resource('contacts', 'Contact\ContactController', ['except' => ['create', 'edit']]);

/**
 * Vehicles
 */
Route::resource('vehicles', 'Vehicle\VehicleController', ['except' => ['create', 'edit']]);
Route::resource('vehicles.customers', 'Vehicle\VehicleCustomerController', ['only' => ['index', 'store', 'destroy']]);

/**
 * Places
 */
Route::get('places/service-points', 'Place\PlaceController@getSevicePoints');
Route::resource('places', 'Place\PlaceController', ['except' => ['create', 'edit']]);


Route::resource('parking-services', 'ParkingService\ParkingServiceController', ['except' => ['create', 'edit']]);
Route::resource('parking-logs', 'ParkingLog\ParkingLogController', ['except' => ['create', 'edit']]);
Route::get('vehicles/search/term', 'Vehicle\VehicleController@searchByPlate');
Route::get('customers/search/term', 'Customer\CustomerController@searchByDocumentNumber');
// });

Route::post('oauth/token', '\Laravel\Passport\Http\Controllers\AccessTokenController@issueToken');
