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
        Schema::create('budgets', function (Blueprint $table) {
            $table->id();
            $table->integer('year')->unique();
            $table->decimal('value', 15, 0)->default(0);
            $table->timestamps();
        });

        Schema::create('budget_details', function (Blueprint $table){
            $table->id();
            $table->string('name');
            $table->decimal('value', 15, 0)->default(0);
            $table->foreignId('budget_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('budget_details');
        Schema::dropIfExists('budgets');
    }
};