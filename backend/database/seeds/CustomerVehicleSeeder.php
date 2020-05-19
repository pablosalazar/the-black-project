<?php

use App\Vehicle;
use App\Customer;
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
        Customer::truncate();
        DB::table('customer_vehicle')->truncate();

        $customerQuantity = 20;
        $vehicleQuantity = 40;

        $customerFake = Customer::create([
            'name' => 'Juan Pablo Salazar Restrepo',
            'document_type' => 'CC',
            'document_number' => '1061701570',
            'phone' => '3105160145',
        ]);

        $vehicleFake = Vehicle::create([
            'brand' => 'CHEVROLET',
            'plate' => 'IEL52E',
            'color' => 'AZUL',
        ]);

        $vehicleFake->customers()->attach($customerFake);

        factory(Customer::class, $customerQuantity)->create()->each(
            function ($customer) {
                $vehicle = factory(Vehicle::class)->create();
                $customer->vehicles()->attach($vehicle);
            }
        );

        Schema::enableForeignKeyConstraints();
    }
}
