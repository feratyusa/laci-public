<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LevelSertifikasiWrite extends Model
{
    use HasFactory;
    protected $connection = 'ehc_write';
    protected $table = "level_sertifikasi";
    protected $fillable = [
        'level',
        'deskripsi',
    ];
}
