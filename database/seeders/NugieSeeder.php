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
            'name' => 'Report Testing Nugie',
            'description' => 'Report ini digunakan untuk menguji coba fitur Nugie, Dynamic Utility for General Information on Education or Report Maker.',
            'created_by' => 'Nugie'
        ]);

        $nugie_detail = NugieDetail::create([
            'nugie_id' => $nugie->id,
            'name' => 'Detail 1',
        ]);

        $nugie_detail->rules()->createMany([
            [
                'type' => 'course',
                'index' => 1,
                'child' => 1,
                'prefix' => null,
                'column' => 'kd_kursus',
                'verb' => 'in',
                'parameter' => '90111;90222'
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

        $nugie_detail2 = NugieDetail::create([
            'nugie_id' => $nugie->id,
            'name' => 'Detail 2',
        ]);

        $nugie_detail2->rules()->createMany([
            [
                'type' => 'course',
                'index' => 1,
                'child' => 1,
                'prefix' => null,
                'column' => 'kd_kursus',
                'verb' => 'in',
                'parameter' => '90333'
            ],
            [
                'type' => 'employee',
                'index' => 1,
                'child' => 1,
                'prefix' => null,
                'column' => 'cabang',
                'verb' => 'in',
                'parameter' => 'Cab. Madiun;Cab. Jember'
            ],
            [
                'type' => 'employee',
                'index' => 2,
                'child' => 1,
                'prefix' => 'and',
                'column' => 'jobfam',
                'verb' => 'like',
                'parameter' => '%kredit%'
            ],
        ]);

    }
}
