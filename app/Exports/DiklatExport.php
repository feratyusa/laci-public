<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class DiklatExport implements FromCollection, ShouldAutoSize, WithStyles, WithHeadings
{
    private $results;
    public function __construct($results)
    {
        $this->results = $results;
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
    public function headings(): array
    {
        return ['nip', 'pelatihan', 'kd_kursus', 'nilai2', 'nilai3', 'tgl_mulai', 'tgl_selesai'];
    }
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return $this->results;
    }
}
