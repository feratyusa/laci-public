import { TOC } from "@/Base/TOC"
import { BookOpenIcon, DocumentIcon } from "@heroicons/react/24/solid"
import { Button } from "@material-tailwind/react"
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
                <a href="guidebook.pdf" target="__blank">
                    <Button color="red" className="flex items-center gap-3">
                        <DocumentIcon className="w-8"/>
                        PDF Panduan LACI
                    </Button>
                </a>
            </div>
        </div>
    )
}
