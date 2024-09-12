<?php

namespace App\Console\Commands;

use App\Enum\EventCategory;
use App\Models\EHC\Employee;
use App\Models\EHC\Kursus;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class MigrateTableEHC extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'local:migrate-ehc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Migrate data from EHC Database to Local Database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('migrate', ['--path' => '/database/migrations/ehc_table']);

        
        $this->info('Seeding Courses table from EHC Database V_LACI_KURSUS Table');
        $ehc_kursus = DB::connection('ehc')->table('V_LACI_KURSUS')->where('lengkap', '<>', null)->orderByDesc('sandi')->get();
        foreach($ehc_kursus as $kursus){
            if(! $kursus->lengkap) continue;
            $kategori = null;
            if(strtolower($kursus->kategori) == 'public'){
                $kategori = EventCategory::PT->value;
            }
            else if(strtolower($kursus->kategori) == 'in house'){
                $kategori = EventCategory::IHT->value;
            }

            Kursus::createOrFirst([
                'sandi' => $kursus->sandi,
                'lengkap' => $kursus->lengkap,
                'kategori' => $kategori
            ]);
        }

        $this->info('Seeding employees table from EHC Database V_LACI_PEGAWAI table');
        $employees = DB::connection('ehc')->table('V_LACI_PEGAWAI')->get();
        foreach($employees as $employee){
            Employee::create([
                'nip' => $employee->nip,
                'nama' => $employee->nama,
                'jabatan' => $employee->jabatan,
                'cabang' => $employee->cabang,
            ]);
        }
    }
}
