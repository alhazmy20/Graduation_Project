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
        Schema::create('student_files', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->longText('transcript_filename')->nullable();
            $table->longText('transcript_url')->nullable();
            $table->longText('CV_filename')->nullable();
            $table->longText('CV_url')->nullable();
            $table->longText('internshipLetter_filename')->nullable();
            $table->longText('internshipLetter_url')->nullable();
            $table->longText('nationalID_filename')->nullable();
            $table->longText('nationalID_url')->nullable();
            $table->longText('personalPicture_filename')->nullable();
            $table->longText('personalPicture_url')->nullable();
            $table->foreign('student_id')->references('id')->on('students')->cascadeOnDelete()->cascadeOnUpdate();
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
        Schema::dropIfExists('student_files');
    }
};
