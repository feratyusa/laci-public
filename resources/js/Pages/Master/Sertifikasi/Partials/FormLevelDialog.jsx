import DialogDelete from "@/Components/Dialogs/DialogDelete";
import InputError from "@/Components/Form/InputError";
import TextInput from "@/Components/Form/TextInput";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Cog6ToothIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useRef } from "react";
import { useState } from "react";

export default function FormLevelDialog({
    jenis_sertifikasi_id,
    levels=[],
    iconSize="sm"
}){
    const {data, setData, post, put, reset, errors, processing} = useForm({
        id: '',
        jenis_sertifikasi_id: jenis_sertifikasi_id,
        level: '',
        deskripsi: ''
    })

    const [open, setOpen] = useState(false)
    const [mode, setMode] = useState("create")
    const form = useRef(null)

    function submit(){
        console.log(data)
        if (mode == 'edit') {
            put(route("sertifikasi.level.update", [data.id]), {
                onSuccess: () => {
                    reset()
                    setOpen(false)
                }
            })
        }
        else{
            post(route("sertifikasi.level.create"), {
                preserveState: true,
                preserveScroll: true,
                onSuccess: () => {
                    reset()
                    setOpen(false)
                }
            })
        }
    }

    function onClose(){
        setOpen(false)
        setMode("create")
        reset()
    }

    function scrollToForm(){
        form.current.scrollIntoView({behavior: "smooth"})
    }

    return(
        <>
            <Button color="orange" size={iconSize} className="flex items-center gap-2" onClick={() => setOpen(true)}>
                <Cog6ToothIcon className="w-5"/>
                Atur Level
            </Button>
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
                    className="w-full max-w-4xl max-h-[90vh] space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0 overflow-auto"
                >
                    <DialogTitle className="flex items-center justify-center">
                        <p className="text-2xl font-bold text-red-500" ref={form}>
                            {`${mode == 'edit' ? "Edit" : "Tambah"} Level Sertifikasi`}
                        </p>
                    </DialogTitle>
                    <div className='pt-5'>
                        {
                            mode == 'edit' &&
                            <div className="mb-5">
                                <label htmlFor='year'>
                                    ID Level
                                </label>
                                <TextInput
                                    value={data.id}
                                    disabled
                                />
                            </div>
                        }
                        <div className='mb-5'>
                            <label htmlFor='year'>
                                Level Sertifikasi
                            </label>
                            <TextInput
                                id="name"
                                placeholder="Level Sertifikasi"
                                value={data.level}
                                onChange={(e) => setData('level', e.target.value)}
                            />
                        </div>
                        <div className='mb-5'>
                            <label htmlFor='year'>
                                Deskripsi Level
                            </label>
                            <TextInput
                                id="description"
                                placeholder="Deskripsi Level Sertifikasi"
                                value={data.deskripsi}
                                onChange={(e) => setData('deskripsi', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-5 pb-5">
                        <Button color="green" onClick={() => submit()} loading={processing}>
                            Submit
                        </Button>
                        <Button color="amber" onClick={onClose}>
                            Cancel
                        </Button>
                        {
                            mode == "edit" &&
                            <Button
                                color="red"
                                onClick={() => {
                                    reset()
                                    setMode("create")
                                }}
                            >
                                Ganti ke Tambah
                            </Button>
                        }
                    </div>
                    <LevelSertifikasiTable
                        levels={levels}
                        setData={setData}
                        setMode={setMode}
                        scrollToForm={scrollToForm}
                    />
                </DialogPanel>
            </div>
            </Dialog>
        </>
    )
}

function LevelSertifikasiTable({
    levels=[],
    setData,
    setMode,
    scrollToForm,
}){
    const columnHelpers = createColumnHelper()

    const columns = [
        columnHelpers.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('level', {
            header: <span>Level</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('deskripsi', {
            header: <span>Deskripsi Level</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => row.id, {
            id: 'actions',
            header: <span>Actions</span>,
            cell: ({row}) => (
                <ActionButtons
                    level={row.original}
                    setData={setData}
                    setMode={setMode}
                    scrollToForm={scrollToForm}
                />
            )
        })
    ]

    const table = useReactTable({
        data: levels,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        enableSorting: false,
    })

    return(
        <TanstackTable table={table} alignTable="table-auto"/>
    )
}

function ActionButtons({
    level,
    setData,
    setMode,
    scrollToForm
}){
    return(
        <div className="flex items-center justify-center gap-2">
            <IconButton
                size="sm"
                color="amber"
                onClick={() => {
                    console.log(level)
                    setData(level)
                    setMode("edit")
                    scrollToForm()
                }}
            >
                <Cog8ToothIcon className="w-full"/>
            </IconButton>
            <DialogDelete
                content={"Level Sertifikasi"}
                route={route("sertifikasi.level.destroy", [level.id])}
                title={`Hapus Level Sertifikasi (${level.level})`}
                message={"Aksi ini tidak bisa dikembalikan. Aksi ini tidak akan menghapus kursus yang telah terhubung."}
                buttonSize="sm"
            />
        </div>
    )
}
