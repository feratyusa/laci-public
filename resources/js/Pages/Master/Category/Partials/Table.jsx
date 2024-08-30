import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate"
import { useState } from "react"
import FormDialog from "./FormDialog"
import DeleteDialog from "./DeleteDialog"
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import TanstackTable from "@/Components/TanstackTable/TanstackTable"

function ActionButtons({category}){
    return(
        <div className="flex justify-center items-center gap-2">
            <FormDialog mode="edit" category={category} route={route('category.update', [category.id])}/>
            <DeleteDialog route={route('category.destroy', [category.id])} category={category}/>
        </div>
    )
}

function Table({categories=[]}){

    const [columnFilters, setColumnFilters] = useState([])

    function handleFilters(value){
        setColumnFilters([
            {id: 'name', value: value},
        ])
    }

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: () => 'ID',
            cell: info => info.getValue(),
            footer: info => info.column.id,
            
        }),
        columnHelper.accessor(row => row.name, {
            id: 'name',
            cell: info => <i>{info.getValue()}</i>,
            header: () => <span>Name</span>,
            footer: info => info.column.id,
            enableColumnFilter: true,
            filterFn: 'CustomFilter', 
            
        }),
        columnHelper.accessor(row => changeToIndonesiaDateTime(row.created_at, true), {
            id: 'created_at',  
            header: () => 'Created At',
            cell: info => info.renderValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => changeToIndonesiaDateTime(row.updated_at, true), {
            id: 'updated_at',
            header: () => <span>Updated At</span>,
            footer: info => info.column.id,
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: info => <ActionButtons category={categories.find(c => c.id === info.getValue())} />,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: categories,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        enableColumnFilters: true,
        state: {
            columnFilters,
        },
        filterFns: {
            CustomFilter: (rows, columnId, filterValue) => {
                return rows.getValue('name').toUpperCase().includes(filterValue.toUpperCase()) 
                        || rows.getValue('id').toUpperCase().includes(filterValue.toUpperCase())
            }
        }
    })

    return (
        <>
            <div className="grid grid-cols-8 items-center gap-2 p-5">
                <div className="col-span-6">
                    <FormDialog variant="text" route={route('category.store')}/>
                </div>
                <div className="col-span-2">
                    <input 
                        placeholder="Search..."
                        onChange={(e) => handleFilters(e.target.value)}
                        className="w-full rounded-md"
                    />
                </div>
            </div>
            <TanstackTable table={table}/>
        </>
    )
}

export default function CategoriesTable({categories=[]}){
    return(
        <div className='w-full'>
            <Table categories={categories}/>
        </div>
    )
}