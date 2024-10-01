<?php

namespace App\Models\Proposal;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProposalPrice extends Model
{
    use HasFactory;

    protected $table = 'proposal_prices';

    protected $fillable = [    
        'proposal_id',    
        'budget_type_id',
        'price',
    ];

    protected $touches = ['proposal'];

    public function proposal(): BelongsTo
    {
        return $this->belongsTo(Proposal::class, 'proposal_id', 'id');
    }

    public function budgetType(): BelongsTo
    {
        return $this->belongsTo('budget_types', 'budget_type_id', 'id');
    }
}
