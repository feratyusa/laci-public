<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DetailSertifikasi extends Model
{
    protected $connection = 'local_ehc';
    protected $table = 'detail_sertifikasi';
}
