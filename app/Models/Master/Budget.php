<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Budget extends Model
{
    use HasFactory;

    protected $table = 'budgets';

    protected $fillable = [
        'year',
        'value'
    ];

    public function details(): HasMany
    {
        return $this->hasMany(BudgetDetail::class, 'budget_id', 'id');
    }
}
