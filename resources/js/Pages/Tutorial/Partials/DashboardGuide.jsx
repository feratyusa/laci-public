import LinkWord from "@/Components/LinkWord"
import GuideContents from "./GuideContents"

export default function DashboardGuide(){
    const title = 'Panduan Dashboard'
    const summary = 'Dashboard menampilkan ringkasan report terhadap dokumen yang belum diselesaikan dan anggaran tahun ini.'
    const toc = [
        {title: 'Konten Dashboard', content: '#contents', child: [
            {title: 'Berkas Belum Lengkap', content: '#documents-report'},
            {title: 'Rekap Anggaran', content: '#budget-report'},
        ]},
    ]

    return(
        <GuideContents title={title} summary={summary} toc={toc}>
            <ol className="list-inside list-[upper-alpha] text-lg">
                <li id="contents" className="text-lg text-red-500 font-bold mb-2">Konten Dashboard</li>
                <ol className="list-inside list-[lower-alpha] pl-5 mb-2">
                    <li id="documents-report" className="font-bold mb-2">Berkas Belum Lengkap</li>
                    <p className="pl-4 mb-2">
                        Bagian ini menampilkan jumlah Event untuk In House Training dan Public Training, serta Usulan yang
                        di-assign kepada user terautentikasi sekarang dimana berkasnya belum lengkap. Berkas yang wajib dipenuhi 
                        dilihat berdasarkan data KATEGORI WAJIB yang perlu dilengkapi.
                    </p>

                    <li id="budget-report" className="font-bold mb-2">Rekap Anggaran</li>
                    <p className="pl-4 mb-2">
                        Rekap anggaran yang ditampilkan berdasarkan rancangan anggaran yang telah dibuat 
                        di MASTER ANGGARAN. Rekap ini dapat menampilkan 5 macam tampilan.
                    </p>
                    <ul className="list-inside list-disc pl-10 mb-2">
                        <li>Bulan Ini</li>
                        <li>Q1 (Januari - Maret)</li>
                        <li>Q2 (Januari - Juni)</li>
                        <li>Q3 (Januari - September)</li>
                        <li>Q4 / Tahun Ini(Januari - Desember)</li>
                    </ul>
                    <p className="pl-4 mb-2">
                        Mode Rekap juga dapat diatur untuk menampilkan hanya Realisasi Anggaran 
                        yang telah dimasukkan pada halaman Event atau Realisasi Anggaran ditambah
                        dengan Anggaran Awal (Harga Perkiraan Sendiri) yang  elah dimasukkan pada 
                        halaman Usulan.
                    </p>
                </ol>
            </ol>
        </GuideContents>
    )
}