import InputError from "@/Components/Form/InputError"
import TextInput from "@/Components/Form/TextInput"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { Cog8ToothIcon, PlusIcon } from "@heroicons/react/24/solid"
import { useForm } from "@inertiajs/react"
import { Button, IconButton } from "@material-tailwind/react"
import { useState } from "react"

export default function FormJenisDialog({
    jenis={nama: '', deskripsi: ''},
    route,
    mode='create',
    icon=false,
    iconSize="sm"
}){
    const {data, setData, post, put, errors, reset, processing} = useForm({
        nama: jenis.nama,
        deskripsi: jenis.deskripsi
    })

    console.log("errors")
    console.log(errors)

    const [open, setOpen] = useState(false)

    function submit(){
        console.log(data)
        if (mode == 'edit') {
            put(route, {
                preserveState: true,
                onSuccess: () => {
                    console.log("success")
                }
            })
        }
        else{
            post(route, {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                }
            })
        }
    }

    return(
        <>
            {
                icon == false ?
                <Button color={mode == 'edit' ? 'amber' : 'blue'} className="flex items-center gap-2" onClick={() => setOpen(true)}>
                    <PlusIcon className="w-5"/>
                    {`${mode == 'edit' ? "Edit" : "Tambah"} Jenis Sertifikasi`}
                </Button>
                :
                <IconButton size={iconSize} color={mode == 'edit' ? 'amber' : 'blue'} onClick={() => setOpen(true)}>
                    {mode == 'edit' ? <Cog8ToothIcon className="w-full" /> : <PlusIcon className="w-full"/>}
                </IconButton>
            }
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">

            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/30 ease-in duration-200 data-[closed]:opacity-0"
            />

            {/* Full-screen container to center the panel */}
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                {/* The actual dialog panel  */}
                <DialogPanel
                    transition
                    className="w-full max-w-2xl max-h-[90vh] space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0 overflow-auto"
                >
                <DialogTitle className="flex items-center justify-center">
                    <p className="text-2xl font-bold text-red-500">
                        {`${mode == 'edit' ? "Edit" : "Tambah"} Jenis Sertifikasi`}
                    </p>
                </DialogTitle>
                <div className='py-5'>
                    <div className='mb-5'>
                        <label htmlFor='name'>
                            Nama Sertifikasi
                        </label>
                        <TextInput
                            id="name"
                            placeholder="Nama Jenis Sertifikasi"
                            value={data.nama}
                            onChange={(e) => setData('nama', e.target.value)}
                        />
                        <InputError message={errors.nama} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='description'>
                            Deskripsi
                        </label>
                        <TextInput
                            id="description"
                            placeholder="Deskripsi Jenis Sertifikasi"
                            value={data.deskripsi}
                            onChange={(e) => setData('deskripsi', e.target.value)}
                        />
                        <InputError message={errors.deskripsi} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <Button color="green" onClick={() => submit()} loading={processing}>
                        Submit
                    </Button>
                    <Button color="amber" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </div>
                </DialogPanel>
            </div>
            </Dialog>
        </>
    )
}
