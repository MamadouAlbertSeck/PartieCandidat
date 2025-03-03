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
    Schema::create('candidats', function (Blueprint $table) {
        $table->id();
        $table->string('numero_carte')->unique();
        $table->string('nom');
        $table->string('prenom');
        $table->date('date_naissance');
        $table->string('email')->nullable();
        $table->string('telephone')->nullable();
        $table->string('parti_politique')->nullable();
        $table->string('slogan')->nullable();
        $table->string('photo')->nullable();
        $table->string('couleur1')->nullable();
        $table->string('couleur2')->nullable();
        $table->string('couleur3')->nullable();
        $table->string('url_infos')->nullable();
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
        Schema::dropIfExists('candidats');
    }
};
