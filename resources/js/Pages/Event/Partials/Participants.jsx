import DialogDelete from "@/Components/Dialogs/DialogDelete"
import LoadingCircle from "@/Components/Loading/LoadingCircle"
import TanstackTable from "@/Components/TanstackTable/TanstackTable"
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import CheckEvent from "./ManageParticipants/CheckEvents"
import CheckDiklat from "./ManageParticipants/CheckDiklat"

export default function Participants({reload, setReload, event, participants}){
    const [tableData, setTableData] = useState(participants)

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
        columnHelper.accessor(row => row.countIn.length, {
            header: 'Event Bersamaan',
            cell: ({row}) => <CheckEvent loaded={reload} events={row.original.countIn}/>,            
        }),
        columnHelper.accessor(row => row.diklatIn.length, {
            header: 'Sudah Diklat',
            cell: ({row}) => <CheckDiklat loaded={reload} events={row.original.diklatIn}/>,             
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
        data: tableData,
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

    useEffect(() => {
        const controller = new AbortController()

        setTableData(participants)
        setReload(false)

        axios.post(route('event.participants.check'), {
            signal: controller.signal,
            mode: 'default', 
            kd_kursus: event.proposal.kursus.sandi, 
            event_id: event.id, 
            event_start: event.start_date, 
            event_end:event.end_date
        }).then((response) => {
            setTableData(response.data.result)
            setReload(true)
        }).catch(error => {
            console.log(error)
        })
        
        return() => {
            controller.abort()
        }
    }, [participants])

    return(
        <>
            {
                participants == null ?
                <div className="flex justify-center">
                    <LoadingCircle />
                </div>
                :
                <>
                    <input
                        placeholder="Search Participant..."
                        value={globalFilter ?? ''}
                        onChange={(e) => setGlobalFilter(String(e.target.value))}
                        className="mb-5 rounded-md"
                    />
                    <TanstackTable table={table}/>
                </>
            }
        </>
    )
}
