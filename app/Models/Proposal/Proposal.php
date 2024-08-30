<?php

namespace App\Models\Proposal;

use App\Models\EHC\Kursus;
use App\Models\Event\Event;
use App\Models\File\File;
use App\Models\File\MandatoryFileCategory;
use App\Trait\MissingCategory;
use Database\Factories\ProposalFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Proposal extends Model
{
    use HasFactory, SoftDeletes, MissingCategory;

    /**
     * Table init
     */
    protected $table = 'proposals';

    /**
     * Fillable
     */
    protected $fillable = [
        'name',
        'event_category',
        'entry_date',
        'kd_kursus',
        'status',
    ];

    /**
     * Eager Load
     */
    protected $with = ['kursus', 'files'];

    /**
     * Relationships
     */
    public function events(): HasMany
    {
        return $this->hasMany(Event::class, 'proposal_id', 'id');
    }
    public function files_pivot(): HasMany
    {
        return $this->hasMany(ProposalFile::class, 'proposal_id', 'id');
    }

    public function files(): BelongsToMany
    {
        return $this->belongsToMany(File::class, 'proposal_files', 'proposal_id', 'file_id');
    }

    public function kursus(): BelongsTo
    {
        return $this->belongsTo(Kursus::class, 'kd_kursus', 'sandi');
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return ProposalFactory::new();
    }
}
