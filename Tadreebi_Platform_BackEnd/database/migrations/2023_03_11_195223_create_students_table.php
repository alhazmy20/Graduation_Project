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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('fName');
            $table->string('sName');
            $table->string('tName');
            $table->string('lName');
            $table->string('phone')->unique();
            $table->tinyInteger('gender');
            $table->integer('national_ID')->unique();
            $table->string('university');
            $table->string('college');
            $table->string('department');
            $table->string('major');
            $table->string('SCC');
            $table->double('GPA');
            $table->integer('GPA_Type');
            $table->foreignId('supervisor_id')->nullable()->constrained();
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
        Schema::dropIfExists('students');
    }
};
