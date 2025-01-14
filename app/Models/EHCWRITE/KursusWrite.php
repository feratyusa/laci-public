<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Model;

class KursusWrite extends Model
{
    protected $connection = 'local_ehc';
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
