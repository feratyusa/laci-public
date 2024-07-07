<?php

namespace App\Models\Proposal;

use App\Models\File\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProposalFile extends Model
{
    use HasFactory;

    /**
     * Connection init
     */
    protected $connection = 'dev';

    /**
     * Table init
     */
    protected $table = 'proposal_files';

    /**
     * Fillable
     */
    protected $fillable = [
        'file_category',
    ];

    /**
     * Relationships
     */
    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class, 'proposal_id', 'id');
    }
    public function file(): BelongsTo
    {
        return $this->belongsTo(File::class, 'file_id', 'id');
    }
}
