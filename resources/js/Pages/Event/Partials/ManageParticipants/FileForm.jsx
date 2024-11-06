import { Button } from "@material-tailwind/react"
import axios from "axios"

export default function FileForm({data, setData, errors, setFile}){
    console.log(errors)
    return(
        <div>
            <div className="mb-5">
                <p className="text-red-500 font-bold mb-2">Template File</p>
                <a href={route('event.download.templateFileParticipants')} target="__blank">
                    <Button size="sm" color="green">
                        Download Template File
                    </Button>
                </a>
            </div>
            <div className="mb-5">
                <p className="text-red-500 font-bold mb-2">
                    Masukkan File
                </p>
                <input
                    className="mb-2 border-2 border-red-500 rounded-lg p-3 w-full file:text-white file:bg-red-500 file:p-2 file:border-none file:rounded-lg" 
                    type="file"
                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <p className="text-gray-500 text-sm italic">
                    *NIP yang sudah mengikuti kursus akan dimasukkan ke bagian TERHAPUS
                </p>
            </div>
        </div>
    )
}