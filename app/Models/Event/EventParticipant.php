<?php

namespace App\Models\Event;

use Database\Factories\EventParticipantFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class EventParticipant extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Table init
     */
    protected $table = 'event_participants';

    protected $fillable = [
        'nama',
        'nip',
        'jabatan',
        'cabang',
        'event_id',
    ];

    public function event(): BelongsTo
    {
        return $this->belongsTo(Event::class, 'event_id', 'id');
    }

     /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return EventParticipantFactory::new();
    }
}
