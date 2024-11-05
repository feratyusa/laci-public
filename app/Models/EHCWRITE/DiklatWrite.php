<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DiklatWrite extends Model
{
    use HasFactory;
    
    protected $connection = 'ehc_write';
    protected $table = 'DIKLAT';
    public $timestamps = false;
}
