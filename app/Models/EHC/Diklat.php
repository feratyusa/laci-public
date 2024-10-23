<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;

class Diklat extends Model
{
    use HasFactory;

    protected $connection = 'ehc';

    protected $table = 'V_LACI_DIKLAT';

    protected $fillable = [
        'nip',
        'nama',
        'jabatan',
        'cabang',
        'kd_kursus',
        'pelatihan',
        'kd_lembaga',
        'lembaga',
        'tgl_mulai',
        'tgl_selesai',
        'keterangan',
        'deskripsi',
    ];
}
