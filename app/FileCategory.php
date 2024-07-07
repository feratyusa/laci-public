<?php

namespace App;

enum FileCategory: string
{
    const USULAN = 'SURAT USULAN';
    const PERMINTAAN = 'SURAT PERMINTAAN';
    const BAN = 'BERITA ACARA NEGOSIASI';
    const SPK = 'SURAT PERINTAH KERJA';
    const PKS = 'PERJANJIAN KERJA SAMA';
    const DOKUMENTASI = 'DOKUMENTASI';
    const LAMPIRAN = 'LAMPIRAN';
}
