<?php

namespace App\Models\EHCWRITE;

use Illuminate\Database\Eloquent\Model;

class KursusWrite extends Model
{
    protected $connection = 'sqlite';
    protected $table = 'kursus';
    public $timestamps = false;
}
