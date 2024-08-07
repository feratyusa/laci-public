<?php

namespace App\Enum;

enum FileCategory: string
{
    case USULAN = 'SURAT USULAN';
    case PERMINTAANPEL = 'PERMINTAAN PENGADAAN PELATIHAN';
    case PERMINTAANAKOM = 'PERMINTAAN PENGADAAN AKOMODASI';
    case BANPEL = 'BERITA ACARA NEGOSIASI PELATIHAN';
    case BANAKOM = 'BERITA ACARA NEGOSIASI AKOMODASI';
    case SPKPEL = 'SURAT PERINTAH KERJA PELATIHAN';
    case SPKAKOM = 'SURAT PERINTAH KERJA AKOMODASI';
    case UNDANGAN = 'UNDANGAN';
    case DOKUMENTASI = 'DOKUMENTASI';
    case PEMBAYARANPEL = 'BERKAS PEMBAYARAN PELATIHAN';
    case PEMBAYARANAKOM = 'BERKAS PEMBAYARAN AKOMODASI';
    case LAMPIRAN = 'LAMPIRAN';
    case OTHER = 'OTHER';

    public static function selection(): array
    {
        $names = array_column(self::cases(), 'name');
        $categories = array_column(self::cases(), 'value');
        $selection = [];
        foreach ($categories as $index => $category) {
            $selection[] = (object)['label' => $category, 'value' => $category, 'name' => $names[$index]];
        }
        return $selection;
    }
}
