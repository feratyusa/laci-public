<?php

namespace App\Models\File;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MandatoryFileCategory extends Model
{
    use HasFactory;

    protected $table = 'mandatory_file_category';

    protected $fillable = [
        'category_id',
        'mandatory_type'
    ];

    protected $with = ['category'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'id');
    }
}
