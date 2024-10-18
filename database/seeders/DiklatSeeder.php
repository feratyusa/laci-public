<?php

namespace Database\Seeders;

use App\Models\EHC\Diklat;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use App\Models\EHC\Vendor;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DiklatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        if(env('EHC_ENV', 'sqlite') == 'sqlite'){
            $courses = Kursus::all();
            $vendors = Vendor::all();
            $employees = Employee::all();

            $indexes = [3, 7, 9, 10, 8];
            
            foreach ($indexes as $index) {
                $course = $courses[$index];
                $vendor = $vendors[$index];
                $maxParticipants = fake()->numberBetween(2, 80);
                $employeeStartIndex = fake()->numberBetween(0, count($employees) - 90);
                for ($i=0; $i < $maxParticipants; $i++) { 
                    $employee = $employees[$i + $employeeStartIndex];
                    $start = fake()->dateTimeBetween('-5 months', '-1 month');
                    $end  = fake()->dateTimeInInterval($start, '+1 week');
                    $keterangan = fake()->numberBetween(0, 100) == 1 ? 'TIDAK HADIR' : '';
                    Diklat::create([
                        'nip' => $employee->nip,
                        'nama' => $employee->nama,
                        'jabatan' => $employee->jabatan,
                        'cabang' => $employee->cabang,
                        'kd_kursus' => $course->sandi,
                        'pelatihan' => $course->lengkap,
                        'kd_lembaga' => $vendor->sandi,
                        'lembaga' => $vendor->lengkap,
                        'tgl_mulai' => $start,
                        'tgl_selesai' => $end,
                        'keterangan' => $keterangan,
                        'deskripsi' => '',
                    ]);
                }
            }
        }
        else{
            exit('FORBIDDEN to seed EHC Database');
        }
    }
}
