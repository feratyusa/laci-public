import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { TrashIcon } from "@heroicons/react/24/solid"
import { useForm } from "@inertiajs/react"
import { Typography, Button, IconButton, Tooltip } from "@material-tailwind/react"
import { useState } from "react"

export default function DialogDelete({content, title, message, route, variant="filled", ...props}){
    const {delete: destroy, processing} = useForm()
    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }
    function handleClose() {
        setOpen(false)
    }
    function handleDelete(){
        destroy(route)
    }

    return(
        <>
            <Tooltip content={"Hapus "+content}>
                <IconButton
                    onClick={handleOpen}
                    color="red"
                    variant={variant}
                >
                    <TrashIcon className="h-5 w-5" />
                </IconButton>
            </Tooltip>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/5" />

                {/* Dialog Content */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                            <Typography variant="h5" className="mb-8">
                                {title}
                            </Typography>
                            <Typography variant="paragraph">
                                {message}
                            </Typography>
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="yellow"
                                    onClick={handleClose}
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    color="red"
                                    loading={processing}
                                    onClick={handleDelete}
                                    >
                                    Hapus
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </> 
    )
}