<?php

namespace App\Models\Event;

use App\Models\Proposal\Proposal;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Table init
     */
    protected $table = 'events';

    /**
     * Fillable
     */
    protected $fillable = [
        'name',
        'start_date',
        'end_date',
        'kd_kursus',
        'price_per_person',
    ];

    /**
     * Relationships
     */
    public function participants(): HasMany
    {
        return $this->hasMany(EventParticipant::class, 'event_id', 'id');
    }
    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class, 'proposal_id', 'id');
    }
    public function files_pivot(): HasMany
    {
        return $this->hasMany(EventFile::class, 'event_id', 'id');
    }
}
