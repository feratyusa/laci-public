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

            $table->foreign('budget_type_id')
                    ->references('id')
                    ->on('budget_types')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();            
        });

        Schema::table('proposal_prices', function(Blueprint $table) {
            $table->dropForeign('proposal_prices_budget_type_id_foreign');

            $table->foreign('budget_type_id')
                    ->references('id')
                    ->on('budget_types')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();
        });        

        Schema::table('event_prices', function(Blueprint $table) {
            $table->dropForeign('event_prices_budget_type_id_foreign');
            
            $table->foreign('budget_type_id')
                    ->references('id')
                    ->on('budget_types')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('budget_details', function(Blueprint $table) {
            $table->dropForeign('budget_details_budget_type_id_foreign');

            $table->foreign('budget_type_id')
                    ->references('id')
                    ->on('budget_details')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();      
        });        

        Schema::table('proposal_prices', function(Blueprint $table) {
            $table->dropForeign('proposal_prices_budget_type_id_foreign');
            
            $table->foreign('budget_type_id')
                    ->references('id')
                    ->on('budget_details')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();        
        });

        Schema::table('event_prices', function(Blueprint $table) {
            $table->dropForeign('event_prices_budget_type_id_foreign');
            
            $table->foreign('budget_type_id')
                    ->references('id')
                    ->on('budget_details')
                    ->cascadeOnUpdate()
                    ->cascadeOnDelete();        
        });
    }
};
