<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Model;

class KelKursus extends Model
{
    protected $connection = 'local_ehc';
    protected $table = 'kelkursus';
}
