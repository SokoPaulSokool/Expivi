<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoModelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('user_id')->unsigned();
            $table->string('slug');
            $table->string('name');
            $table->string('category', 16);
            $table->string('license', 16);
            $table->string('avatar');
            $table->integer('vertices')->unsigned();
            $table->integer('downloads')->unsigned();
            $table->text('description');
            $table->foreign('user_id')->references('id')->on('users');
            $table->unique(['user_id', 'slug'], 'UNIQUE_SLUG_PER_USER');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('info');
    }
}
