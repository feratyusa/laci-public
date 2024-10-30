import { TOC } from "@/Base/TOC"
import { BookOpenIcon } from "@heroicons/react/24/solid"
import { Link } from "@inertiajs/react"
import { useState } from "react"

export default function TableOfContents({
    setGuide
}){
    const [toc, ] = useState(TOC)    
    return(
        <div>
            <div className="flex items-center gap-5 text-red-500 mb-5">
                <BookOpenIcon className="w-10"/>
                <p className="font-bold text-4xl">Panduan Penggunaan LACI</p>
            </div>
            <p className="text-lg mb-5">
                LACI adalah sistem administrasi Learning Center dan sekaligus sebagai 
                sistem untuk melakukan monitoring terhadap perkembangan pendidikan dan pelatihan yang sedang atau sudah dijalankan. 
                <span className="font-bold"> Sangat direkomendasikan</span> bagi pengguna baru untuk membaca <span className="text-red-500 font-bold">Panduan</span> ini 
                sebelum menggunakan fitur yang ada pada LACI.
            </p>

            <div className="w-full h-1 bg-red-100 mb-10 mt-10"></div>

            <div className="mb-10">
                <p className="text-2xl font-bold text-red-500 mb-2">Daftar Isi</p>


                <ol className="list-[upper-alpha] list-inside pl-5" type="A">
                    {
                        toc.map(content => (
                            <Link href={`/tutorials?guide=${content.content}`}>
                                <li 
                                    className="cursor-pointer underline text-lg text-blue-500 hover:text-red-500 mb-1"
                                    key={'tutorial_'+ content.title + '_li'} 
                                >
                                    {content.title}
                                </li>                            
                            </Link>
                        ))
                    }                    
                </ol>
            </div>            
        </div>
    )
}