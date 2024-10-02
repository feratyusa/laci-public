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
        Schema::create('locations', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->timestamps();
        });

        Schema::table('events', function(Blueprint $table) {
            $table->string('location_id')->nullable();
            $table->foreign('location_id')->on('locations')->references('id')->cascadeOnUpdate()->nullOnDelete();            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('events', function(Blueprint $table) {
            $table->dropForeign('events_location_id_foreign');
            $table->dropColumn('location_id');
        });

        Schema::dropIfExists('locations');

    }
};
