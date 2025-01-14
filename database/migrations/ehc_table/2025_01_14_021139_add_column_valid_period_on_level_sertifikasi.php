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
        Schema::connection('sqlite')->table('level_sertifikasi', function(Blueprint $table) {
            $table->integer('masa_berlaku_tahun')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('sqlite')->table('level_sertifikasi', function(Blueprint $table){
            $table->dropColumn('masa_berlaku_tahun');
        });
    }
};
