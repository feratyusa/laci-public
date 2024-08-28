<?php

use App\Enum\EventCategory;
use App\Enum\MandatoryCategoryLink;
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
        Schema::create('mandatory_file_category', function (Blueprint $table) {
            $table->id();
            $table->enum('mandatory_type', array_column(MandatoryCategoryLink::cases(), 'value'));
            $table->string('category_id');
            $table->timestamps();
            
            $table->foreign('category_id')->references('id')->on('categories')->cascadeOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mandatory_file_category');
    }
};
