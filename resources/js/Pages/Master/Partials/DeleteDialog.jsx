import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export default function DeleteDialog({variant="icon", 
    route, 
    category,
    title=null,
    body=null
}){
    const { delete: destroy } = useForm()
    const [open, setOpen] = useState(false)

    function handleDelete(){
        destroy(route, {
            preserveScroll: true,
            onSuccess: setOpen(false)
        })
    }

    return(
        <>
            {
                variant == 'text' ?
                <Button>

                </Button>
                :
                <IconButton size="sm" color="red" onClick={() => setOpen(true)}>
                    <TrashIcon className="w-full"/>
                </IconButton>
            }
            <Dialog onClose={() => setOpen(false)} open={open} className="relative z-50">
                <DialogBackdrop 
                    transition
                    className="fixed inset-0 bg-black/30 duration-200 data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full bg-white max-w-2xl rounded-2xl p-12 ease-in duration-200 data-[closed]:opacity-0"
                    >
                        <DialogTitle className="text-center">
                            <p className="uppercase font-bold">{title ?? "Hapus File Kategori"}</p>
                            <p className="italic text-xs text-gray-500">Kategori: {category.name}</p>
                        </DialogTitle>
                        <div className="py-8">
                            <p className="text-center">
                                {body ?? `Kategori ${category.name} akan dihapus. Kategori yang telah dihapus tidak dapat dikembalikan. 
                                Yakin ingin menghapus kategori ini?`}
                            </p>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <Button  color="red" onClick={() => handleDelete()}>Hapus</Button>
                            <Button onClick={() => setOpen(false)} color="blue">Batal</Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}