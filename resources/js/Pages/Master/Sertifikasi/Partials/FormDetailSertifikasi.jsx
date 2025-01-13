import InputError from "@/Components/Form/InputError";
import TextInput from "@/Components/Form/TextInput";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import ReactSelect from "react-select";

export default function FormDetailSerfikasi({
    route,
    detail={kursus_id: [], level_sertifikasi_id: ''},
    mode="create",
    icon=false,
    iconSize="sm",
}){
    const {data, setData, post, errors, put, reset, processing, clearErrors} = useForm({
        kursus_id: detail.kursus_id,
        level_sertifikasi_id: detail.level_sertifikasi_id
    })

    const [open, setOpen] = useState(false)

    function submit(){
        if (mode == 'edit') {
            put(route)
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

    function onClose(){
        clearErrors()
        setOpen(false)
        reset()
    }

    return(
        <>
            {
                icon == false ?
                <Button color={mode == 'edit' ? 'amber' : 'blue'} className="flex items-center gap-2" onClick={() => setOpen(true)}>
                    <PlusIcon className="w-5"/>
                    {`${mode == 'edit' ? "Edit" : "Tambah"} Kursus Sertifikasi`}
                </Button>
                :
                <IconButton size={iconSize} color={mode == 'edit' ? 'amber' : 'blue'} onClick={() => setOpen(true)}>
                    {mode == 'edit' ? <Cog8ToothIcon className="w-full" /> : <PlusIcon className="w-full"/>}
                </IconButton>
            }
            <Dialog open={open} onClose={onClose} className="relative z-10">

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
                        {`${mode == 'edit' ? "Edit" : "Tambah"} Kursus Sertifikasi`}
                    </p>
                </DialogTitle>
                <div className='py-5'>
                    <div className='mb-5'>
                        <label htmlFor='name'>
                            Kursus
                        </label>
                        <KursusSelection
                            data={data}
                            setData={setData}
                            errors={errors}
                            mode={mode}
                        />
                        <InputError message={errors.kursus_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor='description'>
                            Level Sertifikasi
                        </label>
                        <SertifikasiSelection
                            data={data}
                            setData={setData}
                        />
                        <InputError message={errors.level_sertifikasi_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-5">
                    <Button color="green" onClick={() => submit()} loading={processing}>
                        Submit
                    </Button>
                    <Button color="amber" onClick={onClose}>
                        Cancel
                    </Button>
                </div>
                </DialogPanel>
            </div>
            </Dialog>
        </>
    )
}

function KursusSelection({
    data,
    setData,
    errors,
    mode
}){
    const [kursus, setKursus] = useState([])

    useEffect(() => {
        axios.get(route('input.course.sertifikasi'))
            .then((response) => {
                setKursus(response.data.courses)
            })
    })

    return(
        <>
            {
                mode == 'edit' ?
                <ReactSelect
                    classNamePrefix="select2-selection"
                    className="w-full mb-3"
                    isDisabled={true}
                    options={kursus}
                    value={kursus.find(k => data.kursus_id == k.value)}
                />
                :
                <ReactSelect
                    classNamePrefix="select2-selection"
                    className="w-full mb-3"
                    placeholder="Kursus"
                    isMulti={true}
                    isClearable={true}
                    options={kursus}
                    value={kursus.filter(k => data.kursus_id?.includes(k.value))}
                    onChange={(e) => {
                        setData('kursus_id', e.map(item => item.value))
                    }}
                />
            }
            {
                !isEmpty(errors) &&
                <div className="bg-red-300 rounded-lg text-white">
                    {
                        Object.keys(errors).map(key => {
                            if (key.split(".").length > 1) {
                                var index = key.split(".")[1]
                                return(
                                    <div className="flex items-center justify-start gap-2 mx-2">
                                        <XCircleIcon className="w-5"/>
                                        <p>
                                            {errors[key]} (Kursus {data.kursus_id[parseInt(index)]})
                                        </p>
                                    </div>

                                )
                            }
                        })
                    }
                </div>
            }
        </>
    )
}

function SertifikasiSelection({
    data,
    setData,
}) {
    const [levels, setLevels] = useState([])

    useEffect(() => {
        axios.get(route('input.sertifikasi.level'))
            .then((response) => {
                setLevels(response.data.levels)
            })
    })

    return(
        <ReactSelect
            classNamePrefix="select2-selection"
            className="w-full"
            placeholder="Kursus"
            options={levels}
            value={levels.find(l => l.value == data.level_sertifikasi_id)}
            onChange={(e) => {
                setData('level_sertifikasi_id', e.value)
            }}
        />
    )
}
