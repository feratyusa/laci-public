import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import DeleteDialog from "../../Partials/DeleteDialog";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { useState } from "react";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import FormDialog from "./FormDialog";

function ActionButtons({category}){
    return(
        <div className="flex justify-center items-center gap-2"> 
            <FormDialog variant="icon" route={route('location.update', [category.id])} mode="edit" location={category}/>  
            <DeleteDialog route={route('location.destroy', [category.id])} title={'Hapus Lokasi?'} body={"Aksi tidak dapat dikembalikan"}/>
        </div>
    )
}

export default function LocationsTable({locations=[]}){
    const [globalFilter, setGlobalFilter] = useState()
    console.log(locations)
    
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('name', {
            header: <span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('created_at', {
            header: <span>Created At</span>,
            cell: info => changeToIndonesiaDateTime(info.getValue()),
            enableGlobalFilter: false,
        }),
        columnHelper.accessor('updated_at', {
            header: <span>Updated At</span>,
            cell: info => changeToIndonesiaDateTime(info.getValue()),
            enableGlobalFilter: false,
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: info => <ActionButtons category={locations.find(u => u.id == info.getValue())} />,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: locations,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter: globalFilter
        },        
    })

    return(
        <div>
            <div className="flex items-center justify-between">
                <FormDialog variant="text" route={route('location.store')}/>
                <input
                    className="mb-5 rounded-lg" 
                    placeholder="Search..."
                    onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                />
            </div>
            <TanstackTable table={table}/>
        </div>
    )
}