<?php

namespace App\Models\File;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Category extends Model
{
    use HasFactory;

    /**
     * Table init
     */
    protected $table = 'categories';
    public $incrementing = false;

    /**
     * Fillable
     */
    protected $fillable = [
        'id',
        'name'
    ];

    public function files(): HasMany
    {
        return $this->hasMany(File::class, 'category_id', 'id');
    }
}
