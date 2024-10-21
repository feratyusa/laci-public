<?php

namespace Database\Seeders;

use App\Models\Utilities\Nugie\Nugie;
use App\Models\Utilities\Nugie\NugieDetail;
use App\Models\Utilities\Nugie\NugieRule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class NugieSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $nugie = Nugie::create([
            'name' => 'Testing Nugie',
            'created_by' => 'Nugie'
        ]);

        $nugie_details = NugieDetail::create([
            'nugie_id' => $nugie->id,
            'name' => 'Detail 1',
        ]);

        $nugie_details->rules()->createMany([
            [
                'type' => 'course',
                'index' => 1,
                'child' => 1,
                'prefix' => null,
                'column' => 'kd_kursus',
                'verb' => 'in',
                'parameter' => '90826;92818'
            ],
            [
                'type' => 'employee',
                'index' => 1,
                'child' => 1,
                'prefix' => null,
                'column' => 'jabatan',
                'verb' => 'like',
                'parameter' => 'Officer'
            ],
            [
                'type' => 'employee',
                'index' => 2,
                'child' => 1,
                'prefix' => 'and',
                'column' => 'jobfam',
                'verb' => 'like',
                'parameter' => 'Akuntansi & Umum'
            ],
            [
                'type' => 'employee',
                'index' => 2,
                'child' => 2,
                'prefix' => 'or',
                'column' => 'cabang',
                'verb' => 'not in',
                'parameter' => 'Cab. Malang;Cab. Madiun'
            ],
        ]);

    }
}
