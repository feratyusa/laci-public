<?php

namespace App\Models\EHC;

use App\Trait\SelectOptions;
use Database\Factories\KursusFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Kursus extends Model
{
    protected $connection = 'sqlite';
    protected $table = 'courses';

    protected $fillable = [
        'sandi',
        'lengkap',
        'kategori',
        'lini',
        'sektor',
        'sertifikasi'
    ];

    public function level()
    {
        return $this->belongsToMany(LevelSertifikasi::class, DetailSertifikasi::class, 'kursus_id', 'level_sertifikasi_id', 'sandi', 'id');
    }

    /**
     * Create a new factory instance for the model.
     */
    protected static function factory(): Factory
    {
        return KursusFactory::new();
    }
}
