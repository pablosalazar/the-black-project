<?php

use App\Vehicle;
use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CustomerVehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        Vehicle::truncate();
        DB::table('user_vehicle')->truncate();

        $customerQuantity = 20;

        $customerFake = User::create([
            'name' => 'Juan Pablo Salazar Restrepo',
            'document_type' => 'CC',
            'document_number' => '1061701570',
            'phone' => '3105160145',
            'role' => 'Cliente',
            'active' => User::INACTIVE_USER,
        ]);

        $vehicleFake = Vehicle::create([
            'brand' => 'CHEVROLET',
            'plate' => 'IEL52E',
            'color' => 'AZUL',
        ]);

        $vehicleFake->users()->attach($customerFake);

        factory(User::class, $customerQuantity)->create([
            'code' => NULL,
            'photo' => NULL,
            'birthdate' => NULL,
            'nacionality' => NULL,
            'username' => NULL,
            'email' => NULL,
            'password' => NULL, // password
            'role' => 'Cliente',
            'active' => User::INACTIVE_USER,
            'remember_token' => NULL,
        ])->each(
            function ($customer) {
                $vehicle = factory(Vehicle::class)->create();
                $customer->vehicles()->attach($vehicle);
            }
        );

        Schema::enableForeignKeyConstraints();
    }
}
