<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('institutions', function (Blueprint $table) {
            $table->id();
            $table->string('institutionName');
            $table->string('institutionSector');
            $table->string('institutionField');
            $table->string('institutionPhone')->unique();
            $table->string('managerEmail')->unique();
            $table->string('managerPhone')->unique();
            $table->string('managerPosition');
            $table->string('fName');
            $table->string('lName');
            $table->longText('logo_filename')->nullable();
            $table->longText('logo_url')->nullable();
            $table->boolean('isActive')->default(0);
            $table->string('region');
            $table->string('city');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('id')->references('id')->on('users')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('institutions');
    }
};
