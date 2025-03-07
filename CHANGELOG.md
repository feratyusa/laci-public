# Todo
- Logging

# v0.70 (TBD)

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

# v0.50 (10 Oktober 2024)

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

# v0.25 (24 September 2024)

#### Features

- **Local server launched!**
- **File Manager** untuk usulan dan event pelatihan
- **File tag** untuk monitoring file usulan dan event yang wajib dipenuhi
- **Anggaran Manager** untuk mengatur anggaran setiap event
- Master kategori dan kategori wajib file, user, dan anggaran
- Menu **Kalkulator** untuk monitoring anggaran event pelatihan dan anggaran tahunan
- Menu **Kalendar** untuk monitoring jadwal event pelatihan
