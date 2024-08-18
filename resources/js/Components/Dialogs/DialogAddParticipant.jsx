import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid"
import { useForm } from "@inertiajs/react"
import { Typography, Button, IconButton, Tooltip } from "@material-tailwind/react"
import { useState } from "react"
import ReactSelect from "react-select"

function ParticipantForm({participants, data, handleSelectChange}){
    return(
        <div className="w-full">
            <ReactSelect 
                classNamePrefix="select2-selection"
                value={participants.filter(p => data.nip.includes(p.value))}
                options={participants}
                isSearchable
                isClearable
                onChange={handleSelectChange}
                isMulti
            />
        </div>
    )
}

export default function DialogAddParticipant({
    route, 
    participants=[],
    ...props
}){
    const {data, setData, reset, post, processing} = useForm({
        'nip': [],
        'file': ''
    })

    const [open, setOpen] = useState(false)

    function handleSelectChange(e=[]){
        var elements = []
        console.log(e)
        e.forEach((element) => {
            elements.push(element.value)
        })
        setData('nip', [...elements])        
    }
    function handleOpen(){
        setOpen(true)
    }
    function handleClose() {
        reset()
        setOpen(false)
    }
    function handleAdd(){
        post(route, {
            onSuccess: handleClose()
        })
    }

    return(
        <>
            <Tooltip content={"Tambah Partisipan "}>
                <Button
                    onClick={handleOpen}
                    color="blue"
                    size="md"
                    className="flex items-center h-fit w-fit gap-3"
                >
                    <UserPlusIcon className="w-5" />
                    <div>Partisipan</div>
                </Button>
            </Tooltip>
            <Dialog open={open} as="div" className="relative z-10 focus:outline-none" onClose={handleClose}>
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/5" />

                {/* Dialog Content */}
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-3xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                            <Typography variant="h5" className="mb-8">
                                Tambah Partisipan
                            </Typography>
                            <ParticipantForm 
                                participants={participants}
                                data={data}
                                handleSelectChange={(e) => handleSelectChange(e)}
                            />
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="yellow"
                                    onClick={handleClose}
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    color="green"
                                    loading={processing}
                                    onClick={handleAdd}
                                    >
                                    Tambah
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </> 
    )
}