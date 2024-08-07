import { DocumentIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@material-tailwind/react";
import DialogDelete from "./DialogDelete";

const mimeTypeColor = (mime_type) => {
    if(mime_type === 'pdf') return "red"
    else if(mime_type === 'docx') return "blue"
    return ""
}

export default function FileCard({file, ...props}){
    return(        
        <div className="flex items-center max-w-full justify-between border-2 py-2 px-5 my-2 rounded-lg hover:bg-gray-200" {...props}>
            <div className="flex items-center gap-5">
                <DocumentIcon className="w-8" color={mimeTypeColor(file.mime_type)}/>
                <div className="flex flex-col gap-1">
                    <Tooltip content={file.name}>
                        <p className="text-lg max-w-xl truncate">{file.name}</p>
                    </Tooltip>
                    <p className="uppercase font-bold">{file.mime_type}</p>
                    <div className="rounded-md text-white px-2 py-1 text-center w-fit" style={{backgroundColor: "rgb(255, 0, 102)"}}>
                        <p className="text-xs font-bold truncate">{file.category.name}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center">
                <DialogDelete
                    content={'file'}
                    title={"Hapus File"}
                    message={"Yakin ingin menghapus file "+ file.name + " ?"}
                    route={""}
                    variant="text"
                />
            </div>
        </div>
    )
}