import {changeToIndonesiaDateTime} from "@/helpers/IndoesiaDate";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { filesize } from "filesize";
import { useState } from "react";
import DialogDelete from "./DialogDelete";

function LabelRow({children, ...props}){
    return(
        <div className="w-full max-w-52 px-2" {...props}>
            {children}
        </div>
    )
}

function InfoRow({children, ...props}){
    return(
        <div className="w-full overflow-auto text-wrap bg-gray-100 py-2 px-5" {...props}>
            {children}
        </div>
    )
}

function RowContent({label, info}){
    return(
        <div className="flex items-center border-b-2 border-gray-500">
            <LabelRow>
                <p className="font-bold">{label}</p>
            </LabelRow>
            <InfoRow>
                <p className="text-gray-900">{info}</p>
            </InfoRow>
        </div>
    )
}

export default function DialogInfoFile({file}){
    const [open, setOpen] = useState(false)

    function handleClose(){        
        setOpen(false)
    }

    function handleOpen(){
        setOpen(true)
    }

    return(
        <>
            <Tooltip content="Detail File">
                <IconButton onClick={handleOpen} color="amber" variant="text" size="sm">
                    <ExclamationCircleIcon className="h-5 w-5"/>
                </IconButton>
            </Tooltip>
            <Dialog open={open} as="div" className="z-10 focus:outline-none max-h-screen" onClose={handleClose}>
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/5" />

                {/* Dialog Content */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl max-h-screen overflow-auto rounded-xl bg-white p-10 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 overflow-auto"
                            >
                            <DialogTitle className="font-bold text-2xl text-center">Informasi File</DialogTitle>
                            
                            <div className="flex flex-col mb-10 mt-5">
                                <RowContent label={"ID"} info={file.id}/>
                                <RowContent label={"Nama"} info={file.name}/>
                                <RowContent label={"Tipe File"} info={file.mime_type.toUpperCase()} />
                                <RowContent label={"Ukuran"} info={filesize(file.size)} />
                                <RowContent label={"Diupload Tanggal"} info={changeToIndonesiaDateTime(file.created_at)}/>
                            </div>
                            <div className="flex gap-5 justify-center">
                                <a href={route('file.show', [file.id])} target="__blank">
                                    <Button color="blue">
                                        Lihat File
                                    </Button>
                                </a>
                                <a href={route('file.download', [file.id])}>
                                    <Button color="green">
                                        Download
                                    </Button>
                                </a>
                                <DialogDelete
                                    content={'file'}
                                    title={"Hapus File"}
                                    message={"Yakin ingin menghapus file "+ file.name + " ?"}
                                    route={route('file.destroy', [file.id])}
                                    mode="button"
                                />
                                <Button
                                    color="amber"
                                    onClick={handleClose}
                                    >
                                    Tutup
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}