import { Button, Chip, IconButton } from "@material-tailwind/react";
import GuideContents from "./GuideContents";
import LinkWord from "@/Components/LinkWord";
import { Link } from "@inertiajs/react";
import { ArrowPathIcon, ArrowUpOnSquareIcon, BanknotesIcon, CheckIcon, Cog8ToothIcon, DocumentPlusIcon, EyeIcon, PlusIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function EventGuide(){
    const title = 'Panduan Event'
    const summary = `Event adalah setiap Pelatihan yang terjadi sesuai dengan Usulan yang terkait. Event menjelaskan 
                    tentang Tanggal mulai, tanggal selesai, Jumlah Peserta, Anggaran Realisasi, dan Lokasi pelaksanaan.
                    Event dapat digunakan untuk melakukan Manajemen Peserta, mengambil dan mengecek status keikutsertaan peserta
                    pada pelatihan. Anggaran yang ada pada Event akan digunakan untuk acuan rekap Anggaran yang telah dikeluarkan.`
    const toc = [
        {title: 'Manajemen Event', content: '#event', child: [
            {title: 'Membuat Event', content: '#create-event'},
            {title: 'Melihat Event', content: '#see-event'},
            {title: 'Mengedit Event', content: '#edit-event'},
            {title: 'Menghapus Event', content: '#delete-event'},
            {title: 'Memasukkan Berkas untuk Event', content: '#file-event'},
        ]},
        {title: 'Tipe Jumlah Peserta', content: '#participants-type-event'},
        {title: 'Mengatur Anggaran', content: '#budget-event'},
        {title: 'Status Event', content: '#status-event'},    
    ]
    return(
        <GuideContents title={title} summary={summary} toc={toc}>
            <ol className="list-inside list-[upper-alpha] text-lg">
                <li id="event" className="font-bold text-red-500 mt-10">Manajemen Event</li>
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
                            halaman Event, seperti pada tombol di atas. Form pembuatan Event akan muncul 
                            dimana input yang diperlukan untuk diisi adalah Nama, Proposal / Usulan, 
                            Tanggal Mulai Event, Tanggal Selesai Event, Jumlah Peserta Pelatihan awal, User yang 
                            ditugaskan (<i>di-assign</i>) untuk melengkapi Event, dan Lokasi pelaksanaan pelatihan.
                        </p>                        
                    </div>
                    <li id="see-event" className="font-bold mb-2">Melihat Event</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="blue" className="mb-2">
                                <EyeIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Event dapat dilihat dengan menekan tombol `Lihat Detail` seperti pada ikon di atas
                            pada salah satu event di halaman Event.                            
                        </p>
                    </div>
                    <li id="edit-event" className="font-bold mb-2">Mengedit Event</li>
                    <div className="pl-4 mb-2">                
                            <IconButton size="sm" color="amber" className="mb-2">
                                <Cog8ToothIcon className="w-full"/>
                            </IconButton>                        

                        <p className="mb-2">
                            Event dapat diedit dengan menekan tombol ikon di atas
                            pada salah satu usulan di halaman Event atau 
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
                            pada salah satu event di halaman Event atau 
                            saat melihat detail event. <b>Event yang dihapus tidak dapat dikembalikan. Peserta dan Berkas / File yang berkaitan dengan Event juga akan ikut terhapus.</b>
                        </p>
                    </div>
                    <li id="file-event" className="font-bold mb-2">Memasukkan Berkas untuk Event</li>
                    <div className="pl-4 mb-2">                
                            <Button size="sm" color="green" className="flex gap-2 mb-2">
                                <DocumentPlusIcon className="w-5"/>
                                File
                            </Button>                        

                        <p className="mb-2">
                           Berkas / File untuk Event dapat ditambahkan dengan masuk ke detail salah satu event dan menekan ikon di atas. 
                           File yang dimasukkan harus berupa <b>PDF atau Word Document</b> dengan <b>maksimal ukuran adalah 100MB</b>
                        </p>
                    </div>
                </ol>
                <li id="participants-type-event" className="font-bold text-red-500 mt-10">Tipe Jumlah Peserta</li>
                    <div className="pl-5">
                        <p className="mb-2">
                            Tipe Jumlah Peserta menentukan apakah nilai jumlah peserta dimasukkan secara manual (menggunakan form pembuatan / edit Event)
                            dan akan bernilai "Static" atau sesuai dengan jumlah peserta yang dimasukkan pada halaman bagian Peserta Event dan akan bernilai "Dynamic".                    
                        </p>
                        <p>
                            Tipe jumlah peserta akan berubah menjadi "Dynamic" setelah dimasukkan Peserta melalui halaman
                            bagian Peserta. Tipe dapat ditukar nilainya secara manual dengan mengklik "Ganti Tipe".
                        </p>
                    </div>
                <li id="budget-event" className="font-bold text-red-500 mt-10">Mengatur Anggaran</li>
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
                            <p className="text-center text-sm italic">Status Anggaran masih Awal (HPS)</p>
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
                            <p className="text-center text-sm italic">Status Anggaran sudah Realisasi</p>
                        </div>
                        <div className="flex flex-col items-center gap-10 mb-2">
                            
                        </div>
                    </div>                    
                    <p className="mb-2">
                        Anggaran setelah Event pertama kali dibuat akan disesuaikan dengan Anggaran Awal yang sudah diatur oleh Usulan terkait dan statusnya menjadi Anggaran Awal. 
                        <b> Untuk mengubah anggaran awal menjadi Anggran Realisasi dengan cara di-input secara manual,
                        sistem akan menganggap anggaran yang dimasukkan adalah Anggaran Realisasi.</b>
                    </p>
                    <p className="mb-2">
                        Input filed "Default Partisipan" pada dialog Atur Anggaran, jika dicentang maka menunjukkan jumlah individu akan sama dengan jumlah peserta pada Event mengikut aturan pada Tipe Jumlah Peserta.
                        Sebaliknya, maka perlu dimasukkan jumlah individu yang menggunakan anggaran yang dimasukkan.
                    </p>
                    <p className="mb-2">
                        Status Anggaran dapat diubah dengan tombol "Ganti Tipe" tepat di sebelah Status Anggaran Event. Jika mengubah status anggaran dari Anggaran Realisasi
                        menjadi Anggaran Awal maka Anggaran Realisasi akan dihapus dan digantikan dengan Anggaran Awal pada Usulan terkait. Jika mengubah status anggaran dari
                        Anggaran Awal menjadi Anggaran Realisasi tanpa melalui Atur Anggaran maka sistem akan menganggap Anggaran Awal merupakan Anggaran Realisasi.
                    </p>                    
                </div>
                <li id="status-event" className="font-bold text-red-500 mt-10">Status Event</li>
                <div className="mb-4 grid grid-rows-2 grid-flow-col px-20 gap-3">
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
                    <div className="text-center italic text-sm">
                        <IconButton size="sm" color="red">
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
                    <div className="text-center italic text-sm">
                        <IconButton size="sm" color="red">
                            <ArrowUpOnSquareIcon className="w-full" />
                        </IconButton>
                        <p>Belum Migrasi Peserta ke Tabel Diklat</p>
                    </div>
                    <div className="text-center italic text-sm">
                        <IconButton size="sm" color="green">
                            <ArrowUpOnSquareIcon className="w-full" />
                        </IconButton>
                        <p>Sudah Migrasi Peserta ke Tabel Diklat</p>
                    </div>
                </div>
            </ol>
        </GuideContents>
    )
}