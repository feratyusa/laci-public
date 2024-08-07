<?php

use App\Enum\FileCategory;
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
        Schema::create('file_categories', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name');
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('files', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('category_id');
            $table->string('name');
            $table->string('path');
            $table->string('size');
            $table->string('mime_type');
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        

    }
    
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
