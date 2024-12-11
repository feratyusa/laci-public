<?php

namespace Database\Factories;

use App\Enum\EventCategory;
use App\Models\EHC\Kursus;
use Illuminate\Database\Eloquent\Factories\Factory;

class KursusFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Kursus
        $kursus = ["Pelatihan Manajemen Risiko Perbankan",
                    "Pendidikan Dasar Perbankan",
                    "Analisis Kredit dan Manajemen Risiko",
                    "Pelatihan Kepatuhan Perbankan",
                    "Pendidikan Teknologi Finansial (Fintech)",
                    "Manajemen Likuiditas Perbankan",
                    "Pelatihan Strategi Perbankan",
                    "Pengenalan Produk Perbankan",
                    "Pelatihan Layanan Pelanggan Perbankan",
                    "Pendidikan Akuntansi Perbankan",
                    "Manajemen Portofolio Perbankan",
                    "Pelatihan Audit Internal Bank",
                    "Pengembangan Sumber Daya Manusia di Bank",
                    "Pelatihan Kepemimpinan di Sektor Perbankan",
                    "Pendidikan Hukum Perbankan",
                    "Strategi Pemasaran Perbankan",
                    "Pelatihan Teknologi Informasi untuk Bank",
                    "Analisis Kinerja Keuangan Bank",
                    "Pendidikan Manajemen Aset dan Kewajiban",
                    "Pelatihan Pengelolaan Investasi Perbankan",
                    "Pengenalan Regulasi Perbankan",
                    "Pelatihan Proses dan Operasional Bank",
                    "Pendidikan Manajemen Kredit",
                    "Pelatihan Evaluasi Risiko Kredit",
                    "Strategi Pengelolaan Risiko Perbankan",
                    "Pendidikan Perencanaan Keuangan di Bank",
                    "Pelatihan Pengembangan Produk Perbankan",
                    "Manajemen Hubungan Nasabah",
                    "Pelatihan Strategi Penjualan dan Cross-Selling",
                    "Pendidikan Pengenalan Perbankan Syariah",
                    "Pelatihan Pemasaran Digital untuk Bank",
                    "Pelatihan Pengelolaan Kas",
                    "Pendidikan Compliance Officer Bank",
                    "Pelatihan Manajemen Kinerja Bank",
                    "Pengenalan Teknologi Blockchain dalam Perbankan",
                    "Pelatihan Analisis Data Perbankan",
                    "Manajemen Krisis dan Kontinjensi di Bank",
                    "Pelatihan Pengembangan Tim di Sektor Perbankan",
                    "Pendidikan Penanganan Sengketa Nasabah",
                    "Pelatihan Inovasi Produk dan Layanan Bank",
                    "Pendidikan Keterampilan Negosiasi untuk Banker",
                    "Pelatihan Penanganan Transaksi Internasional",
                    "Strategi Manajemen Sumber Daya Manusia Bank",
                    "Pelatihan Manajemen Perubahan di Perbankan",
                    "Pendidikan Etika dan Kepatuhan Perbankan",
                    "Pelatihan Pengelolaan Dana Pensiun Bank",
                    "Pengenalan Manajemen Operasional Bank",
                    "Pelatihan Penerapan Teknologi Big Data di Perbankan",
                    "Pendidikan Sistem Informasi Perbankan",
                    "Pelatihan Penerapan Algoritma dalam Perbankan",
                    "Strategi Penanganan Risiko Operasional",
                    "Pelatihan Manajemen Proyek Perbankan",
                    "Pendidikan Analisis Tren Ekonomi untuk Bank",
                    "Pelatihan Kewirausahaan di Sektor Perbankan",
                    "Manajemen dan Pengendalian Fraud di Bank",
                    "Pelatihan Kepemimpinan untuk Eksekutif Bank",
                    "Pendidikan Dasar Investasi Perbankan",
                    "Pelatihan Manajemen Produk Kredit",
                    "Pengenalan Strategi Keuangan Bank",
                    "Pelatihan Pengelolaan Kinerja Tim Perbankan",
                    "Pendidikan Perbankan Mikro",
                    "Pelatihan Manajemen Aset Bank",
                    "Strategi Pengelolaan Utang di Bank",
                    "Pelatihan Pembiayaan Proyek Perbankan",
                    "Pendidikan Layanan Perbankan Internasional",
                    "Pelatihan Pengelolaan Hubungan Nasabah Utama",
                    "Pengenalan Perbankan Korporasi",
                    "Pelatihan Risiko Pemasaran Perbankan",
                    "Pendidikan Manajemen Pemasaran Bank",
                    "Pelatihan Analisis Risiko Kredit Perbankan",
                    "Strategi Pengelolaan Kredit Macet",
                    "Pelatihan Teknologi Pembayaran Digital",
                    "Pendidikan Komunikasi dalam Perbankan",
                    "Pelatihan Pengelolaan Dana Likuiditas",
                    "Manajemen Strategi Pengembangan Perbankan",
                    "Pelatihan Sistem Keamanan Bank",
                    "Pendidikan Kebijakan Internal Bank",
                    "Pelatihan Kinerja Keuangan dan Analisis Rasio",
                    "Pengenalan Pembiayaan Syariah",
                    "Pelatihan Pemasaran Layanan Keuangan",
                    "Pendidikan Sumber Daya Manusia dan Rekrutmen",
                    "Pelatihan Pengelolaan Proyek Perbankan",
                    "Strategi Pembangunan Kapasitas Bank",
                    "Pelatihan Penerapan Sistem Kredit",
                    "Pendidikan Dasar Manajemen Risiko",
                    "Pelatihan Pembiayaan dan Kredit Konsumen",
                    "Strategi Peningkatan Kualitas Layanan Perbankan",
                    "Pelatihan Manajemen Operasional Kredit",
                    "Pendidikan Analisis dan Pelaporan Keuangan",
                    "Pelatihan Kepemimpinan Strategis di Perbankan",
                    "Pengenalan Layanan Perbankan untuk UMKM",
                    "Pelatihan Sistem dan Prosedur Perbankan",
                    "Pendidikan Manajemen Portofolio Investasi",
                    "Pelatihan Pengelolaan Risiko Valuta Asing",
                    "Strategi Peningkatan Pendapatan Bank",
                    "Pelatihan Kebijakan Kredit dan Manajemen",
                    "Pendidikan Pengelolaan Aset Berisiko",
                    "Pelatihan Strategi Pengembangan Bisnis Perbankan",
                    "Pengenalan Analisis Pasar Finansial",
                    "Pelatihan Manajemen Kualitas dan Kepuasan Nasabah"
            ];

        // Kategori
        $category = array_column(EventCategory::cases(), 'value');

        $lini = ['BUSINESS', 'SUPPORTING'];

        $sektor = [
            'LENDING',
            'FUNDING',
            'Marketing',
            'Treasury',
            'Teknologi Informasi'
        ];

        $sertifikasi = [
            'non',
            'sertifikasi'
        ];

        return [
            'sandi' => fake()->unique()->numberBetween(90000, 99000),
            'lengkap' => fake()->unique()->randomElement($kursus),
            'kategori' => fake()->randomElement($category),
            'lini' => fake()->randomElement($lini),
            'sektor' => fake()->randomElement($sektor),
            'sertifikasi' => fake()->randomElement($sertifikasi),
        ];
    }

    protected $model = Kursus::class;
}
