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
            $table->unsignedBigInteger('student_id')->primary();
            $table->string('fName');
            $table->string('sName');
            $table->string('tName');
            $table->string('lName');
            $table->integer('Phone');
            $table->tinyInteger('Gender');
            $table->integer('National_ID');
            $table->string('University');
            $table->string('Major');
            $table->integer('SCC');
            $table->double('GPA');
            $table->integer('GPA_Type');
            $table->longText('CV_url')->nullable();
            $table->longText('InternshipLetter_url')->nullable();
            $table->longText('NationalID_url')->nullable();
            $table->longText('personalPicture_url')->nullable();
            $table->timestamps();
            $table->foreign('student_id')->references('id')->on('users')->cascadeOnDelete();
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
