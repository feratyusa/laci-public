<?php

namespace Database\Seeders;

use App\Models\EHC\Employee;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmployeeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(env('EHC_ENV', 'sqlite') == 'local_ehc'){
            Employee::factory()->count(1000)->create();
        }
        else{
            exit('FORBIDDEN to seed EHC Database');
        }
    }
}
