import DialogDelete from "@/Components/Dialogs/DialogDelete";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import DuplicateNugieDialog from "./DuplicateNugieDialog";

function OptionButtons({nugie}){
    return(
        <div className="flex justify-center gap-5">
            <Tooltip content="Lihat Nugie">
                <Link href={route('nugie.show', [nugie.id])}>
                    <IconButton size="sm" color="blue">
                        <EyeIcon className="w-full"/>
                    </IconButton>
                </Link>
            </Tooltip>
            <Tooltip content="Duplikasi Nugie">
                <DuplicateNugieDialog 
                    name={"Nugie " + nugie.name} 
                    route={route('nugie.duplicate', [nugie.id])}
                    title={'Duplikasi Nugie'}
                />
            </Tooltip>
            <DialogDelete
                content={'Nugie'}
                title={`Hapus ${nugie.name}`}
                message={"Aksi tidak dapat dikembalikan"}
                buttonSize="sm"
                route={route('nugie.destroy', [nugie.id])}
            />
        </div>
    )
}

export default function NugieTable({
    nugies
}){
    const columnHelpers = createColumnHelper()

    const columns = [
        columnHelpers.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('name', {
            header: <span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('created_by', {
            header: <span>Dibuat oleh</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => row, {
            id: 'actions',
            header: <span>Aksi</span>,
            cell: info => <OptionButtons nugie={info.getValue()}/>,
            enableGlobalFilter: false,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: nugies,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),        
    })

    return(
        <>
            <input
                className="mb-3 rounded-lg"
                placeholder="Search Nugie..."
                onChange={(e) => table.setGlobalFilter(e.target.value)}
            />
            <TanstackTable table={table} alignTable="table-auto"/>
        </>
    )
}