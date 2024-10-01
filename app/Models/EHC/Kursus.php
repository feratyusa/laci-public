<?php

namespace App\Models\EHC;

use App\Trait\SelectOptions;
use Database\Factories\KursusFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Model;

class Kursus extends Model
{
    protected $connection = 'ehc';
    protected $table = 'V_LACI_KURSUS';  
    
    // protected $fillable = [
    //     'sandi',
    //     'lengkap',
    //     'kategori'
    // ];

    /**
     * Create a new factory instance for the model.
     */
    protected static function factory(): Factory
    {
        return KursusFactory::new();
    }
}
