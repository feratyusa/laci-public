<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BudgetType extends Model
{
    use HasFactory;

    protected $table = 'budget_types';

    protected $fillable = [
        'name',                
    ];
}
