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
        'budget_id',
        'budget_type_id',
        'value',
    ];

    protected $with = ['budgetType'];

    public function budget(): BelongsTo
    {
        return $this->belongsTo('budgets', 'budget_id', 'id');
    }

    public function budgetType(): BelongsTo
    {
        return $this->belongsTo(BudgetType::class, 'budget_type_id', 'id');
    }
}
