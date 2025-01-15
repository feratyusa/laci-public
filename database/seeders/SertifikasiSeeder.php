<?php

namespace Database\Seeders;

use App\Models\EHC\JenisSertifikasi;
use App\Models\EHC\LevelSertifikasi;
use App\Models\EHCWRITE\DetailSertifikasiWrite;
use App\Models\EHCWRITE\JenisSertifikasiWrite;
use App\Models\EHCWRITE\LevelSertifikasiWrite;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SertifikasiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if (env('EHC_ENV', 'sqlite') == 'local_ehc') {
            $sertifikasi = [
                [
                    'nama' => 'BSMR',
                    'deskripsi' => 'Badan Sigma Mogging Rizz',
                    'levels' => [
                        [
                            'level' => 'Jenjang 5',
                            'deskripsi' => 'Jenjang 5 / Level 4',
                            'urutan' => 1,
                            'masa_berlaku_tahun' => 3,
                            'details' => ['90111']
                        ],
                        [
                            'level' => 'Jenjang 6',
                            'deskripsi' => 'Jenjang 6 / Level 5',
                            'urutan' => 2,
                            'masa_berlaku_tahun' => 3,
                            'details' => []
                        ],
                        [
                            'level' => 'Jenjang 7',
                            'deskripsi' => 'Jenjang 7',
                            'urutan' => 3,
                            'masa_berlaku_tahun' => 3,
                            'details' => ['90333']
                        ],
                    ],
                ],
                [
                    'nama' => 'AUDIT',
                    'deskripsi' => 'Audit Certified',
                    'levels' => [
                        [
                            'level' => 'Basic',
                            'deskripsi' => 'Level 1 - 3',
                            'urutan' => 1,
                            'masa_berlaku_tahun' => 5,
                            'details' => ['90222']
                        ],
                        [
                            'level' => 'Advance',
                            'deskripsi' => 'Level 4 - 6',
                            'urutan' => 2,
                            'masa_berlaku_tahun' => 5,
                            'details' => []
                        ],
                    ],
                ]
            ];

            foreach ($sertifikasi as $value) {
                $jenis = JenisSertifikasiWrite::create([
                    'nama' => $value['nama'],
                    'deskripsi' => $value['deskripsi']
                ]);

                foreach ($value['levels'] as $level) {
                    $levelEntity = LevelSertifikasiWrite::create([
                        'jenis_sertifikasi_id' => $jenis->id,
                        'level' => $level['level'],
                        'deskripsi' => $level['deskripsi'],
                        'urutan' => $level['urutan'],
                        'masa_berlaku_tahun' => $level['masa_berlaku_tahun']
                    ]);

                    foreach ($level['details'] as $detail) {
                        DetailSertifikasiWrite::create([
                            'level_sertifikasi_id' => $levelEntity->id,
                            'kursus_id' => $detail
                        ]);
                    }
                }
            }
        }
        else{
            exit('FORBIDDEN to seed EHC Database');
        }
    }
}
