<?php

namespace App\Models\Utilities\Nugie;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class NugieDetail extends Model
{
    use HasFactory;

    protected $fillable = [
        'nugie_id',
        'name',
    ];

    protected $with = ['rules'];

    public function nugie(): BelongsTo
    {
        return $this->belongsTo(Nugie::class, 'nugie_id', 'id');
    }

    public function rules(): HasMany
    {
        return $this->hasMany(NugieRule::class, 'nugie_detail_id', 'id');
    }
}
