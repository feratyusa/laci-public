import DialogDelete from "@/Components/Dialogs/DialogDelete";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { EyeIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { IconButton } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Tooltip } from "chart.js";

function OptionButtons({nugie}){
    return(
        <div className="flex justify-center gap-5">
            <Link href={route('nugie.show', [nugie.id])}>
                <IconButton size="sm" color="blue">
                    <EyeIcon className="w-full"/>
                </IconButton>
            </Link>
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
        })
    ]

    const table = useReactTable({
        data: nugies,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return(
        <TanstackTable table={table} alignTable="table-auto"/>
    )
}