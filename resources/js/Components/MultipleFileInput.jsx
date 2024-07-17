import { Chip, IconButton, Typography } from "@material-tailwind/react"
import { useState } from "react"
import { DocumentTextIcon, DocumentIcon } from "@heroicons/react/24/solid"
import { filesize } from "filesize"

export default function MultipleFileInput({files, className='', ...props}){
    const acceptedFile = {
        pdf: "application/pdf", // PDF
        doc: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"  // Word Document
    }

    return(
        <div className="flex flex-col">
            <input
                className={"file:px-5 file:py-2 file:mr-5 \
                    file:bg-red-500 hover:file:bg-red-300 file:rounded-md file:border-0 \
                    file:text-white file:font-semibold file:text-sm file:\ \
                    border-2 rounded-md border-red-100 w-full"
                    + " " +className}
                type="file"
                {...props}
                accept={[acceptedFile.pdf, acceptedFile.doc]}
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
                    const color = files[key].type === acceptedFile.pdf ? "red" : "blue"
                    return(
                        <div className={type === acceptedFile.pdf ? "container border-2 mt-2 rounded border-red-500" 
                                                                    : "container border-2 mt-2 rounded border-blue-500"}>
                            <div className="flex flex-row items-center">
                                <IconButton
                                    variant="text"
                                    className="px-10 hover:cursor-default"
                                    color={color}                                
                                >
                                    {
                                        type === acceptedFile.pdf ?
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
                                        <Typography color={color} variant="paragraph">{type === acceptedFile.pdf ? "PDF" : "Word Document"}</Typography>
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