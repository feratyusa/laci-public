<?php

use App\Enum\EventCategory;
use App\Enum\ProposalStatus;
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
        Schema::create('proposals', function (Blueprint $table) {
            $table->id();
            $table->string('kd_kursus');
            $table->date('entry_date');
            $table->string('name');
            $table->enum('event_category', array_column(EventCategory::cases(), 'value'));
            $table->enum('status', array_column(ProposalStatus::cases(), 'value'));
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('proposal_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained();
            $table->foreignUuid('file_id')->constrained();
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('proposals');
    }
};
