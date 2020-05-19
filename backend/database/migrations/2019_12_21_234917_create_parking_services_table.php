<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParkingServicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_services', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('serial');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('vehicle_id');
            $table->unsignedBigInteger('service_point_id');
            $table->unsignedBigInteger('place_id')->nullable();
            $table->string('parking_lot')->nullable();
            $table->string('customer_signing')->nullable();
            $table->string('status')->nullable();
            $table->string('photos')->nullable();
            $table->integer('total')->default(0);
            $table->string('observations')->nullable();
            $table->timestamps();

            $table->foreign('customer_id')->references('id')->on('customers');
            $table->foreign('vehicle_id')->references('id')->on('vehicles');
            $table->foreign('place_id')->references('id')->on('places');
            $table->foreign('service_point_id')->references('id')->on('places');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parking_services');
    }
}
