<?php

namespace App\Enum;

enum FileCategory: string
{
    case USULAN = 'SURAT USULAN';
    case PERMINTAAN = 'SURAT PERMINTAAN';
    case BAN = 'BERITA ACARA NEGOSIASI';
    case SPK = 'SURAT PERINTAH KERJA';
    case PKS = 'PERJANJIAN KERJA SAMA';
    case DOKUMENTASI = 'DOKUMENTASI';
    case LAMPIRAN = 'LAMPIRAN';
    case OTHER = 'OTHER';

    public static function selection(): array
    {
        $categories = array_column(self::cases(), 'value');
        $selection = [];
        foreach ($categories as $category) {
            $selection[] = (object)['label' => $category, 'value' => $category];
        }
        return $selection;
    }
}
