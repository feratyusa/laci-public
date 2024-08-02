<?php

namespace App\Models\EHC;

use Illuminate\Database\Eloquent\Model;

class Kursus extends Model
{
    protected $connection = 'ehc';
    protected $table = 'KURSUS';  
}
