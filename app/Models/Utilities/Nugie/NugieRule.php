<?php

namespace App\Models\Utilities\Nugie;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NugieRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'nugie_detail_id',
        'column',
        'is_not',
        'parameter',
    ];

    public function detail(): BelongsTo
    {
        return $this->belongsTo(NugieDetail::class, 'nugie_detail_id', 'id');
    }
}
