<?php

namespace App\Models\EHC;

use Database\Factories\EmployeeFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\Factory;

class Employee extends Model
{
    use HasFactory;

    protected $connection = 'local_ehc';
    protected $table = 'employees';

    protected $fillable = [
        'nip',
        'nama',
        'cabang',
        'jabatan',
    ];

    /**
     * Create a new factory instance for the model.
     */
    protected static function factory(): Factory
    {
        return EmployeeFactory::new();
    }
}
