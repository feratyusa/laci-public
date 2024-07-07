<?php

use App\EventCategory;
use App\EventStatus;
use App\FileCategory;
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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('proposal_id')->constrained();
            $table->string('kd_kursus');
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('event_category', [EventCategory::IHT, EventCategory::PT]);
            $table->enum('event_status', [EventStatus::PENDING, EventStatus::ACCEPTED, EventStatus::REJECTED]);
            $table->decimal('price_per_person', 16, 2);
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('event_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
            $table->string('nip');
            $table->string('nama');
            $table->string('jabatan');
            $table->string('cabang');
            $table->string('batch');
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('event_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
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
        Schema::dropIfExists('events');
    }
};
