const _24_09_2024 = {
title: 'v0.25 (24 September 2024)',
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
title: 'v0.50 (10 Oktober 2024)',
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
    _10_10_2024,
    _24_09_2024,
]

export {changes}