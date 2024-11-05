<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AbsenDiklat extends Model
{
    use HasFactory;

    protected $connection = 'ehc';

    protected $table = 'V_LACI_ABSEN_DIKLAT';
}
