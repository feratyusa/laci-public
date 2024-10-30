import { Chip, IconButton, Typography } from "@material-tailwind/react"
import { DocumentTextIcon, DocumentIcon } from "@heroicons/react/24/solid"
import { filesize } from "filesize"
import { FileExtensions } from "@/Base/FileExtensions"
import InputError from "./InputError"
import { useEffect, useState } from "react"

export default function MultipleFileInput({files, error='', className='', ...props}){
    const acceptedFile = [FileExtensions.pdf, FileExtensions.doc]
    const [color, setColor] = useState(files?.length == 0 ? 'file:bg-red-500 border-red-100' : 'file:bg-green-500 border-green-100')

    useEffect(() => {
        setColor(files?.length == 0 ? 'file:bg-red-500 border-red-100' : 'file:bg-green-500 border-green-100')
    }, [files])

    return(
        <div className="flex flex-col">
            <input
                className={`file:px-5 file:py-2 file:mr-5 \
                    hover:file:bg-red-300 file:rounded-md file:border-0 \
                    file:text-white file:font-semibold file:text-sm file:\ \
                    border-2 rounded-md ${color} w-full`
                    + " " +className}
                type="file"
                {...props}
                accept={acceptedFile}
            >
            </input>
            <p className="text-sm text-gray-500 italic">
                Only PDF and Word Document
            </p>
            <div className="flex flex-col gap-2">
            {
                files ?
                Object.keys(files).map(key => {
                    const type = files[key].type
                    if(! acceptedFile.find(f => f == type))
                        return(
                            <InputError message={`invalid file type ${type}`}/>    
                        )
                    const color = "green"
                    return(
                        <div className={"container border-2 mt-2 rounded border-green-500"}>
                            <div className="flex flex-row items-center">
                                <IconButton
                                    variant="text"
                                    className="px-10 hover:cursor-default"
                                    color={color}                                
                                >
                                    {
                                        type === acceptedFile[0] ?
                                        <DocumentIcon className="w-full"/> :
                                        <DocumentTextIcon className="w-full"/>
                                    }
                                </IconButton>
                                <div className="flex flex-col items-start justify-start">
                                    <div className="flex flex-row gap-2">
                                        <Typography color={color} variant="h6">Nama: </Typography>
                                        <Typography color={color} variant="paragraph">{files[key].name}</Typography>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Typography color={color} variant="h6">Tipe: </Typography>
                                        <Typography color={color} variant="paragraph">{type === acceptedFile[0] ? "PDF" : "Word Document"}</Typography>
                                    </div>
                                    <div className="flex flex-row gap-2">
                                        <Typography color={color} variant="h6">Ukuran: </Typography>
                                        <Typography color={color} variant="paragraph">{filesize(files[key].size)}</Typography>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }) :
                ''
            }        
            </div>
        </div>
    )
}