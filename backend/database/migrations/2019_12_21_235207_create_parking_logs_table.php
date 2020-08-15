<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParkingLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parking_logs', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('parking_service_id');
            $table->string('action');
            $table->unsignedBigInteger('employee_responsable_id');
            $table->unsignedBigInteger('employee_registrant_id');
            $table->softDeletes();
            $table->timestamps();

            $table->foreign('parking_service_id')->references('id')->on('parking_services');
            $table->foreign('employee_responsable_id')->references('id')->on('users');
            $table->foreign('employee_registrant_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('parking_logs');
    }
}
