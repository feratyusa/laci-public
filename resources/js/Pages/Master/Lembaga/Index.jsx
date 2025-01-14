import HeaderTitle from "@/Components/HeaderTitle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { BuildingOffice2Icon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import FormLembagaDialog from "./Partials/FormLembagaDialog";

export default function Index({
    auth,
    lembagas=[]
}){
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Master Lembaga"} />}
        >
            <Head title="Master Lembaga"/>

            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <BuildingOffice2Icon className="w-8"/>
                        <p className="text-2xl font-bold">Master Lembaga</p>
                    </div>
                    <LembagaTable lembagas={lembagas}/>
                </CardBody>
            </Card>
        </Authenticated>
    )
}

function LembagaTable({
    lembagas,
}){
    const columnHelpers = createColumnHelper()

    const columns = [
        columnHelpers.accessor('sandi', {
            header: <span>Sandi</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('lengkap', {
            header: <span>Lembaga</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('cp', {
            header: <span>Contect Person</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('nope', {
            header: <span>Phone</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => row.sandi, {
            id: 'actions',
            header: <span>Actions</span>,
            cell: ({row}) => <ActionButtons sandi={row.original.sandi}/>,
            enableColumnFilter: false,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: lembagas,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return(
        <div>
            <div className="mb-3">
                <FormLembagaDialog
                    routes={route('lembaga.store')}
                />
            </div>
            <input
                className="mb-5 rounded-lg w-96"
                placeholder="Search..."
                onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            />
            <TanstackTable table={table} alignTable="table-auto"/>
        </div>
    )
}

function ActionButtons({
    sandi,
}){
    return(
        <div className="flex items-center justify-center gap-2">
            <FormLembagaDialog
                routes={route('lembaga.update', [sandi])}
                sandi={sandi}
                mode="edit"
                icon={true}
            />
            <DialogDelete
                content={"Lembaga"}
                route={route('lembaga.delete', [sandi])}
                title={`Hapus Lembaga ${sandi}`}
                message={"Aksi ini tidak dapat dikembalikan"}
                buttonSize="sm"
                statePreserve={true}
            />
        </div>
    )
}
