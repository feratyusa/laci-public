<?php

namespace App\Models\EHC;

use Database\Factories\KursusFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;

class Kursus extends Model
{
    protected $connection = 'sqlite';
    protected $table = 'KURSUS';  

    /**
     * Create a new factory instance for the model.
     */
    protected static function factory(): Factory
    {
        return KursusFactory::new();
    }
}
