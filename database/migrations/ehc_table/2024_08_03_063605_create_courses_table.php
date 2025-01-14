<?php

use App\Enum\EventCategory;
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
        Schema::connection('local_ehc')->create('courses', function (Blueprint $table) {
            $table->integer('sandi');
            $table->string('lengkap');
            $table->enum('kategori', array_column(EventCategory::cases(), 'value'))->nullable();
            $table->string('lini');
            $table->string('sektor');
            $table->string('sertifikasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kursus');
    }
};
