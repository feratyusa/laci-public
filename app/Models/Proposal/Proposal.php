<?php

namespace App\Models\Proposal;

use App\Enum\MandatoryCategoryLink;
use App\Models\EHC\Kursus;
use App\Models\EHC\Vendor;
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
        'created_by',
        'assign_to',
        'kd_lembaga',
    ];

    /**
     * Eager Load
     */
    protected $with = ['kursus', 'vendor', 'files', 'prices'];

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

    public function prices(): HasMany
    {
        return $this->hasMany(ProposalPrice::class, 'proposal_id', 'id');
    }

    public function vendor(): BelongsTo
    {
        return $this->belongsTo(Vendor::class, 'kd_lembaga', 'sandi');
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function newFactory(): Factory
    {
        return ProposalFactory::new();
    }
    
    /**
     * Utilities
     */
    public function isMissingCategories(): bool
    {
        $mandatories = MandatoryFileCategory::where('mandatory_type', MandatoryCategoryLink::USULAN->value)->pluck('category_id')->toArray();
        $files = $this->files()->pluck('category_id')->toArray();
        foreach ($mandatories as $m) {
            if(! in_array($m, $files)) return false;
        }
        return true;
    }
    public function isEventsComplete(): bool
    {
        if($this->events()->count() == 0) return false;
        $mandatories = MandatoryFileCategory::where('mandatory_type', $this->event_category)->pluck('category_id')->toArray();
        $events = Event::with('files')->where('proposal_id', $this->id)->get();
        foreach($events as $event){
            $files = $event->files()->pluck('category_id')->toArray();
            foreach ($mandatories as $m) {
                if(! in_array($m, $files)) return false;
            }
        }
        return true;
    }
}
