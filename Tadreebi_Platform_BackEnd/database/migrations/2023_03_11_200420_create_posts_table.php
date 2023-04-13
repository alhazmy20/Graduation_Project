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
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('institution_id');
            $table->string('title');
            $table->longText('content');
            $table->string('t_type');
            $table->boolean('reward');
            $table->tinyInteger('gender');
            $table->string('region');
            $table->string('city');
            $table->date('t_startDate');
            $table->date('t_endDate');
            $table->date('p_endDate');
            $table->timestamps();
            $table->softDeletes();
            $table->foreign('institution_id')->references('id')->on('institutions')->cascadeOnDelete()->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
};
