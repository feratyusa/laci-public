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
        Schema::create('nugies', function(Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('created_by')->default(null);
            $table->timestamps();
        });
        
        Schema::create('nugie_details', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('nugie_id')->constrained()->cascadeOnDelete();
            $table->string('kd_kursus');            
            $table->boolean('is_sql')->default(1);            
            $table->string('sql')->nullable()->default(null);
            $table->timestamps();
        });

        Schema::create('nugie_rules', function(Blueprint $table) {
            $table->id();
            $table->foreignId('nugie_detail_id')->constrained()->cascadeOnDelete();
            $table->integer('index');
            $table->integer('child');
            $table->string('prefix')->nullable()->default(null);
            $table->string('column');
            $table->string('verb');
            $table->string('parameter');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nugie_rules');
        Schema::dropIfExists('nugie_details');
        Schema::dropIfExists('nugies');
    }
};
