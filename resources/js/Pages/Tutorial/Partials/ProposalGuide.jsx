import LinkWord from "@/Components/LinkWord";
import GuideContents from "./GuideContents";
import { Button, IconButton } from "@material-tailwind/react";
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, BanknotesIcon, CheckIcon, Cog8ToothIcon, DocumentCheckIcon, ExclamationTriangleIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { DocumentPlusIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function ProposalGuide(){
    const title = 'Panduan Usulan'
    const summary = `Usulan digunakan sebelum pembuatan Event / Pelatihan untuk mengatur Jenis Kursus, 
                        Anggaran Awal (Harga Perkiraan Sendiri), Lembaga yang digunakan, serta Dokumen yang mendukung
                        Usulan Pelatihan lainnya. Usulan wajib untuk dibuat sebelum bisa membuat Event / Pelatihan.`
    const toc = [
        {title: 'Manajemen Usulan', content: '#proposal', child: [
            {title: 'Membuat Usulan', content: '#create-proposal'},
            {title: 'Melihat Usulan', content: '#see-proposal'},
            {title: 'Mengedit Usulan', content: '#edit-proposal'},
            {title: 'Menghapus Usulan', content: '#delete-proposal'},
            {title: 'Memasukkan Berkas untuk Usulan', content: '#file-proposal'},
        ]},
        {title: 'Status Usulan', content: '#status-proposal'},
        {title: 'Mengatur Anggaran Awal / Harga Perkiraan Sendiri (HPS)', content: '#budget-proposal'},        
        {title: 'Meninjau Event dari Usulan', content: '#event-proposal'},
    ]

    return(
        <GuideContents summary={summary} title={title} toc={toc}>
            <ol className="list-inside list-[upper-alpha] text-lg">
                <li id="proposal" className="font-bold text-red-500 mt-10">Manajemen Usulan</li>
                <ol className="list-inside pl-5 list-decimal">
                    <li id="create-proposal" className="font-bold mb-2">Membuat Usulan</li>
                    <div className="pl-4 mb-2">
                        <Link href={route('proposal.create')}>
                            <Button className="flex gap-2 items-center mb-2" size="sm" color="green">
                                <PlusIcon className="w-5"/>
                                Usulan
                            </Button>
                        </Link>

                        <p className="mb-2">
                            Usulan dapat ditambahkan dengan menekan tombol tambah usulan pada
                            halaman Usulan, seperti pada tombol di atas. Form pembuatan Usulan akan 
                            muncul dimana input yang diperlukan untuk diisi adalah Nama, Tanggal Masuk Usulan,
                            Lembaga yang digunakan, Jenis Kursus, dan User yang ditugaskan (<i>di-assign</i>) 
                            untuk melengkapi Usulan.
                        </p>
                    </div>
                    <li id="see-proposal" className="font-bold mb-2">Melihat Usulan</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="blue" className="mb-2">
                                <EyeIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Usulan dapat dilihat dengan menekan tombol `Lihat Detail` seperti pada ikon di atas
                            pada salah satu usulan di halaman Usulan. Pada halaman detail Usulan dapat dilihat
                            detail dari Usulan beserta Berkas / File yang terkait dengan Usulan tersebut.
                        </p>
                    </div>
                    <li id="edit-proposal" className="font-bold mb-2">Mengedit Usulan</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="amber" className="mb-2">
                                <Cog8ToothIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Usulan dapat diedit dengan menekan tombol ikon di atas
                            pada salah satu usulan di halaman Usulan atau
                            saat melihat detail usulan. Form input yang perlu dilengkapi sama seperti saat membuat Usulan.
                        </p>
                    </div>
                    <li id="delete-proposal" className="font-bold mb-2">Menghapus Usulan</li>
                    <div className="pl-4 mb-2">
                            <IconButton size="sm" color="red" className="mb-2">
                                <TrashIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Usulan dapat dihapus dengan menekan tombol ikon di atas
                            pada salah satu usulan di halaman Usulan atau 
                            saat melihat detail usulan. 
                            <b> Usulan yang telah dihapus tidak dapat dikembalikan dan berkas atau event yang terkait dengan Usulan akan ikut terhapus.</b>
                        </p>
                    </div>
                    <li id="file-proposal" className="font-bold mb-2">Memasukkan Berkas untuk Usulan</li>
                    <div className="pl-4 mb-2">                
                            <Button size="sm" color="green" className="flex gap-2 mb-2">
                                <DocumentPlusIcon className="w-5"/>
                                File
                            </Button>                        

                        <p className="mb-2">
                           Berkas dapat ditambahan dengan mengklik tombol di atas pada halaman 
                           Usulan bagian File atau dengan menaruh file pada bagian kategori
                           yang ada pada Usulan. File yang dimasukkan harus 
                           berupa <b>PDF dan Word Document</b> dengan <b>maksimal ukuran adalah 100MB</b>
                        </p>
                    </div>
                </ol>
                <li id="budget-proposal" className="font-bold text-red-500 mt-10">Mengatur Anggaran Awal / Harga Perkiraan Sendiri (HPS)</li>
                <div className="pl-5">
                    <div className="flex items-center gap-10 mb-2">
                        <Button className="flex gap-2 mb-2 items-center" size="sm" color="amber">
                            <BanknotesIcon className="w-5"/>
                            Detail
                        </Button>
                        <Button className="flex gap-2 mb-2 items-center" size="sm" color="green">
                            <BanknotesIcon className="w-5"/>
                            Detail
                        </Button>
                    </div>
                    <p className="mb-2">
                        Mengatur anggaran awal dapat dilakukan dengan menekan tombol seperti di atas. Anggaran Awal (Harga Perkiraan Sendiri) akan
                        digunakan untuk menjadi harga awal saat membuat Event baru dengan Usulan yang sama. Jika anggaran masih kosong makan tombol akan berwarna 
                        kuning seperti tombol di sebelah kiri, sebaliknya jika sudah diatur maka akan berwarna hijau. Anggaran awal juga dapat dihapus / direset 
                        dengan mengklik tombol Reset pada dialog mengatur Detail Anggaran Awal.
                    </p>
                </div>
                <li id="status-proposal" className="font-bold text-red-500 mt-10">Status Usulan</li>
                <div className="mb-4 grid grid-cols-3 px-32 gap-3">
                    <div className="grid grid-rows-2 gap-5">
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="amber">
                                <XMarkIcon className="w-full" />
                            </IconButton>
                            <p>Berkas Belum Lengkap</p>
                        </div>
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="green">
                                <CheckIcon className="w-full" />
                            </IconButton>
                            <p>Berkas Lengkap</p>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-5">
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="amber">
                                <ExclamationTriangleIcon className="w-full" />
                            </IconButton>
                            <p>Belum Punya Event</p>
                        </div>
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="green">
                                <DocumentCheckIcon className="w-full" />
                            </IconButton>
                            <p>Punya Event</p>
                        </div>
                    </div>
                    <div className="grid grid-rows-2 gap-5">
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="amber">
                                <ArchiveBoxXMarkIcon className="w-full" />
                            </IconButton>
                            <p>Berkas Event Belum Lengkap (Event yang terkait dengan Usulan)</p>
                        </div>
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="green">
                                <ArchiveBoxIcon className="w-full" />
                            </IconButton>
                            <p>Berkas Event Lengkap (Event yang terkait dengan Usulan)</p>
                        </div>
                    </div>
                </div>
                <li id="event-proposal" className="font-bold text-red-500 mt-10">Meninjau Event dari Usulan</li>
                <div className="mb-2 pl-5">
                    <p>Pada detail usulan terdapat baris Event yang dimana menunjukkan Event apa saja yang terhubung dengan usulan yang dipilih.
                        Selain itu, pengguna dapat langsung menuju detail event yang dimaksud. pada bagian ini terdapat tombol `Tambah Event` yang
                        dapat digunakan untuk menuju ke form pembuatan Event dengan bagian input Usulan (Proposal) 
                        telah terisi.
                    </p>
                </div>
            </ol>
        </GuideContents>
    )
}