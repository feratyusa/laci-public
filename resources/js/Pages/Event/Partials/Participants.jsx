import DialogDelete from "@/Components/Dialogs/DialogDelete"
import TanstackTable from "@/Components/TanstackTable/TanstackTable"
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { useState } from "react"
import { useEffect } from "react"

export default function Participants({event, participants=[]}){
    const [globalFilter, setGlobalFilter] = useState()

    const columnHelper = createColumnHelper()

    const column = [
        columnHelper.accessor(row => row.nip, {
            id: 'nip',
            header: <span>NIP</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.nama, {
            id: 'nama',
            header: <span>Nama</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.jabatan, {
            id: 'jabatan',
            header: <span>Jabatan</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.cabang, {
            id: 'cabang',
            header: <span>Cabang</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.nip, {
            id: 'action',
            header: <span>Aksi</span>,
            cell: ({cell, row}) => <DialogDelete 
                                        content={'Partisipan'}
                                        title={'Hapus Partisipan'}
                                        message={`Hapus partisipan (${row.original.nip}) ${row.original.nama}?`}
                                        buttonSize="sm"
                                        route={route('event.participant.destroy', [event.id, row.original.nip])}
                                        statePreserve={true}
                                    />,
            enableSorting: false
        }),
    ]

    const table = useReactTable({
        data: participants,
        columns: column,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter
        }
    })

    const headerClassName = 'bg-red-500 border-red-300 border-x-2 text-white p-2'
    const headerNames = ['NIP', 'Nama', 'Jabatan', 'Cabang', 'Aksi']
    const bodyClassName = 'text-black border-l-2 border-b-2 last:border-r-2 border-red-300 p-2'
    useEffect(() => {

    }, [participants])
    return(
        <>
            <input 
                placeholder="Search Participant..."
                value={globalFilter ?? ''}
                onChange={(e) => setGlobalFilter(String(e.target.value))}
                className="mb-5 rounded-md"
            />
            <TanstackTable table={table}/>
        </>
    )
}