import HeaderTitle from "@/Components/HeaderTitle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { BuildingLibraryIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { first } from "lodash";
import FormKursusDialog from "./Partials/FormKursusDialog";
import DialogDelete from "@/Components/Dialogs/DialogDelete";

export default function Index({
    auth,
    kursus=[]
}){
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Master Jenis Kursus"} />}
        >
            <Head title="Master Jenis Kursus"/>

            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <BuildingLibraryIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Jenis Kursus</p>
                    </div>
                    <KursusTable kursus={kursus}/>
                </CardBody>
            </Card>
        </Authenticated>
    )
}

function KursusTable({
    kursus,
}){
    const columnHelpers = createColumnHelper()

    const columns = [
        columnHelpers.accessor('sandi', {
            header: <span>Sandi</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('lengkap', {
            header: <span>Pelatihan</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('kategori', {
            header: <span>Kategori</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('lini', {
            header: <span>Lini</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('sektor', {
            header: <span>Sektor</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => first(row.level)?.jenis.nama, {
            id: 'jenis_sertifikasi',
            header: <span>Jenis Sertifikasi</span>,
            cell: ({row}) => (
                <p>
                    {
                        first(row.original.level) ?
                        `${first(row.original.level)?.jenis.nama} ${first(row.original.level)?.level}`
                        :
                        "-"
                    }
                </p>
            )
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
        data: kursus,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    return(
        <div>
            <div className="mb-3">
                <FormKursusDialog
                    routes={route('kursus.store')}
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
            <FormKursusDialog
                routes={route('kursus.update', [sandi])}
                sandi={sandi}
                mode="edit"
                icon={true}
            />
            <DialogDelete
                content={"Kursus"}
                route={route('kursus.delete', [sandi])}
                title={`Hapus Kursus ${sandi}`}
                message={"Aksi ini tidak dapat dikembalikan"}
                buttonSize="sm"
                statePreserve={true}
            />
        </div>
    )
}

