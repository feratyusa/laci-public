<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisSertifikasiWrite extends Model
{
    use HasFactory;

    protected $connection = 'local_ehc';
    protected $table = "jenis_sertifikasi";
    protected $fillable = [
        'nama',
        'deskripsi',
    ];

    public function levels(): HasMany
    {
        return $this->hasMany(LevelSertifikasiWrite::class, 'jenis_sertifikasi_id', 'id');
    }
}
