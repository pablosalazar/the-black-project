<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Migrations\Migration;

class CreateParkingServicesView extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('
            CREATE VIEW parking_services_view
            AS 
            SELECT parking_services.id, serial, vehicles.plate, vehicles.color, vehicles.brand, 
            customers.name as customer,  customers.document_number, status, service_points.name AS service_point, 
            places.name AS place, parking_services.created_at, parking_services.updated_at
            FROM parking_services 
            INNER JOIN customers ON parking_services.customer_id = customers.id
            INNER JOIN vehicles ON parking_services.vehicle_id = vehicles.id
            INNER JOIN places as service_points ON parking_services.service_point_id = service_points.id
            INNER JOIN places ON parking_services.place_id = places.id
            ORDER BY created_at DESC, updated_at DESC
        ');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW IF EXISTS parking_services_view');
    }
}
