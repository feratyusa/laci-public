<?php

namespace App\Models\File;

use App\Models\Event\EventFile;
use App\Models\Proposal\ProposalFile;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class File extends Model
{
    use HasFactory, HasUuids;

    /**
     * Connection init
     */
    protected $connection = 'dev';

    /**
     * Table init
     */
    protected $table = 'files';

    /**
     * Fillable
     */
    protected $fillable = [
        'name',
        'path'
    ];

    /**
     * Relationships
     */
    public function proposal_pivot(): HasMany
    {
        return $this->hasMany(ProposalFile::class, 'file_id', 'id');
    }
    public function event_pivot(): HasMany
    {
        return $this->hasMany(EventFile::class, 'file_id', 'id');
    }
}
