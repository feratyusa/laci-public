import InputError from "@/Components/Form/InputError";
import TextInput from "@/Components/Form/TextInput";
import LoadingCircle from "@/Components/Loading/LoadingCircle";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { first, get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";

export default function FormLembagaDialog({
    sandi=null,
    routes,
    mode="create",
    icon=false,
    iconSize="sm"
}){

    const [open, setOpen] = useState(false)

    return(
        <>
            {
                icon == false ?
                <Button color={mode == 'edit' ? 'amber' : 'blue'} className="flex items-center gap-2" onClick={() => setOpen(true)}>
                    <PlusIcon className="w-5"/>
                    {`${mode == 'edit' ? "Edit" : "Tambah"} Lembaga`}
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
                        {`${mode == 'edit' ? "Edit" : "Tambah"} Lembaga`}
                    </p>
                </DialogTitle>
                <FormLembaga
                    mode={mode}
                    routes={routes}
                    sandi={sandi}
                    setOpen={setOpen}
                />
                </DialogPanel>
            </div>
            </Dialog>
        </>
    )
}

function FormLembaga({
    sandi,
    mode,
    routes,
    setOpen
}){
    const {data, setData, post, put, errors, processing} = useForm({
        sandi: '',
        lengkap: '',
        nope: '',
        cp: '',
    })

    function submit(){
        console.log(data)
        if (mode == 'edit') {
            put(routes)
        }
        else{
            post(routes, {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                }
            })
        }
    }

    useEffect(() => {
        if (sandi) {
            axios.get(route('get.lembaga.getDataRaw', [sandi]))
                .then((response) => {
                    var dRaw = response.data.lembaga
                    setData({
                        sandi: sandi,
                        lengkap: dRaw['lengkap'],
                        nope: dRaw['nope'],
                        cp: dRaw['cp']
                    })
                })
                .catch((error) => {
                    setData({
                        sandi: sandi,
                        lengkap: '',
                        nope: '',
                        cp: '',
                    })
                })
        }
        else{
            axios.get(route('input.lembaga.newSandi'))
                .then((response) => {
                    setData('sandi', response.data.sandi)
                })
        }
    }, [sandi])

    return(
        <>
            <div className='grid grid-cols-2 gap-2'>
                <div className='col-span-2'>
                    <label htmlFor='name'>
                        Sandi Lembaga
                    </label>
                    <TextInput
                        id="id"
                        value={data.sandi}
                        disabled
                    />
                    <InputError message={errors.sandi} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div className="col-span-2">
                    <label htmlFor='nama'>
                        Nama Lembaga
                    </label>
                    <TextInput
                        id="nama"
                        placeholder="Nama Kursus"
                        value={data.lengkap}
                        onChange={(e) => setData('lengkap', e.target.value)}
                    />
                    <InputError message={errors.lengkap} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div className="col-span-2">
                    <label htmlFor='cp'>
                        Contact Person
                    </label>
                    <TextInput
                        id="cp"
                        placeholder="Contact Person"
                        value={data.cp}
                        onChange={(e) => setData('cp', e.target.value)}
                    />
                    <InputError message={errors.cp} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div className="col-span-2">
                    <label htmlFor='cp'>
                        Nomor Telepon
                    </label>
                    <TextInput
                        id="cp"
                        placeholder="Nomor Telepon (Format: 62xxxxxx)"
                        value={data.nope}
                        onChange={(e) => setData('nope', e.target.value)}
                    />
                    <p className="text-sm italic text-gray-500 font-extralight">Format: 62xxxxxx</p>
                    <InputError message={errors.nope} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
            </div>
            <div className="flex items-center justify-center gap-5">
                <Button color="green" onClick={() => submit()} loading={processing}>
                    Submit
                </Button>
                <Button color="amber" onClick={() => {
                    setOpen(false)
                    reset()
                }}>
                    Cancel
                </Button>
            </div>
        </>
    )
}
