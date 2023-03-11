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
            $table->unsignedBigInteger('institution_id')->primary();
            $table->string('institutionName');
            $table->string('InstitutionSector');
            $table->string('InstitutionField');
            $table->integer('institutionPhone')->unique();
            $table->string('managerEmail')->unique();
            $table->integer('managerPhone')->unique();
            $table->string('managerPosition');
            $table->string('fName');
            $table->string('lName');
            $table->longText('logo_url')->nullable();
            $table->tinyInteger('isActive')->default(0);
            $table->string('Region');
            $table->string('City');
            $table->timestamps();
            $table->foreign('institution_id')->references('id')->on('users')->cascadeOnDelete();
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
