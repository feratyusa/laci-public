<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LevelSertifikasiWrite extends Model
{
    protected $connection = 'local_ehc';
    protected $table = "level_sertifikasi";
    protected $fillable = [
        'level',
        'jenis_sertifikasi_id',
        'deskripsi',
        'masa_berlaku_tahun',
    ];
}
