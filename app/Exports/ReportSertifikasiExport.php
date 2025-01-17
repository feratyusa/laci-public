<?php

namespace App\Exports;

use Illuminate\Database\Eloquent\Collection;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class ReportSertifikasiExport implements FromCollection, ShouldAutoSize, WithStyles, WithHeadings
{
    private array $results;
    public function __construct(array $results)
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
        return [
            'NIP',
            'Nama',
            'Jabatan',
            'Sertifikasi',
            'Tanggal Lulus',
            'Tanggal Expired',
        ];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $collects = new Collection();

        foreach ($this->results as $object) {
            $temp = collect((object)$object);
            $collects->push($temp->forget('urutan'));
        }

        return $collects;
    }
}
