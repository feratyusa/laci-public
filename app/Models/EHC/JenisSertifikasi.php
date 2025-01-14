<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class JenisSertifikasi extends Model
{
    protected $connection = 'local_ehc';
    protected $table = 'jenis_sertifikasi';

    public function levels(): HasMany
    {
        return $this->hasMany(LevelSertifikasi::class, 'jenis_sertifikasi_id', 'id');
    }

    /**
     * Create a new factory instance for the model.
     */
    // protected static function factory(): Factory
    // {
    //     return
    // }
}
