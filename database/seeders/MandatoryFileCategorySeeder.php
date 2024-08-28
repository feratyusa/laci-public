<?php

namespace Database\Seeders;

use App\Enum\EventCategory;
use App\Enum\MandatoryCategoryLink;
use App\Models\File\MandatoryFileCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MandatoryFileCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            "BANPEL",  
            "BANAKOM", 
            "PERMINTAANPEL",
            "PERMINTAANAKOM",
            "UNDANGAN",
            "SPKPEL",  
            "SPKAKOM", 
            "PEMBAYARANPEL",
            "PEMBAYARANAKOM",
            "DOKUMENTASI",
            "USULAN",
        ];

        $mandatory_iht = [0,1,2,3,4,5,6,7,8,9];
        $mandatory_pt = [0,2,4,5,7,9];
        $mandatory_usulan = [10];

        foreach ($mandatory_iht as $value) {
            MandatoryFileCategory::create([
                'category_id' => $categories[$value],
                'mandatory_type' => MandatoryCategoryLink::IHT->value,
            ]);
        }

        foreach ($mandatory_pt as $value) {
            MandatoryFileCategory::create([
                'category_id' => $categories[$value],
                'mandatory_type' => MandatoryCategoryLink::PT->value,
            ]);
        }

        foreach ($mandatory_usulan as $value){
            MandatoryFileCategory::create([
                'category_id' => $categories[$value],
                'mandatory_type' => MandatoryCategoryLink::USULAN->value,
            ]);
        }
    }
}
