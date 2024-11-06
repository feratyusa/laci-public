import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react"
import { UserPlusIcon } from "@heroicons/react/24/solid"
import { useForm } from "@inertiajs/react"
import { Typography, Button, Tooltip } from "@material-tailwind/react"
import axios from "axios"
import { useEffect, useState } from "react"
import ReactSelect from "react-select"

function ParticipantForm({loaded=false, participants, data, handleSelectChange}){
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
                isLoading={loaded == false}
            />
        </div>
    )
}

export default function DialogAddParticipant({
    route, 
    reload,
    setReload,
    event_id,
    ...props
}){
    const {data, setData, reset, post, processing} = useForm({
        'nip': [],        
    })

    const [participants, setParticipants] = useState([])
    const [loaded, setLoaded] = useState(false)

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
            onSuccess: () => {
                handleClose()
                setReload(true)
            }
        })
    }

    useEffect(() => {
        axios.get('/api/input/availableEmployees', {params: {event_id: event_id}})
            .then((response) => {
                setParticipants(response.data.availableEmployees)
                setLoaded(true)
            })
    }, [])

    return(
        <>
            <Tooltip content={"Tambah Peserta Manual"}>
                <Button
                    onClick={handleOpen}
                    color="blue"
                    size="md"
                    className="flex items-center gap-3"
                >
                    <UserPlusIcon className="w-5" />
                    <div>Peserta</div>
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
                                Tambah Peserta secara Manual
                            </Typography>                            
                            <ParticipantForm
                                loaded={loaded}                            
                                participants={participants}
                                data={data}
                                handleSelectChange={(e) => handleSelectChange(e)}
                            />
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="green"
                                    loading={processing}
                                    onClick={handleAdd}
                                    >
                                    Tambah
                                </Button>
                                <Button
                                    color="yellow"
                                    onClick={handleClose}
                                    >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </> 
    )
}