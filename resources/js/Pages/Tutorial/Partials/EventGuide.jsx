import { Button, Chip, IconButton } from "@material-tailwind/react";
import GuideContents from "./GuideContents";
import LinkWord from "@/Components/LinkWord";
import { Link } from "@inertiajs/react";
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, ArrowPathIcon, BanknotesIcon, CheckIcon, Cog8ToothIcon, DocumentPlusIcon, EyeIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function EventGuide(){
    const title = 'Panduan Event'
    const summary = 'Event adalah '
    const toc = [
        {title: 'Manajemen Event', content: '#event', child: [
            {title: 'Membuat Event', content: '#create-event'},
            {title: 'Melihat Event', content: '#see-event'},
            {title: 'Mengedit Event', content: '#edit-event'},
            {title: 'Menghapus Event', content: '#delete-event'},
            {title: 'Memasukkan Berkas untuk Event', content: '#file-event'},
        ]},
        {title: 'Status Event', content: '#status-proposal'},
        {title: 'Mengatur Anggaran pada Event', content: '#budget-proposal'},
    ]
    return(
        <GuideContents title={title} summary={summary} toc={toc}>
            <ol className="list-inside list-[upper-alpha] text-lg">
                <li id="event" className="font-bold text-red-500 mb-2">Manajemen Event</li>
                <ol className="list-inside pl-5 list-decimal">
                    <li id="create-event" className="font-bold mb-2">Membuat Event</li>
                    <div className="pl-4 mb-2">
                        <Link href={route('event.create')}>
                            <Button className="flex gap-2 items-center mb-2" size="sm" color="green">
                                <PlusIcon className="w-5"/>
                                Event
                            </Button>
                        </Link>

                        <p className="mb-2">
                            Event dapat ditambahkan dengan menekan tombol tambah event pada
                            halaman <LinkWord route={route('event.index')}>Event</LinkWord>, seperti pada tombol di atas.
                            Form pembuatan Event akan muncul dimana input yang diperlukan untuk diisi adalah Nama, Proposal / Usulan, 
                            Tanggal Mulai Event, Tanggal Selesai Event, Jumlah Peserta Pelatihan, dan User yang ditugaskan (<i>di-assign</i>) untuk 
                            melengkapi <LinkWord route={route('event.index')}>Event</LinkWord>, dan Lokasi pelaksanaan pelatihan.
                        </p>
                    </div>
                    <li id="see-event" className="font-bold mb-2">Melihat Event</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="blue" className="mb-2">
                                <EyeIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Event dapat dilihat dengan menekan tombol `Lihat Detail` seperti pada ikon di atas
                            pada salah satu event di halaman <LinkWord route={route('event.index')}>Event</LinkWord>.
                            Disini dapat dilihat detail dari event dan berkas apa saja yang wajib dimasukkan dan yang sudah dimasukkan.
                        </p>
                    </div>
                    <li id="edit-event" className="font-bold mb-2">Mengedit Event</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="amber" className="mb-2">
                                <Cog8ToothIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Event dapat diedit dengan menekan tombol ikon di atas
                            pada salah satu usulan di halaman <LinkWord route={route('event.index')}>Event</LinkWord> atau 
                            saat melihat detail event.
                        </p>
                    </div>
                    <li id="delete-event" className="font-bold mb-2">Menghapus Event</li>
                    <div className="pl-4 mb-2">
                            <IconButton size="sm" color="red" className="mb-2">
                                <TrashIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Event dapat dihapus dengan menekan tombol ikon di atas
                            pada salah satu event di halaman <LinkWord route={route('event.index')}>Event</LinkWord> atau 
                            saat melihat detail event. <b>Event yang dihapus tidak dapat dikembalikan. Berhati-hatilah menghapus event!</b>
                        </p>
                    </div>
                    <li id="file-proposal" className="font-bold mb-2">Memasukkan Berkas untuk Event</li>
                    <div className="pl-4 mb-2">                
                            <Button size="sm" color="green" className="flex gap-2 mb-2">
                                <DocumentPlusIcon className="w-5"/>
                                File
                            </Button>                        

                        <p className="mb-2">
                           Berkas untuk <LinkWord route={route('event.index')}>Event</LinkWord> dapat ditambahkan 
                           dengan masuk ke detail salah satu event dan menekan ikon di atas. Dialog untuk
                           menambahkan file akan muncul. File yang dimasukkan harus berupa <b>PDF</b> dan <b>maksimal ukuran adalah 100MB</b>
                        </p>
                    </div>
                </ol>
                <li id="budget-event" className="font-bold text-red-500 mb-2">Mengatur Anggaran</li>
                <div className="pl-5">
                    <div className="grid grid-cols-2 gap-5">
                        <div className="mb-2">
                            <div className="flex justify-center mb-2">
                                <Button className="flex gap-2 mb-2 items-center" size="sm" color="amber">
                                    <BanknotesIcon className="w-5"/>
                                    Detail
                                </Button>
                            </div>
                            <div className="flex justify-center mb-2">
                                <Chip 
                                    value="Anggaran Awal"
                                    color="amber"                                    
                                />
                            </div>
                            <p className="text-center text-sm italic">Anggara Awal (HPS)</p>
                        </div>
                        <div className="mb-2">
                            <div className="flex justify-center mb-2">
                                <Button className="flex gap-2 mb-2 items-center" size="sm" color="green">
                                    <BanknotesIcon className="w-5"/>
                                    Detail
                                </Button>
                            </div>
                            <div className="flex justify-center mb-2">
                                <Chip 
                                    value="Anggaran Realisasi"
                                    color="green"                                    
                                />
                            </div>
                            <p className="text-center text-sm italic">Anggara Realisasi</p>
                        </div>
                        <div className="flex flex-col items-center gap-10 mb-2">
                            
                        </div>
                    </div>
                    <p className="mb-2">
                        Mengatur anggaran dapat dilakukan dengan menekan tombol seperti di atas. Anggaran pertama akan disesuaikan dengan
                        anggaran awal yang sudah diatur di <LinkWord route={route('proposal.index')}>Usulan</LinkWord> terkait dan statusnya
                        masih Anggaran Awal. Untuk <b>mengubah anggaran awal menjadi anggaran realisasi adalah dengan menginput manual anggaran realisasinya</b> dengan
                        begitu sistem akan menganggap anggaran yang dimaksud adalah anggaran realisasi. Anggaran Realisasi juga dapat dikembalikan menjadi 
                        anggaran awal. <b>Saat mengembalikan dari Anggaran Realisasi menjadi Anggaran Awal, anggaran realisasi yang telah diinput
                        akan hilang / dihapus dan digantikan dengan anggaran awal yang ada pada usulan terkait.</b> Jika 
                        dari Anggaran Awal ke Anggaran Realisasi, yang terjadi adalah anggaran awal akan dijadikan anggaran realisasi. 
                        Ini dapat dilakukan dengan mengklik ikon pada baris `Status Anggaran` :
                        <ArrowPathIcon color="green" className="w-5"/>
                        
                    </p>
                </div>
                <li id="status-event" className="font-bold text-red-500 mb-2">Status Event</li>
                <div className="mb-4 grid grid-cols-2 gap-3">
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
                                <BanknotesIcon className="w-full" />
                            </IconButton>
                            <p>Anggaran Awal (HPS)</p>
                        </div>
                        <div className="text-center italic text-sm">
                            <IconButton size="sm" color="green">
                                <BanknotesIcon className="w-full" />
                            </IconButton>
                            <p>Anggaran Realisasi</p>
                        </div>
                    </div>
                </div>
            </ol>
        </GuideContents>
    )
}