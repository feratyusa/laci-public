<?php

namespace Database\Seeders;

use App\Models\Master\Budget;
use App\Models\Master\BudgetDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BudgetSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $budgets = [
            [
                'year' => 2024,
                'value' => 500e12,
            ],
            [
                'year' => 2023,
                'value' => 650e12,
            ],
            [
                'year' => 2022,
                'value' => 800e12,
            ],
        ];

        $details = [
            [
                 [
                    'name' => 'In House Training',
                    'value' => 400e9,
                ],
                 [
                    'name' => 'Public Training',
                    'value' => 100e9,
                ]
            ],
            [
                 [
                    'name' => 'In House Training',
                    'value' => 350e9,
                ],
                 [
                    'name' => 'Public Training',
                    'value' => 300e9,
                ]
            ],
            [
                 [
                    'name' => 'In House Training',
                    'value' => 400e9,
                ],
                 [
                    'name' => 'Public Training',
                    'value' => 300e9,
                ],
                 [
                    'name' => 'Etcetera Training',
                    'value' => 100e9,
                ]
            ]
        ];
        
        for ($i=0; $i < 3; $i++) { 
            $budget = Budget::create([
                'year' => $budgets[$i]['year'],
                'value' => $budgets[$i]['value']
            ]);
            foreach ($details[$i] as $d) {
                BudgetDetail::create([
                    'budget_id' => $budget->id,
                    'name' => $d['name'],
                    'value' => $d['value']
                ]);
            }
        }
    }
}
