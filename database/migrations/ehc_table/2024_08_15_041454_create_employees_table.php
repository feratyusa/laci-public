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
        Schema::connection('sqlite')->create('employees', function (Blueprint $table) {
            $table->string('nip')->primary();
            $table->string('nama');
            $table->string('jabatan');
            $table->string('cabang');
            $table->string('seksi');
            $table->string('jobfam');
            $table->string('eselon');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employees');
    }
};
