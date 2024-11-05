import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react"

export default function CheckDiklat({loaded=true, events=[]}){
    const [open, setOpen] = useState(false)
    const color = events.length == 0 ? 'green' : 'red'
    
    const columnHelpers = createColumnHelper()
    const columns = [
        columnHelpers.accessor('kd_kursus', {
            header: 'Sandi',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('pelatihan', {
            header: 'Nama',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('tgl_mulai', {
            header: 'Tanggal Mulai',
            cell: info => String(info.getValue()).split(' ')[0] ?? 'NULL'
        }),
        columnHelpers.accessor('tgl_selesai', {
            header: 'Tanggal Selesai',
            cell: info => String(info.getValue()).split(' ')[0] ?? 'NULL'
        }),        
    ]

    const table = useReactTable({
        data: events,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return(
        <>
            {
                loaded == false ?
                <p className="text-red-500 animate-pulse">Loading...</p>
                :
                <Button onClick={() => setOpen(true)} color={color} disabled={events.length == 0} size="sm">
                    {events.length + ' Diklat`'}
                </Button>
            }
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="space-y-4 border bg-white p-12">
                    <DialogTitle className="text-center text-red-500 font-bold uppercase">
                        Diklat yang Sudah Diikuti
                    </DialogTitle>
                    <TanstackTable table={table} alignTable="table-auto"/>
                </DialogPanel>
                </div>
            </Dialog>
        </>
        
    )
}