<?php

use App\EventCategory;
use App\FileCategory;
use App\ProposalStatus;
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
            $table->dateTime('entry_date');
            $table->string('name');
            $table->enum('event_category', [EventCategory::IHT, EventCategory::PT]);
            $table->enum('status', [ProposalStatus::ACCEPTED, ProposalStatus::PENDING, ProposalStatus::REJECTED]);
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('proposal_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained();
            $table->foreignUuid('file_id')->constrained();
            $table->enum('file_category', [
                                            FileCategory::USULAN,
                                            FileCategory::BAN,
                                            FileCategory::PERMINTAAN,
                                            FileCategory::SPK,
                                            FileCategory::PKS,
                                            FileCategory::DOKUMENTASI,
                                            FileCategory::LAMPIRAN
                                        ]);
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
