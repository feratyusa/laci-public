<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class LevelSertifikasi extends Model
{
    protected $connection = 'sqlite';
    protected $table = 'level_sertifikasi';

    public function courses(): BelongsToMany
    {
        return $this->belongsToMany(Kursus::class, DetailSertifikasi::class, 'level_sertifikasi_id', 'kursus_id', 'id', 'sandi');
    }
}
