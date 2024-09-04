import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { IconButton } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import DeleteDialog from "../../Partials/DeleteDialog";

function ActionButtons({id, category}){
    console.log(id)
    return(
        <div className="flex justify-center items-center gap-2">
            <DeleteDialog 
                route={route('mandatory-category.destroy', [id])} 
                category={category}
                title={`Hapus Kategori Wajib`}
                body={`Yakin ingin menghapus Kategori Wajib ${category.name}?`}
            />
        </div>
    )
}

export default function MandatoryCategoryTable({mandatories=[], className=""}){
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor(row => row.category.id, {
            id: 'id',
            header: () => 'ID',
            cell: info => info.getValue(),
            footer: info => info.column.id,
            
        }),
        columnHelper.accessor(row => row.category.name, {
            id: 'name',
            header: () => <span>Name</span>,
            cell: info => info.getValue(),
            footer: info => info.column.id,
            enableColumnFilter: true,
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: info => <ActionButtons id={info.getValue()} category={mandatories.find(m => m.id == info.getValue())?.category} />,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: mandatories,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    
    return(
        <TanstackTable table={table} className={className}/>
    )
}