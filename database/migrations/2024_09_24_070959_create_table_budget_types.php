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
        Schema::create('budget_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('budget_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('budget_id')->constrained()->cascadeOnDelete();
            $table->foreignId('budget_type_id')->constrained();
            $table->decimal('value', 16, 0)->default(0);
            $table->timestamps();
        });

        Schema::create('proposal_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained()->cascadeOnDelete();
            $table->foreignId('budget_type_id')->constrained();
            $table->decimal('price', 16, 0)->default(0);
            $table->timestamps();
        });
        
        Schema::create('event_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('budget_type_id')->constrained();
            $table->decimal('price', 16, 0)->default(0);
            $table->integer('participantNum')->default(0);            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists(table: 'proposal_price');
        Schema::dropIfExists('event_prices');
        Schema::dropIfExists('budget_types');
    }
};
