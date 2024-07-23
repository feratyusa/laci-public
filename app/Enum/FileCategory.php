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
}
