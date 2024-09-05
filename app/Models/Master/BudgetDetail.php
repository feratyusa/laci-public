<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BudgetDetail extends Model
{
    use HasFactory;

    protected $table = 'budget_details';

    protected $fillable = [
        'name',
        'value',
        'budget_id',
    ];

    public function budget(): BelongsTo
    {
        return $this->belongsTo('budgets', 'budget_id', 'id');
    }
}
