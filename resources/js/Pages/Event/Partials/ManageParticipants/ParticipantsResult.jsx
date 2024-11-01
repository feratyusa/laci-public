import Checkbox from "@/Components/Checkbox";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Button } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { cloneDeep, isEmpty, keys } from "lodash";
import { useState } from "react";
import CheckEvent from "./CheckEvents";

function RowTable({row, column}){
    return(
        <div onClick={row.getToggleSelectedHandler()}>
            {row.getValue(column)}
        </div>
    )
}

export default function ParticipantResult({participants=[], setParticipants, deletedParticipants, setDeletedParticipants, kursus}){
    const [rowSelection, setRowSelection] = useState({})
    const columnHelpers = createColumnHelper()

    const columns = [
        {
            id: 'select-col',
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllRowsSelected()}
                    indeterminate={table.getIsSomeRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()} //or getToggleAllPageRowsSelectedHandler
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    disabled={!row.getCanSelect()}
                    onChange={row.getToggleSelectedHandler()}
                />
            ),
        },
        columnHelpers.accessor('nip', {
            header: 'NIP',
            cell: ({row}) => (
                <RowTable row={row} column={'nip'}/>
            )
        }),
        columnHelpers.accessor('nama', {
            header: 'Nama',
            cell: ({row}) => (
                <RowTable row={row} column={'nama'}/>
            )
        }),
        columnHelpers.accessor('jabatan', {
            header: 'Jabatan',
            cell: ({row}) => (
                <RowTable row={row} column={'jabatan'}/>
            )
        }),
        columnHelpers.accessor('cabang', {
            header: 'Cabang',
            cell: ({row}) => (
                <RowTable row={row} column={'cabang'}/>
            )
        }),
        columnHelpers.accessor('seksi', {
            header: 'Seksi',
            cell: ({row}) => (
                <RowTable row={row} column={'seksi'}/>
            )
        }),
        columnHelpers.accessor('jobfam', {
            header: 'Jobfam',
            cell: ({row}) => (
                <RowTable row={row} column={'jobfam'}/>
            )
        }),
        columnHelpers.accessor('countIn', {
            header: 'Event Bersamaan',
            cell: info => <CheckEvent events={info.getValue()}/>,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: participants,
        columns: columns,
        getRowId: row => row.nip,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        globalFilterFn: 'includesString',  
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            rowSelection
        },
    })

    function deleteSelectedParticipants(){
        const removedNIP = keys(rowSelection)
        
        const newParticipants = cloneDeep(participants) 
        const filteredParticipants = newParticipants.filter(p => ! removedNIP.includes(p.nip))
        const dfilteredParticipants = newParticipants.filter(p => removedNIP.includes(p.nip))

        setParticipants(filteredParticipants)
        setDeletedParticipants([...deletedParticipants, ...dfilteredParticipants])

        setRowSelection({})
    }

    function deleteAllParticipantsWithEvent(){
        const newParticipants = cloneDeep(participants)
        const filteredParticipants = newParticipants.filter(p => p.countIn.length == 0)
        const dfilteredParticipants = newParticipants.filter(p => p.countIn.length != 0)

        setParticipants(filteredParticipants)
        setDeletedParticipants([...deletedParticipants, ...dfilteredParticipants])

        setRowSelection({})
    }

    console.log(table.getState().globalFilter)

    return(
        <>
            <div className="flex justify-between mb-5">
                <div>
                    <input
                        className="rounded-md"
                        value={table.getState().globalFilter}
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                        placeholder="Search Peserta ..."
                    />
                </div>
                <div className="flex items-center gap-3">
                    <Button color="red" onClick={deleteSelectedParticipants} disabled={isEmpty(rowSelection)}>
                        Hapus Peserta
                    </Button>
                    <Button color="red" onClick={deleteAllParticipantsWithEvent}>
                        Hapus Peserta dengan Event
                    </Button>
                </div>
            </div>
            <TanstackTable table={table} alignTable="table-auto"/>
        </>
    )
}
