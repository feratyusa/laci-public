<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Schema;

class Diklat extends Model
{
    use HasFactory;

    protected $connection = 'local_ehc';

    protected $table = 'diklat';

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

    public function course(): BelongsTo
    {
        return $this->belongsTo(Kursus::class, 'kd_kursus', 'sandi');
    }
}
