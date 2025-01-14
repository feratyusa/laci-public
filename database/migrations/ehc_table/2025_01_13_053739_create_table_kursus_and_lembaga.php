<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('sqlite')->create('kursus', function (Blueprint $table) {
            $table->string('Sandi');
            $table->string('Lengkap');
            $table->string('tempat')->nullable();
            $table->string('npublic')->nullable();
            $table->string('nlini')->nullable();
            $table->string('nsektor')->nullable();
            $table->string('sertifikat')->nullable();
            $table->string('bsmr')->nullable();
            $table->string('nskill')->nullable();
        });

        Schema::connection('sqlite')->create('lembaga', function(Blueprint $table) {
            $table->string('sandi');
            $table->string('lengkap');
            $table->string('cp')->nullable();
            $table->string('nope')->nullable();
        });

        Schema::connection('sqlite')->create('kelkursus', function(Blueprint $table){
            $table->string('lini');
            $table->string('sektor');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kursus');
        Schema::dropIfExists('lembaga');
        Schema::dropIfExists('kelkursus');
    }
};
