<?php

namespace App\Trait;

trait MonthHelper
{
    public function getMonthString(String $month): string
    {
        $months_ID = [
            'Januari',
            'Februari',
            'Maret',
            'April',
            'Mei',
            'Juni',
            'Juli',
            'Agustus',
            'September',
            'Oktober',
            'November',
            'Desember'
        ];
        return $months_ID[intval($month-1)];
    }
}
