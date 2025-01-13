import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { VariableIcon } from "@heroicons/react/24/solid";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import DetailJenisSertifikasi from "./Partials/DetailJenisSertifikasi";
import FormJenisDialog from "./Partials/FormJenisDialog";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import FormLevelDialog from "./Partials/FormLevelDialog";

export default function Index({
    auth,
    jenis=[],
    kursus=[]
}){
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Master Sertifikasi"} />}
        >
            <Head title="Master Sertifikasi"/>

            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <VariableIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Sertifikasi</p>
                    </div>
                    <BudgetTabs jenis={jenis} kursus={kursus} />
                </CardBody>
            </Card>
        </Authenticated>
    )
}

function BudgetTabs({
    jenis,
    kursus
}){
    const tabClass = "flex items-center justify-center p-4 text-red-500 hover:bg-red-500 hover:text-white ring-0 border-0"
    const [selectedIndex, setSelectedIndex] = useState(0)

    return(
        <TabGroup
            defaultIndex={selectedIndex} selectedIndex={selectedIndex} onChange={(index) => setSelectedIndex(index)}
        >
            <TabList className={`grid grid-cols-2`}>
                <Tab className={`rounded-tl-md rounded-tr-md ${tabClass} ${selectedIndex == 0 ? "bg-red-300 text-white" : ""}`}>
                    <p className="font-extrabold text-lg uppercase">Jenis Sertifikasi</p>
                </Tab>
                <Tab className={`rounded-tl-md rounded-tr-md ${tabClass} ${selectedIndex == 1 ? "bg-red-300 text-white" : ""}`}>
                    <p className="font-extrabold text-lg uppercase">Kursus Sertifikasi</p>
                </Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <JenisPanel jenis={jenis} />
                </TabPanel>
                <TabPanel>
                    Kursus
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

function ActionButtons({
    data
}){
    return(
        <div className="flex items-center justify-center gap-2">
            <DetailJenisSertifikasi data={data}/>
            <FormLevelDialog
                mode="create"
                route={"sertifikasi.level.create"}
                levels={data.levels}
                jenis_sertifikasi_id={data.id}
            />
            <FormJenisDialog
                jenis={data}
                route={route('sertifikasi.jenis.update', [data.id])}
                icon={true}
                mode="edit"
            />
            <DialogDelete
                route={route('sertifikasi.jenis.destroy', [data.id])}
                content={"Sertifikasi"}
                title={`Hapus Jenis Sertifikasi ${data.nama}`}
                message={"Aksi ini tidak dapat dikembalikan. Aksi ini akan menghapus semua level jenis sertifikasi, tetapi tidak menghapus kursus yang terhubung."}
                buttonSize="sm"
            />
        </div>
    )
}

function JenisPanel({
    jenis
}){
    console.log(jenis)

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: () => <span>ID</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('nama', {
            header: () => <span>Jenis Sertifikasi</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.levels.length ? row.levels.length : 0, {
            id: 'jumlah_level',
            header: () => <span>Jumlah Level</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: ({row}) => <ActionButtons data={row.original}/>,
            enableSorting: false,
            enableGlobalFilter: false,
        })
    ]

    const table = useReactTable({
        data: jenis,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
    })

    return(
        <div>
            <div className="grid grid-cols-8 mb-2 mt-5">
                <div className="col-span-6">
                    <FormJenisDialog
                        route={route('sertifikasi.jenis.create')}
                    />
                </div>
                <div className="col-span-2">
                    <input
                        className="rounded-md"
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <TanstackTable table={table} alignTable="table-auto"/>
        </div>
    )
}
