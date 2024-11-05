<?php

namespace App\Exports;

use App\Models\Utilities\Nugie\Nugie;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use Maatwebsite\Excel\Concerns\WithTitle;

class NugieExport implements WithMultipleSheets
{
    use Exportable;

    private string $nugie_id;    

    public function __construct(int $nugie_id)
    {
        $this->nugie_id = $nugie_id;
    }

    public function sheets(): array
    {
        $nugie = Nugie::findOrFail($this->nugie_id);
        $count = $nugie->details()->count();

        $sheets = [];

        foreach ($nugie->details as $detail) {
            $sheets[] = new NugieSheet($detail->id, true);
            $sheets[] = new NugieSheet($detail->id, false);
        }

        return $sheets;
    }
}
