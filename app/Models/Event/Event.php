<?php

namespace App\Models\Event;

use App\Enum\MandatoryCategoryLink;
use App\Enum\ParticipantNumberType;
use App\Models\File\File;
use App\Models\File\MandatoryFileCategory;
use App\Models\Master\Location;
use App\Models\Proposal\Proposal;
use App\Trait\MissingCategory;
use Database\Factories\EventFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasFactory, SoftDeletes, MissingCategory;

    /**
     * Table init
     */
    protected $table = 'events';

    /**
     * Fillable
     */
    protected $fillable = [
        'name',
        'location_id',
        'proposal_id',
        'start_date',
        'end_date',
        'participant_number_type',
        'participant_number',
        'created_by',
        'assign_to',
        'defaultPrices',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['files', 'prices', 'participants', 'location'];

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

    public function prices(): HasMany
    {
        return $this->hasMany(EventPrices::class, 'event_id', 'id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id', 'id');
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return EventFactory::new();
    }

    /**
     * Utilities
     */
    public function getTotalParticipants(): int
    {
        return $this->participant_number_type == ParticipantNumberType::FIXED->value ? $this->participant_number : $this->participants()->count(); 
    }

    public function isMissingCategories(): bool
    {
        $mandatories = MandatoryFileCategory::where('mandatory_type', $this->proposal->event_category)->pluck('category_id')->toArray();
        $files = $this->files()->pluck('category_id')->toArray();
        foreach ($mandatories as $m) {
            if(! in_array($m, $files)) return false;
        }
        return true;
    }
}
