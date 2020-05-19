<?php

use App\Traits\ExtendFaker;
use App\Place;
use App\Vehicle;
use App\Customer;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();

        $this->call(EmployeeUserSeeder::class);
        $this->call(PlaceSeeder::class);
        $this->call(CustomerVehicleSeeder::class);
        $this->call(ParkingServiceSeeder::class);

        Schema::enableForeignKeyConstraints();
    }
}
