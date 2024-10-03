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
        Schema::table('budget_details', function(Blueprint $table) {
            $table->dropForeign('budget_details_budget_type_id_foreign');
            $table->dropColumn('budget_type_id');            
        });

        Schema::table('budget_details', function(Blueprint $table) {            
            $table->foreignId('budget_type_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::table('proposal_prices', function(Blueprint $table) {
            $table->dropForeign('proposal_prices_budget_type_id_foreign');
            $table->dropColumn('budget_type_id');
        });

        Schema::table('proposal_prices', function(Blueprint $table) {
            $table->foreignId('budget_type_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
        });

        Schema::table('event_prices', function(Blueprint $table) {
            $table->dropForeign('event_prices_budget_type_id_foreign');
            $table->dropColumn('budget_type_id');
        });

        Schema::table('event_prices', function(Blueprint $table) {            
            $table->foreignId('budget_type_id')->constrained()->cascadeOnUpdate()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('budget_details', function(Blueprint $table) {
            $table->dropForeign('budget_details_budget_type_id_foreign');
            $table->dropColumn('budget_type_id');            
        });

        Schema::table('budget_details', function(Blueprint $table) {            
            $table->foreignId('budget_type_id')->constrained();
        });

        Schema::table('proposal_prices', function(Blueprint $table) {
            $table->dropForeign('proposal_prices_budget_type_id_foreign');
            $table->dropColumn('budget_type_id');
        });

        Schema::table('proposal_prices', function(Blueprint $table) {
            $table->foreignId('budget_type_id')->constrained();
        });

        Schema::table('event_prices', function(Blueprint $table) {
            $table->dropForeign('event_prices_budget_type_id_foreign');
            $table->dropColumn('budget_type_id');
        });

        Schema::table('event_prices', function(Blueprint $table) {            
            $table->foreignId('budget_type_id')->constrained();
        });
    }
};
