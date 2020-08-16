<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Traits\ExtendFaker;
use App\User;
use App\Employee;
use App\Customer;
use App\Vehicle;
use App\Place;
use Illuminate\Support\Str;
use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    $extendfaker  = new extendfaker();
    $timeStampRange = rand(20070120, 966841320);
    $gender = $faker->randomElement(['Hombre', 'Mujer']);
    return [
        'code' => Str::random(10),
        'photo' => NULL,
        'name' => $gender == 'Hombre' ? $extendfaker->generate_name_men() . ' ' . $extendfaker->generate_lastname() : $extendfaker->generate_name_woman() . ' ' . $extendfaker->generate_lastname(),
        'gender' => $gender,
        'birthdate' => date('Y-m-d', $timeStampRange),
        'document_type' => $faker->randomElement(['CC', 'CE', 'TI']),
        'document_number' => $faker->unique()->passthrough(mt_rand(1000000, 9999999)),
        'nacionality' => $faker->randomElement(['Colombiana', 'Venezolana', 'Peruana', 'Ecuatoriana']),
        'phone' => $faker->PhoneNumber,
        'address' => $faker->address,
        'username' => $faker->unique()->userName,
        'email' => $faker->unique()->safeEmail,
        'password' => bcrypt('secret'), // password
        'role' => $faker->randomElement(['Administrativo', 'Analista', 'Jefe de operaciones', 'Coordinador logistico', 'Supervisor', 'Lider de punto', 'Operario']),
        'active' => User::ACTIVE_USER,
        'remember_token' => Str::random(10),
    ];
});

$factory->define(Customer::class, function (Faker $faker) {
    return [
        'name' => $faker->name,
        'phone' => $faker->PhoneNumber,
        'document_number' => $faker->unique()->numberBetween($min = 10000000, $max = 90000000),
        'document_type' => $faker->randomElement(['CC', 'CE', 'TI']),
    ];
});

$factory->define(Vehicle::class, function (Faker $faker) {
    return [
        'brand' => $faker->randomElement(['MAZDA', 'KIA', 'TOYOTA', 'CHEVROLET']),
        'plate' => $faker->regexify('[A-Z]{3}[0-9]{2}[A-Z]{1}'),
        'color' => $faker->randomElement(['AZUL', 'ROJO', 'NEGRO', 'BLANCO', 'GRIS', 'AMARILLO', 'VERDE']),
    ];
});
