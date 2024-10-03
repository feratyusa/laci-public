<?php

namespace App\Models\Master;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BudgetType extends Model
{
    use HasFactory;

    protected $table = 'budget_types';

    protected $fillable = [
        'coa',
        'account_number',
        'account_name',
        'name',                
    ];
}
