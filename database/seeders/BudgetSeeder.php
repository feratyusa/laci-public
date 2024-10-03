<?php

namespace Database\Seeders;

use App\Models\Master\Budget;
use App\Models\Master\BudgetDetail;
use App\Models\Master\BudgetType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        $budgetTypes = [
            [
                'coa' => 'Q.27700',
                'account_number' => '012345678910',
                'account_name' => 'Account IHT',
                'name' => 'In House Training',
            ],
            [
                'coa' => 'Q.27701',
                'account_number' => '012345678911',
                'account_name' => 'Account PT',
                'name' => 'Public Training',
            ],
            [
                'coa' => 'Q.27702',
                'account_number' => '012345678912',
                'account_name' => 'Account ATCOST',
                'name' => 'At Cost',
            ],
            [
                'coa' => 'Q.27703',
                'account_number' => '012345678913',
                'account_name' => 'Account AKOM',
                'name' => 'Akomodasi',
            ],
        ];
        
        $years = [
            [
                'year' => 2024,
                'details' => [['type' => 0, 'value' => 500e6], ['type' => 1, 'value' => 400e6], ['type' => 2, 'value' => 500e6], ['type' => 3, 'value' => 300e6]]
            ],
            [
                'year' => 2023,
                'details' => [['type' => 0, 'value' => 300e6], ['type' => 1, 'value' => 500e6], ['type' => 3, 'value' => 300e6]]
            ],
            [
                'year' => 2022,
                'details' => [['type' => 0, 'value' => 2e9], ['type' => 1, 'value' => 900e6], ['type' => 2, 'value' => 500e6], ['type' => 3, 'value' => 300e6]]
            ],
            [
                'year' => 2021,
                'details' => [['type' => 0, 'value' => 800e6], ['type' => 1, 'value' => 600e6], ['type' => 2, 'value' => 1e9]]
            ],            
        ];        

        $types = [];
        foreach($budgetTypes as $type){
            $types[] = BudgetType::create($type);
        }
        
        foreach($years as $year){
            $b = Budget::create(['year' => $year['year'], 'value' => 0]);
            
            foreach($year['details'] as $detail){
                $b->details()->create([
                    'budget_type_id' => $types[$detail['type']]->id,
                    'value' => $detail['value']
                ]);
            }
        }
    }
}
