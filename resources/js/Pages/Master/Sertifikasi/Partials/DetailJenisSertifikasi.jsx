import DialogDelete from "@/Components/Dialogs/DialogDelete"
import TanstackTable from "@/Components/TanstackTable/TanstackTable"
import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/24/solid"
import { Button, IconButton } from "@material-tailwind/react"
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { get } from "lodash"
import { useState } from "react"

export default function DetailJenisSertifikasi({
    data
}){
    const [open, setOpen] = useState(false)

    return(
        <>
            <Button size="sm" color="blue" className="flex items-center gap-2" onClick={() => setOpen(!open)}>
                <MagnifyingGlassIcon className="w-5"/>
                Detail
            </Button>
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
                    className="w-full max-w-4xl max-h-[90vh] space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0 overflow-auto"
                >
                <DialogTitle className="flex items-center justify-center">
                    <p className="text-2xl font-bold text-red-500">
                        Detail Jenis Sertifikasi
                    </p>
                </DialogTitle>
                <DetailsTableJenis nama={data.nama} deskripsi={data.deskripsi}/>
                <DetailsTableLevel levels={get(data, 'levels')} />
                <div className="flex items-center justify-center">
                    <Button color="amber" onClick={() => setOpen(false)}>
                        Tutup
                    </Button>
                </div>
                </DialogPanel>
            </div>
            </Dialog>
        </>
    )
}

function DetailsTableJenis({
    nama,
    deskripsi
}){
    return(
        <table className="w-full table-auto">
            <tbody>
                <tr className="border-b-2 border-gray-700">
                    <td className="w-36 text-black font-bold bg-gray-300 px-2">Jenis Sertifikasi</td>
                    <td className="py-5 px-2">{nama}</td>
                </tr>
                <tr className="border-b-2 border-gray-700">
                    <td className="text-black font-bold bg-gray-300 px-2">Deskripsi</td>
                    <td className="py-5 px-2">{deskripsi}</td>
                </tr>
            </tbody>
        </table>
    )
}

function DetailsTableLevel({
    levels
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
            header: <span>Deskripsi</span>,
            cell: info => info.getValue()
        }),
    ]

    const table = useReactTable({
        data: levels,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        enableFilters: false,
        enableSorting: false
    })

    return(
        <TanstackTable table={table} alignTable="table-auto" />
    )
}
