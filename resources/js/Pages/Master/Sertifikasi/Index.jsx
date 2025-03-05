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
import FormDetailSerfikasi from "./Partials/FormDetailSertifikasi";
import { first } from "lodash";
import { useEffect } from "react";
import axios from "axios";
import ReactSelect from "react-select"

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
                    <KursusSertifikasiPanel
                        kursuses={kursus}
                    />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

function ActionButtons({
    data,
    type='jenis'
}){
    return(
        type == 'jenis' ?
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
        :
        <div className="flex items-center justify-center gap-2">
            <FormDetailSerfikasi
                route={route("sertifikasi.detail.update", [data.sandi])}
                mode="edit"
                detail={{ kursus_id: data.sandi, level_sertifikasi_id: first(data.level)?.id}}
                icon={true}
            />
            <DialogDelete
                content={"Sertifikasi"}
                route={route("sertifikasi.detail.destroy", [data.sandi])}
                title={`Hapus Kursus Sertifikasi (${data.sandi})`}
                message={"Aksi ini tidak bisa dikembalikan. Aksi ini tidak akan menghapus kursus"}
                buttonSize="sm"
                statePreserve={true}
            />
        </div>
    )
}

function JenisPanel({
    jenis
}){
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

function KursusSertifikasiPanel({
    kursuses=[]
}){
    const [sertifikasi, setSertfikasi] = useState([])

    useEffect(() => {
        axios.get(route('input.sertifikasi.jenis'))
            .then((response) => {
                setSertfikasi(response.data.sertifikasi)
            })
    }, [])

    console.log(kursuses)
    console.log(sertifikasi)

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('sandi', {
            header: () => <span>Sandi</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('lengkap', {
            id: 'pelatihan',
            header: () => <span>Pelatihan</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('kategori', {
            header: <span>Kategori</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => first(row.level)?.jenis_sertifikasi_id, {
            id: 'level',
            header: () => <span>Level</span>,
            cell: ({row}) => (
                <p>{first(row.original.level)?.level}</p>
            ),
            enableSorting: false,
            filterFn: 'FilterSertifikasi'
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: <span>Actions</span>,
            cell: ({row}) => <ActionButtons type="kursus" data={row.original}/>,
            enableSorting: false,
            enableColumnFilter: false,
        })
    ]

    const table = useReactTable({
        data: kursuses,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: 'includesString',
        initialState: {
            columnFilters: [
                {
                    id: 'level',
                    value: []
                }
            ]
        },
        filterFns: {
            FilterSertifikasi: (row, columnID, filterValue) => {
                if(filterValue.length == 0) return true
                return filterValue.includes(first(row.original.level)?.jenis_sertifikasi_id)
            },
        }
    })

    return(
        <div>
            <div className="mt-5 mb-5">
                <FormDetailSerfikasi
                    route={route("sertifikasi.detail.create")}
                />
            </div>
            <div className="flex items-center justify-start gap-5 mb-5">
                <input
                    className="rounded-md"
                    onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />
                <ReactSelect
                    className="w-full"
                    classNamePrefix="select2-selection"
                    placeholder="Sertifikasi"
                    options={sertifikasi}
                    isClearable={true}
                    isMulti={true}
                    value={sertifikasi.filter(s => table.getColumn('level').getFilterValue()?.includes(s.value.toString()))}
                    onChange={(e) => {
                        table.getColumn('level').setFilterValue(e.map(item => item.value.toString()))
                    }}
                />
            </div>
            <TanstackTable table={table} alignTable="table-auto"/>
        </div>
    )
}
