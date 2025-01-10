<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailSertifikasiWrite extends Model
{
    use HasFactory;
    protected $connection = 'sqlite';
    protected $table = "detail_sertifikasi";
    protected $fillable = [
        'kursus_id',
        'level_sertifikasi_id'
    ];
}
