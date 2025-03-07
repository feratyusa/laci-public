<?php

namespace App\Models\Proposal;

use App\Models\File\File;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProposalFile extends Model
{
    use HasFactory, SoftDeletes;

    /**
     * Table init
     */
    protected $table = 'proposal_files';

    /**
     * Fillable
     */
    protected $fillable = [
        'proposal_id',
        'file_id'
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
