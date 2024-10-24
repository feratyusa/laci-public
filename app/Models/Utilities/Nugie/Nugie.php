<?php

namespace App\Models\Utilities\Nugie;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Nugie extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'created_by'
    ];

    protected $with = ['details'];

    public function details(): HasMany
    {
        return $this->hasMany(NugieDetail::class, 'nugie_id', 'id');
    }    
}
