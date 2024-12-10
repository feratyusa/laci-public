<?php

namespace App\Models\EHC;

use Database\Factories\VendorFactory;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendor extends Model
{
    use HasFactory;

    protected $connection = 'sqlite';
    protected $table = 'vendors';

    protected $fillable = [
        'sandi',
        'lengkap',
        'cp',
        'nope'
    ];

    /**
     * Create a new factory instance for the model.
     */
    protected static function factory(): Factory
    {
        return VendorFactory::new();
    }
}
