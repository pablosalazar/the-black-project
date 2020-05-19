<?php

use App\User;
use App\Employee;
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
        $quantity = 10;

        Schema::disableForeignKeyConstraints();
        Employee::truncate();
        User::truncate();

        Employee::create([
            'code' => 'ADMIN01',
            'photo' => 'default.png',
            'first_name' => 'Pedro',
            'last_name' => 'Pérez',
            'gender' => 'Hombre',
            'birthdate' => '2000-01-01',
            'document_type' => 'CC',
            'document_number' => '1000000',
            'nacionality' => 'Colombiana',
            'phone' => '3104160145',
            'address' => 'Calle falsa #123',
            'job_title' => 'Web Admin',
        ]);

        User::create([
            'username'  => 'admin',
            'email'  => 'admin@theblackps.com',
            'password'  => bcrypt('secret'),
            'active'  => User::ACTIVE_USER,
            'role'  => 'admin',
            'employee_id' => 1
        ]);

        $this->command->info('- Usuario administrador registrado.');

        factory(App\Employee::class, $quantity)->create()->each(function ($employee) {
            $employee->user()->save(factory(App\User::class)->make());
        });

        $this->command->info('- Empleados y usuarios de ejemplo registrados.');


        Schema::enableForeignKeyConstraints();
    }
}
