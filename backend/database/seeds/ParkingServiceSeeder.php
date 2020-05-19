<?php

use App\Place;
use App\Vehicle;
use Carbon\Carbon;
use App\ParkingService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class ParkingServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        ParkingService::truncate();

        $vehicles = Vehicle::all();
        $service_points = Place::where('category', 'PUNTO DE SERVICIO')->get();
        $places = Place::where('category', '!=', 'PUNTO DE SERVICIO')->get();
        $vehicles->each(function ($vehicle, $key) use ($service_points, $places) {
            $customer_id =  $vehicle->customers[0]->id;
            $service_point_id = $service_points->pluck('id')->random();
            $place_id = $places->pluck('id')->random();
            if ($key == 0) {
                $date_random = Carbon::now();
            } elseif ($key == 1) {
                $date_random = Carbon::now()->subDays(1);
            } else {
                $date_random = Carbon::now()->subDays(mt_rand(0, 365))->subMinutes(mt_rand(0, 720));
            }


            ParkingService::create([
                'serial' => $key,
                'customer_id' => $customer_id,
                'vehicle_id' => $vehicle->id,
                'service_point_id' => $service_point_id,
                'place_id' => $place_id,
                'status' => ParkingService::STATUS[array_rand(ParkingService::STATUS)],
                'created_at' => $date_random,
                'updated_at' => $date_random,
            ]);

            $date_random = null;
        });


        $this->command->info('- Servicios de valet parking registrados');
        Schema::enableForeignKeyConstraints();
    }
}
