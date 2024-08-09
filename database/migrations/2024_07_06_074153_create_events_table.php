<?php

use App\Enum\EventCategory;
use App\Enum\ParticipantNumberType;
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
            $table->string('name');
            $table->date('start_date');
            $table->date('end_date');
            $table->enum('participant_number_type', array_column(ParticipantNumberType::cases(), 'value'));
            $table->integer('participant_number')->nullable()->default(0);
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('event_prices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->decimal('training_price', 16)->default(0);
            $table->decimal('accomodation_price', 16)->default(0);
            $table->timestamps();
        });

        Schema::create('event_participants', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
            $table->string('nip');
            $table->string('nama');
            $table->string('jabatan');
            $table->string('cabang');
            $table->softDeletes('deleted_at', 0);
            $table->timestamps();
        });

        Schema::create('event_files', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained();
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
        Schema::dropIfExists('event_participants');
        Schema::dropIfExists('event_files');
        Schema::dropIfExists('events');
    }
};
