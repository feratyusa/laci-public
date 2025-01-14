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

export default function FormKursusDialog({
    sandi=null,
    routes,
    mode="create",
    icon=false,
    iconSize="sm"
}){

    const [open, setOpen] = useState(false)

    function onClose(){
        setOpen(false)
        reset()
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
                        {`${mode == 'edit' ? "Edit" : "Tambah"} Jenis Sertifikasi`}
                    </p>
                </DialogTitle>
                <FormKursus
                    mode={mode}
                    routes={routes}
                    sandi={sandi}
                    onClose={onClose}
                />
                </DialogPanel>
            </div>
            </Dialog>
        </>
    )
}

function FormKursus({
    sandi,
    mode,
    routes,
    onClose
}){
    const {data, setData, post, put, errors, processing} = useForm({
        sandi: '',
        nama: '',
        tempat: '',
        npublic: '',
        nlini: '',
        nsektor: '',
        sertifikat: '',
        nskill: '',
        level_sertifikasi_id: '',
    })

    function submit(){
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
            axios.get(route('get.kursus.getDataRaw', [sandi]))
                .then((response) => {
                    var dRaw = response.data.course
                    var level = response.data.level
                    setData({
                        sandi: sandi,
                        nama: dRaw['Lengkap'],
                        tempat: dRaw['tempat'],
                        npublic: dRaw['npublic'],
                        nlini: dRaw['nlini'],
                        nsektor: dRaw['nsektor'],
                        sertifikat: dRaw['sertifikat'],
                        nskill: dRaw['nskill'],
                        level_sertifikasi_id: get(level, 'level_sertifikasi_id', ''),
                    })
                })
                .catch((error) => {
                    setData({
                        sandi: sandi,
                        nama: '',
                        tempat: '',
                        npublic: '',
                        nlini: '',
                        nsektor: '',
                        sertifikat: '',
                        nskill: '',
                        level_sertifikasi_id: '',
                    })
                })
        }
        else{
            axios.get(route('input.kursus.newSandi'))
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
                        Sandi Kursus
                    </label>
                    <TextInput
                        id="id"
                        value={data.sandi}
                        disabled
                    />
                    <InputError message={errors.sandi} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div>
                    <label>
                        Kategori
                    </label>
                    <select
                        className="w-full rounded-md"
                        value={data.npublic}
                        onChange={(e) => setData('npublic', e.target.value)}
                    >
                        <option value="">Null</option>
                        <option value="public">Publik Training</option>
                        <option value="in house">In House Training</option>
                    </select>
                    <InputError message={errors.npublic} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div>
                    <label>
                        Skill
                    </label>
                    <select
                        className="w-full rounded-md"
                        value={data.nskill}
                        onChange={(e) => setData('nskill', e.target.value)}
                    >
                        <option value="">Null</option>
                        <option value="soft skill">Soft Skill</option>
                        <option value="hard skill">Hard Skill</option>
                    </select>
                    <InputError message={errors.nskill} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div>
                    <label>
                        Klasifikasi Lini
                    </label>
                    <LiniKursusSelection data={data} setData={setData}/>
                    <InputError message={errors.nlini} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div>
                    <label>
                        Klasifikasi Sektor
                    </label>
                    <SektorKursusSelection data={data} setData={setData}/>
                    <InputError message={errors.sektor} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div className="col-span-2">
                    <label>
                        Klasifikasi Sertifikasi
                    </label>
                    <select
                        className="w-full rounded-md"
                        value={data.sertifikat}
                        onChange={(e) => setData('sertifikat', e.target.value)}
                    >
                        <option value="">Null</option>
                        <option value="sertifikasi">Sertifikasi</option>
                        <option value="non">Non Sertifikasi</option>
                    </select>
                    <InputError message={errors.sertifikat} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                {
                    get(data, 'sertifikat', 'non') == 'sertifikasi' &&
                    <>
                        <div className="col-span-2">
                            <label>
                                Jenis & Level Sertifikasi
                            </label>
                            <LevelSertifikasiSelection data={data} setData={setData}/>
                            <InputError message={errors.level_sertifikasi_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </>
                }
                <div className="col-span-2">
                    <label htmlFor='nama'>
                        Nama Kursus
                    </label>
                    <TextInput
                        id="nama"
                        placeholder="Nama Kursus"
                        value={data.nama}
                        onChange={(e) => setData('nama', e.target.value)}
                    />
                    <InputError message={errors.nama} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                </div>
                <div className="col-span-2">
                    <label htmlFor='tempat'>
                        Tempat
                    </label>
                    <TextInput
                        id="tempat"
                        placeholder="Tempat Kursus"
                        value={data.tempat}
                        onChange={(e) => setData('tempat', e.target.value)}
                    />
                    <InputError message={errors.tempat} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
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
        </>
    )
}

function LiniKursusSelection({
    data,
    setData
}){
    const [lini, setLini] = useState(null)

    useEffect(() => {
        setLini(null)
        axios.get(route('input.kursus.lini'))
            .then((response) => {
                setLini(response.data.lini)
            })
    }, [])

    return(
        lini == null ?
        <div className="w-fit">
            <LoadingCircle size="h-2 w-2"/>
        </div>
        :
        <select className="w-full rounded-md" value={data.nlini} onChange={(e) => setData('nlini', e.target.value)}>
            <option value="">Null</option>
            {
                lini.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}

function SektorKursusSelection({
    data,
    setData,
}){
    const [sektor, setSektor] = useState(null)

    useEffect(() => {
        setSektor(null)
        axios.get(route('input.kursus.sektor'), {params: {lini: get(data, 'nlini')}})
            .then((response) => {
                setSektor(response.data.sektor)
            })
    }, [data.nlini])

    return(
        sektor == null ?
        <div className="w-fit">
            <LoadingCircle size="h-2 w-2"/>
        </div>
        :
        <select
            className="w-full rounded-md"
            value={data.nsektor}
            onChange={(e) => setData('nsektor', e.target.value)}
        >
            <option value="">Null</option>
            {
                sektor.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}

function LevelSertifikasiSelection({
    data,
    setData
}){
    const [levels, setLevels] = useState(null)

    useEffect(() => {
        axios.get(route('input.sertifikasi.level'))
            .then((response) => {
                setLevels(response.data.levels)
            })
    }, [data.sertifikat])

    return(
        levels == null ?
        <div className="w-fit">
            <LoadingCircle size="h-2 w-2"/>
        </div>
        :
        <select
            className="w-full rounded-md"
            value={data.level_sertifikasi_id}
            onChange={(e) => setData('level_sertifikasi_id', e.target.value)}
        >
            <option value="">Null</option>
            {
                levels.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}
