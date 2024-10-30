import LinkWord from "@/Components/LinkWord";
import GuideContents from "./GuideContents";
import { Button, IconButton } from "@material-tailwind/react";
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, BanknotesIcon, CheckIcon, Cog8ToothIcon, DocumentCheckIcon, ExclamationTriangleIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { DocumentPlusIcon, EyeIcon } from "@heroicons/react/24/solid";

export default function ProposalGuide(){
    const title = 'Panduan Usulan'
    const summary = `Usulan digunakan sebelum pembuatan Event / Pelatihan untuk mengatur Jenis Kursus, 
                        Anggaran Awal (Harga Perkiraan Sendiri), dan juga nota usulan pelatihan`
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
                <li id="proposal" className="font-bold text-red-500 mb-2">Manajemen Usulan</li>
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
                            halaman <LinkWord route={route('proposal.index')}>Usulan</LinkWord>, seperti pada tombol di atas.
                            Form pembuatan Usulan akan muncul dimana input yang diperlukan untuk diisi adalah Nama, Tanggal Masuk Usulan,
                            Jenis Kursus, dan User yang ditugaskan (<i>di-assign</i>) untuk melengkapi <LinkWord route={route('proposal.index')}>Usulan</LinkWord>.
                        </p>
                    </div>
                    <li id="see-proposal" className="font-bold mb-2">Melihat Usulan</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="blue" className="mb-2">
                                <EyeIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Usulan dapat dilihat dengan menekan tombol `Lihat Detail` seperti pada ikon di atas
                            pada salah satu usulan di halaman <LinkWord route={route('proposal.index')}>Usulan</LinkWord>.
                            Disini dapat dilihat detail dari usulan dan berkas apa saja yang wajib dimasukkan dan yang sudah dimasukkan.
                        </p>
                    </div>
                    <li id="edit-proposal" className="font-bold mb-2">Mengedit Usulan</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="amber" className="mb-2">
                                <Cog8ToothIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Usulan dapat diedit dengan menekan tombol ikon di atas
                            pada salah satu usulan di halaman <LinkWord route={route('proposal.index')}>Usulan</LinkWord> atau 
                            saat melihat detail usulan.
                        </p>
                    </div>
                    <li id="delete-proposal" className="font-bold mb-2">Menghapus Usulan</li>
                    <div className="pl-4 mb-2">
                            <IconButton size="sm" color="red" className="mb-2">
                                <TrashIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Usulan dapat dihapus dengan menekan tombol ikon di atas
                            pada salah satu usulan di halaman <LinkWord route={route('proposal.index')}>Usulan</LinkWord> atau 
                            saat melihat detail usulan. <b>Usulan yang dihapus tidak dapat dikembalikan. Berhati-hatilah menghapus usulan!</b>
                        </p>
                    </div>
                    <li id="file-proposal" className="font-bold mb-2">Memasukkan Berkas untuk Usulan</li>
                    <div className="pl-4 mb-2">                
                            <Button size="sm" color="green" className="flex gap-2 mb-2">
                                <DocumentPlusIcon className="w-5"/>
                                File
                            </Button>                        

                        <p className="mb-2">
                           Berkas untuk <LinkWord route={route('proposal.index')}>Usulan</LinkWord> dapat ditambahkan dengan masuk ke detail salah satu usulan dan menekan ikon di atas. Dialog untuk
                           menambahkan file akan muncul. File yang dimasukkan harus berupa <b>PDF</b> dan <b>maksimal ukuran adalah 100MB</b>
                        </p>
                    </div>
                </ol>
                <li id="budget-proposal" className="font-bold text-red-500 mb-2">Mengatur Anggaran Awal / Harga Perkiraan Sendiri (HPS)</li>
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
                        Mengatur anggaran awal dapat dilakukan dengan menekan tombol seperti di atas. <b>Anggaran Awal (Harga Perkiraan Sendiri) ini akan
                        digunakan untuk menjadi harga awal saat membuat event baru.</b> Jika anggaran masih kosong makan tombol akan berwarna <b>kuning</b> seperti
                        tombol di sebelah kiri, sebaliknya jika sudah diatur maka akan berwarna <b>hijau</b>. Anggaran awal juga dapat dihapus / direset dengan mengklik
                        tombol <span className="font-bold text-red-500">Reset</span> pada dialog mengatur Detail Anggaran Awal.
                    </p>
                </div>
                <li id="status-proposal" className="font-bold text-red-500 mb-2">Status Usulan</li>
                <div className="mb-4 grid grid-cols-3 gap-3">
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
                            <p>Berkas Event Belum Lengkap</p>
                        </div>
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="green">
                                <ArchiveBoxIcon className="w-full" />
                            </IconButton>
                            <p>Berkas Event Lengkap</p>
                        </div>
                    </div>
                </div>
                <li id="event-proposal" className="font-bold text-red-500 mb-2">Meninjau Event dari Usulan</li>
                <div className="mb-2 pl-5">
                    <p>Pada detail usulan terdapat baris Event yang dimana menunjukkan Event apa saja yang terhubung dengan usulan yang dipilih.
                        Selain itu, pengguna dapat langsung menuju detail event yang dimaksud. Dan juga pada bagian ini terdapat tombol <b>Tambah Event</b> yang
                        dimana dapat digunakan untuk menuju ke form pembuatan <LinkWord route={route('event.index')}>Event</LinkWord> dengan <b>bagian input Usulan (Proposal) 
                        terisi dengan usulan yang sedang dilihat</b>.
                    </p>
                </div>
            </ol>
        </GuideContents>
    )
}