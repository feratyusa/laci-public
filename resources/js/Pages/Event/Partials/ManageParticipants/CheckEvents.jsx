import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { LinkIcon  } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react"

export default function CheckEvent({events=[]}){
    const [open, setOpen] = useState(false)
    const color = events.length == 0 ? 'green' : 'red'
    
    const columnHelpers = createColumnHelper()
    const columns = [
        columnHelpers.accessor('id', {
            header: 'ID',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('name', {
            header: 'Nama',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('start_date', {
            header: 'Tanggal Mulai',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('end_date', {
            header: 'Tanggal Selesai',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => row.id, {
            id: 'link',
            header: 'Link',
            cell: info => <LinkButton id={info.getValue()}/>
        }),
    ]

    const table = useReactTable({
        data: events,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    function LinkButton({id}){
        return(
            <Link href={route('event.show', [id])}>
                <IconButton size="sm" color="blue">
                    <LinkIcon className="w-full"/>
                </IconButton>
            </Link>
        )
    }

    return(
        <>
            <Button onClick={() => setOpen(true)} color={color} disabled={events.length == 0} size="sm">
                {events.length + ' Event`'}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="space-y-4 border bg-white p-12">
                    <DialogTitle className="text-center text-red-500 font-bold uppercase">
                        Event yang Sudah Diikuti
                    </DialogTitle>
                    <TanstackTable table={table} alignTable="table-auto"/>
                </DialogPanel>
                </div>
            </Dialog>
        </>
        
    )
}