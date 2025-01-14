<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Model;

class KursusWrite extends Model
{
    protected $connection = 'sqlite';
    protected $table = 'kursus';
    protected $fillable = [
        'Lengkap',
        'tempat',
        'npublic',
        'nlini',
        'nsektor',
        'sertifikat',
        'nskill'
    ];
    public $timestamps = false;
}
