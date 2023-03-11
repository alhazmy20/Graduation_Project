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
            $table->string('Title');
            $table->longText('Content');
            $table->string('T_type');
            $table->tinyInteger('Reward');
            $table->tinyInteger('Gender');
            $table->string('Region');
            $table->string('City');
            $table->date('t_startDate');
            $table->date('t_endDate');
            $table->date('p_endDate');
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
        Schema::dropIfExists('posts');
    }
};
