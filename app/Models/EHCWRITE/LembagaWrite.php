<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Model;

class LembagaWrite extends Model
{
    protected $connection = 'sqlite';
    protected $table = 'lembaga';
    protected $fillable = [
        'lengkap',
        'cp',
        'nope',
    ];
    public $timestamps = false;
}
