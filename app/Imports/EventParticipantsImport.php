<?php

namespace App\Imports;

use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\ToModel;

class EventParticipantsImport implements ToCollection
{
    private array $result;

    public function collection(Collection $rows): void
    {
        foreach ($rows as $index => $row) {
            if($index == 0) continue;
            $this->result[] = str($row[0]);
        }
    }

    public function getResult()
    {
        return $this->result;
    }
}
