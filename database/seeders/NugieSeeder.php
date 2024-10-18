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
            'kd_kursus' => '98717',
            'is_sql' => 0,
            'sql' => null
        ]);

        $nugie_details->rules()->createMany([
            [
                'index' => 1,
                'child' => 1,
                'column' => 'jobfam',
                'verb' => 'in',
                'parameter' => 'Akuntansi & Umum;Kredit Mikro'
            ],
            [
                'index' => 2,
                'child' => 1,
                'prefix' => 'and',
                'column' => 'jabatan',
                'verb' => 'like',
                'parameter' => '%Officer%'
            ],
            [
                'index' => 2,
                'child' => 2,
                'prefix' => 'or',
                'column' => 'cabang',
                'verb' => 'like',
                'parameter' => 'Cab. Madiun'
            ],
        ]);

    }
}
