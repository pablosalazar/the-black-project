<?php

use App\User;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('code')->nullable();
            $table->string('photo')->nullable();
            $table->string('firstname');
            $table->string('lastname');
            $table->enum('gender', ['Hombre', 'Mujer'])->nullable();
            $table->string('birthdate')->nullable();
            $table->string('document_type');
            $table->string('document_number');
            $table->string('nacionality')->nullable();
            $table->string('phone')->nullable();
            $table->string('address')->nullable();

            $table->string('username')->unique()->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('password')->nullable();
            $table->string('role');
            $table->string('active')->default(User::ACTIVE_USER);

            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
