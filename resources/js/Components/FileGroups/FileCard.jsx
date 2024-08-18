import { DocumentIcon } from "@heroicons/react/24/outline";
import DialogDelete from "../Dialogs/DialogDelete";
import { filesize } from "filesize";
import DialogInfoFile from "../Dialogs/DialogInfoFile";

const mimeTypeColor = (mime_type) => {
    if(mime_type === 'pdf') return "red"
    else if(mime_type === 'docx') return "blue"
    return ""
}

export default function FileCard({file, ...props}){
    return(        
        <div className="grid grid-cols-12 gap-2 items-center border-2 border-gray-500 bg-white py-2 px-5 my-2 rounded-lg hover:border-red-500" {...props}>
            <div className="col-span-1 w-6">
                <DocumentIcon className="w-full" color={mimeTypeColor(file.mime_type)}/>
            </div>
            <div className="col-span-5 grid grid-rows-2 gap-2 items-center w-full text-xs">     
                <div className="w-full truncate">
                    <p className="font-bold uppercase truncate">{file.name}</p>
                </div>
                <div className="grid grid-cols-2 items-center w-full">
                    <div className="w-full max-w-16 px-2 border-l-2 border-gray-500">
                        <p className="font-bold uppercase">{file.mime_type}</p>
                    </div>
                    <div className="w-full max-w-28 border-l-2 border-gray-500 px-2">
                        <p className="font-bold">{filesize(file.size)}</p>
                    </div>
                </div>
            </div>
            <div className="col-span-4">
                <div className="bg-red-600 rounded-lg py-1 px-2 w-full h-fit text-center text-xs">
                    <p className="font-bold text-white">{file.category.name}</p>
                </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 items-center">
                <div className="w-full max-w-52">
                    <DialogDelete
                        content={'file'}
                        title={"Hapus File"}
                        message={"Yakin ingin menghapus file "+ file.name + " ?"}
                        route={""}
                        variant="text"
                    />
                </div>
                <div className="w-full ">
                    <DialogInfoFile file={file}/>
                </div>
            </div>
        </div>
    )
}