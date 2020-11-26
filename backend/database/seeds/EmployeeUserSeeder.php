<?php

use App\User;
use App\Vehicle;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class EmployeeUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $quantity = 30;

        Schema::disableForeignKeyConstraints();
        User::truncate();

        User::create([
            'code' => '0012',
            'photo' => '',
            'firstname' => 'Juan Pablo',
            'lastname' => 'Salazar Restrepo',
            'gender' => 'Hombre',
            'birthdate' => '2000-01-01',
            'document_type' => 'CC',
            'document_number' => '1000000',
            'nacionality' => 'Colombiana',
            'phone' => '3104160145',
            'address' => 'Calle falsa #123',
            'username'  => 'admin',
            'email'  => 'admin@theblackps.com',
            'password'  => bcrypt('secret'),
            'role'  => 'Administrador',
            'active'  => User::ACTIVE_USER,
        ]);

        $this->command->info('- Usuario administrador registrado.');

        factory(App\User::class, $quantity)->create()->each(function ($employee) {
            $employee->save();
        });

        $this->command->info('- Usuario de tipo empleados de ejemplo registrados.');

        Schema::enableForeignKeyConstraints();
    }
}
