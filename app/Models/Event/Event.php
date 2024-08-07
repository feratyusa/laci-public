<?php

namespace App\Models\Event;

use App\Models\File\File;
use App\Models\Proposal\Proposal;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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
        'proposal_id',
        'kd_kursus',
        'start_date',
        'end_date',
        'event_category',
        'participant_number_type',
        'participant_number',
        'price_per_person',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['proposal'];

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
    public function files(): BelongsToMany
    {
        return $this->belongsToMany(File::class, 'event_files', 'event_id', 'file_id');
    }


    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return EventFactory::new();
    }
}
