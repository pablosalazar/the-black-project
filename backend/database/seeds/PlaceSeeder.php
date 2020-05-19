<?php

use App\Place;
use Data\PlacesData;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;


class PlaceSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Place::truncate();

        $servicePoints = PlacesData::$servicePoints;

        foreach ($servicePoints as $servicePoint) {
            Place::create([
                'name' => $servicePoint,
                'category'  => 'PUNTO DE SERVICIO',
            ]);
        }

        $this->command->info('- Puntos de servicios registrados.');

        $places = PlacesData::$places;
        foreach ($places as $place) {
            Place::create([
                'name' => $place['name'],
                'category'  => $place['category'],
            ]);
        }

        $this->command->info('- Establecimientos registrados.');

        Schema::enableForeignKeyConstraints();
    }
}
