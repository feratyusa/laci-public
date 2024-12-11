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
        $keterangans = ['TIDAK HADIR', 'SAKIT'];

        if(env('EHC_ENV', 'sqlite') == 'sqlite'){
            $vendors = Vendor::all();
            $employees = Employee::all();

            // Pre-determined Diklat
            $determined_key = [90111, 90222, 90333];
            foreach ($determined_key as $key) {
                $vendor = $vendors[fake()->numberBetween(0,10)];
                $course = Kursus::where('sandi', $key)->first();
                $maxParticipants = fake()->numberBetween(50, 100);
                $employeeStartIndex = fake()->numberBetween(0, count($employees) - 90);
                $start = fake()->dateTimeBetween('-5 months', '-1 month');
                $end  = fake()->dateTimeInInterval($start, '+1 week');
                for ($i=0; $i < $maxParticipants; $i++) {
                    $employee = $employees[$i + $employeeStartIndex];
                    $keterangan = fake()->numberBetween(0, 10) == 1 ? fake()->randomElement($keterangans) : null;
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
                        'deskripsi' => $keterangan != null ? fake()->words(asText:true) : null,
                    ]);
                }
            }

            $courses = Kursus::whereNotIn('sandi', [90111, 90222, 90333])->get();

            $indexes = [3, 7, 9, 10, 8];

            foreach ($indexes as $index) {
                $course = $courses[$index];
                $vendor = $vendors[$index];
                $maxParticipants = fake()->numberBetween(2, 80);
                $employeeStartIndex = fake()->numberBetween(0, count($employees) - 90);
                $start = fake()->dateTimeBetween('-5 months', '-1 month');
                $end  = fake()->dateTimeInInterval($start, '+1 week');
                for ($i=0; $i < $maxParticipants; $i++) {
                    $employee = $employees[$i + $employeeStartIndex];
                    $keterangan = fake()->numberBetween(0, 10) == 1 ? fake()->randomElement($keterangans) : null;
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
                        'deskripsi' => $keterangan != null ? fake()->words(asText:true) : null,
                    ]);
                }
            }
        }
        else{
            exit('FORBIDDEN to seed EHC Database');
        }
    }
}
