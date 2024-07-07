<?php

namespace App\Models\Proposal;

use App\Models\Event\Event;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Proposal extends Model
{
    use HasFactory;

    /**
     * Connection init
     */
    protected $connection = 'dev';

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
     * Relationships
     */
    public function event(): HasOne
    {
        return $this->hasOne(Event::class, 'proposal_id', 'id');
    }
    public function files_pivot(): HasMany
    {
        return $this->hasMany(ProposalFile::class, 'proposal_id', 'id');
    }
}
