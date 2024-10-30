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
                        Bagian ini menampilkan jumlah <LinkWord route={route('event.index')}>Event</LinkWord> untuk 
                        In House Training dan Public Training, serta <LinkWord route={route('proposal.index')}>Usulan</LinkWord> yang
                        <span className="italic"> di-assign</span> kepada <span className="capitalize font-bold">user terautentikasi</span> sekarang
                        dimana berkasnya belum lengkap. Berkas yang wajib dipenuhi dilihat berdasarkan
                        data <LinkWord route={route('mandatory-category.index')}>kategori wajib</LinkWord> yang 
                        perlu dilengkapi.
                    </p>

                    <li id="budget-report" className="font-bold mb-2">Rekap Anggaran</li>
                    <p className="pl-4 mb-2">
                        Rekap anggaran yang ditampilkan berdasarkan rancangan anggaran yang telah dibuat 
                        di <LinkWord route={route('budget.index')}>Anggaran</LinkWord>. Rekap ini dapat menampilkan 5 macam tampilan.
                    </p>
                    <ul className="list-inside list-disc pl-10 mb-2">
                        <li>Bulan Ini</li>
                        <li>Q1 (Januari - Maret)</li>
                        <li>Q2 (Januari - Juni)</li>
                        <li>Q3 (Januari - September)</li>
                        <li>Q4 / Tahun Ini(Januari - Desember)</li>
                    </ul>
                    <p className="pl-4 mb-2">
                        Mode Rekap juga dapat diatur untuk menampilkan
                        hanya <span className="font-bold">Realisasi Anggaran</span> yang telah dimasukkan 
                        pada <LinkWord route={route('event.index')}>Event</LinkWord> atau ditambah
                        dengan <span className="font-bold">Anggaran Awal (Harga Perkiraan Sendiri)</span> yang 
                        telah dimasukkan pada <LinkWord route={route('proposal.index')}>Usulan</LinkWord>.
                    </p>
                </ol>
            </ol>
        </GuideContents>
    )
}