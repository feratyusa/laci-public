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
        Schema::connection('local_ehc')->create('jenis_sertifikasi', function (Blueprint $table) {
            $table->id();
            $table->string("nama")->unique();
            $table->string("deskripsi")->nullable();
            $table->timestamps();
        });

        Schema::connection('local_ehc')->create('level_sertifikasi', function (Blueprint $table){
            $table->id();
            $table->foreignId('jenis_sertifikasi_id')->constrained('jenis_sertifikasi')->cascadeOnDelete();
            $table->string('level');
            $table->string('deskripsi')->nullable();
            $table->timestamps();
        });

        Schema::connection('local_ehc')->create('detail_sertifikasi', function (Blueprint $table){
            $table->id();
            $table->foreignId('level_sertifikasi_id')->constrained('level_sertifikasi')->cascadeOnDelete();
            $table->string('kursus_id')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('detail_sertifikasi');
        Schema::dropIfExists('level_sertifikasi');
        Schema::dropIfExists('jenis_sertifikasi');
    }
};
