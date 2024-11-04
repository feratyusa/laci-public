<?php

namespace App\Exports;

use App\Models\EHC\Employee;
use App\Models\Event\EventParticipant;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomValueBinder;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Cell\Cell;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Cell\DefaultValueBinder;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class EventParticipantsExport extends DefaultValueBinder implements FromCollection, WithHeadings, ShouldAutoSize, WithCustomValueBinder, WithStyles
{
    private string $event_id;
    private int $rowCount;

    public function __construct(string $event_id, int $rowCount)
    {
        $this->event_id = $event_id;
        $this->rowCount = $rowCount + 1;
    }

    public function headings(): array
    {
        return [
            'NIP',
            'NAMA',
            'JABATAN',
            'CABANG',
            'SEKSI'
        ];
    }

    public function bindValue(Cell $cell, $value)
    {
        $cell->setValueExplicit($value, DataType::TYPE_STRING);

        return true;        
    }

    public function styles(Worksheet $sheet)
    {
        $rowMax = "A1:E{$this->rowCount}";
        return [
            $rowMax => [
                'borders' => [                    
                    'outline' => [
                        'borderStyle' => Border::BORDER_THIN,
                        'color' => ['rgb' => 'ff0000']
                    ]
                ],
                'alignment' => [
                    'vertical' => Alignment::VERTICAL_CENTER
                ]
            ],
            1 => [
                'font' => [
                    'bold' => true, 
                    'color' => ['rgb' => 'ffffff']
                ],
                'fill' => [
                    'fillType' => Fill::FILL_SOLID,
                    'color' => ['rgb' => 'ff0000']
                ]
            ],
        ];
    } 

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $eventParticipants = EventParticipant::select('nip')->where('event_id', $this->event_id)->get()->toArray();
        return Employee::select('nip', 'nama', 'jabatan', 'cabang', 'seksi')
                                    ->whereIn('nip', $eventParticipants)
                                    ->get();
    }
}
