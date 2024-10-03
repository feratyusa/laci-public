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
        Schema::table('budget_types', function(Blueprint $table){
            $table->string('coa')->nullable();
            $table->string('account_number')->nullable();
            $table->string('account_name')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('budget_types', function(Blueprint $table){
            $table->dropColumn('coa');
            $table->dropColumn('account_number');
            $table->dropColumn('account_name');
        });
    }
};
