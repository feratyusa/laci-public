const _01_17_2025 = {
    title: 'v1.1.0 (17 Januari 2025)',
    md: `
#### New Features
- Master Jenis Kursus dan Jenis Sertifikasi
- Report Sertifikasi pada Menu Report Pendidikan
- Dashboard bagian Report sertifikasi
#### Update
- Update Guidebook v1.1.0
`
}

const _01_03_2025 = {
    title: 'v1.0.0 (03 Januari 2025)',
    md: `
#### New Features
- Guidebook untuk penggunaan LACI (finally)
- Search filter pada hasil filter pegawai di menu NUGIE
#### Fixes
- Fix tanggal input untuk Dashboard Reload
`
}

const _11_07_2024 = {
    title: 'v0.8.0 (11 November 2024)',
    md: `
#### New Features
- Dynamic Utility for General Information on Education atau NUGIE. Fitur Report Maker untuk ,melihat ringkasan jumlah dan detail pegawai yang mengikuti pelatihan. ( basically Report Pendidikan v2.0 )
    1. Dapat menyimpan report yang telah dibuat sehingga dapat ditinjau kembali.
    2. Berbasis Query Builder sehingga lebih fleksibel dalam mengatur kriteria report yang dibuat.
    3. Dapat melihat SQL berdasarkan kriteria yang telah dibuat.
    4. Duplikasi Nugie ataupun Rules Nugie yang telah dibuat.
    5. Export hasil Nugie ke Excel.
- Peserta Event dapat diinput secara bulk maupun file menggunakan menu **Manage Peserta** pada event bagian peserta.
- Peserta Event sekarang yang akan atau sdh diinput dapat dilihat apakah sudah mengikuti diklat dengan kode kursus yang sama dan apakah mengikuti di event yang tanggalnya bertabrakan dengan event yang diikuti sekarang.
- **Fungsi Export** untuk peserta event dan hasil dari Nugie.
- **Panduan Pengguna** untuk semua fitur yang ada.
#### Fixes
- Filter Event dan Usulan
- UI untuk bagian Kalkulator dan Kalender
- Performance issue saat first loading halaman detail Event
- Menu **Kalendar** untuk monitoring jadwal event pelatihan
`
}

const _24_09_2024 = {
title: 'v0.2.5 (24 September 2024)',
md: `
#### Features
- **Local server launched!**
- **File Manager** untuk usulan dan event pelatihan
- **File tag** untuk monitoring file usulan dan event yang wajib dipenuhi
- **Anggaran Manager** untuk mengatur anggaran setiap event
- Master kategori dan kategori wajib file, user, dan anggaran
- Menu **Kalkulator** untuk monitoring anggaran event pelatihan dan anggaran tahunan
- Menu **Kalendar** untuk monitoring jadwal event pelatihan
`
}

const _10_10_2024 = {
title: 'v0.5.0 (10 Oktober 2024)',
md: `
#### New Features
- Anggaran Awal Usulan dan Anggaran Realisasi event
- Tampilan **Kalkulator** dan **Kalender** tidak lagi menerima input
- Master **Lokasi** untuk menambahkan lokasi event pelatihan
- **Kalendar** sekarang dibagi menjadi dilaksanakan di Prigen (PRNG) dan bukan
- Pembagian status anggaran Event menjadi Anggaran Awal atau Anggaran Realisasi
- Mode tampilan **Kalkulator** untuk hanya menghitung Anggaran Realisasi atau Anggaran Realisasi dan Awal
- Filter Event: Assign To dan Status Anggaran
- Dashboard anggaran kini memiliki 2 mode dan hanya akan menampilkan pada tahun ini jika tahun anggaran ada
#### Fix
- Tambahan keterangan Anggaran pada Event yang dimasukkan adalah Biaya/Individu
- Pilihan select tidak terlihat saat elemennya berada di Dialog
- Kesalahan nilai pada Tahun Anggaran di menu **Kalkulator** saat tidak memiliki Detail Anggaran
- Jumlah partisipan Anggaran Awal saat membuat Event baru akan mengikuti jumlah yang dimasukkan di awal
- Dashboard terbalik dalam menampilkan banyak berkas yang sudah lengkap
`
}

const changes = [
    _01_17_2025,
    _01_03_2025,
    _11_07_2024,
    _10_10_2024,
    _24_09_2024,
]

export {changes}
