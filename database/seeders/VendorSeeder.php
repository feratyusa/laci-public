<?php

namespace Database\Seeders;

use App\Models\EHC\Vendor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(env('EHC_ENV', 'sqlite') == 'local_ehc'){
            Vendor::factory()->count(100)->create();
        }
        else{
            exit('FORBIDDEN to seed EHC Database');
        }
    }
}
