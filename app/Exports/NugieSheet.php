<?php

namespace App\Exports;

use App\Http\Controllers\Utilities\NugieController;
use App\Models\Utilities\Nugie\NugieDetail;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use Maatwebsite\Excel\Concerns\WithTitle;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class NugieSheet implements FromCollection, WithHeadings, WithTitle, ShouldAutoSize, WithStyles
{
    private int $nugie_detail_id;
    private bool $in;    

    public function __construct(int $detail_id, bool $in)
    {
        $this->nugie_detail_id = $detail_id;
        $this->in = $in;
    }

    public function headings(): array
    {
        return [
            'NIP',
            'Nama',
            'Jabatan',
            'Cabang',
            'Seksi',
            'Eselon',
            'Jobfam',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return (new NugieController)->getNugieResultsForSheet($this->nugie_detail_id, $this->in);
    }

    public function title(): string
    {
        $detail = NugieDetail::findOrFail($this->nugie_detail_id);

        if($this->in) return "{$detail->name} SUDAH";
        else return "{$detail->name} BELUM";
    }

    public function styles(Worksheet $sheet)
    {
        return[
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'ffffff']
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'color' => ['rgb' => 'ff0000']
                ]
            ]
        ];
    }
}
