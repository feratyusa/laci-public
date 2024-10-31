import BreadcrumbMod from "@/Components/BreadcrumbMod";
import Checkbox from "@/Components/Checkbox";
import HeaderTitle from "@/Components/HeaderTitle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { LinkIcon, TrashIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { Head, Link, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, IconButton, Option, Select } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { cloneDeep, forOwn, get, isEmpty, keys, remove, values } from "lodash";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";
import ParticipantForm from "./Partials/ManageParticipants/ManageForm";

function CheckEvent({events=[]}){
    const [open, setOpen] = useState(false)
    const color = events.length == 0 ? 'green' : 'red'
    
    const columnHelpers = createColumnHelper()
    const columns = [
        columnHelpers.accessor('id', {
            header: 'ID',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('name', {
            header: 'Nama',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('start_date', {
            header: 'Tanggal Mulai',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('end_date', {
            header: 'Tanggal Selesai',
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => row.id, {
            id: 'link',
            header: 'Link',
            cell: info => <LinkButton id={info.getValue()}/>
        }),
    ]

    const table = useReactTable({
        data: events,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    function LinkButton({id}){
        return(
            <Link href={route('event.show', [id])}>
                <IconButton size="sm" color="blue">
                    <LinkIcon className="w-full"/>
                </IconButton>
            </Link>
        )
    }

    return(
        <>
            <Button onClick={() => setOpen(true)} color={color} disabled={events.length == 0} size="sm">
                {events.length + ' Event`'}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <DialogBackdrop className="fixed inset-0 bg-black/30" />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="space-y-4 border bg-white p-12">
                    <DialogTitle className="text-center text-red-500 font-bold uppercase">
                        Event yang Sudah Diikuti
                    </DialogTitle>
                    <TanstackTable table={table} alignTable="table-auto"/>
                </DialogPanel>
                </div>
            </Dialog>
        </>
        
    )
}

function DeletedParticipantsResult({deletedParticipants=[], setDeletedParticipants, setParticipants}){

    return(
        <TanstackTable />
    )
}

function ParticipantResult({participants=[], setParticipants, deletedParticipants, setDeletedParticipants, kursus}){
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
                <div onClick={row.getToggleSelectedHandler()}>{row.getValue('nip')}</div>
            )
        }),
        columnHelpers.accessor('nama', {
            header: 'Nama',
            cell: ({row}) => (
                <div onClick={row.getToggleSelectedHandler()}>{row.getValue('nama')}</div>
            )
        }),
        columnHelpers.accessor('jabatan', {
            header: 'Jabatan',
            cell: ({row}) => (
                <div onClick={row.getToggleSelectedHandler()}>{row.getValue('jabatan')}</div>
            )
        }),
        columnHelpers.accessor('cabang', {
            header: 'Cabang',
            cell: ({row}) => (
                <div onClick={row.getToggleSelectedHandler()}>{row.getValue('cabang')}</div>
            )
        }),
        columnHelpers.accessor('seksi', {
            header: 'Seksi',
            cell: ({row}) => (
                <div onClick={row.getToggleSelectedHandler()}>{row.getValue('seksi')}</div>
            )
        }),
        columnHelpers.accessor('jobfam', {
            header: 'Jobfam',
            cell: ({row}) => (
                <div onClick={row.getToggleSelectedHandler()}>{row.getValue('jobfam')}</div>
            )
        }),
        columnHelpers.accessor('countIn', {
            header: 'Di Event Mendatang',
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
        state: {
            rowSelection
        }
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
        setParticipants(filteredParticipants)
        setRowSelection({})
    }

    return(
        <>
            <div className="flex items-center gap-3 mb-5">
                <Button color="red" onClick={deleteSelectedParticipants} disabled={isEmpty(rowSelection)}>
                    Hapus Peserta
                </Button>
                <Button color="red" onClick={deleteAllParticipantsWithEvent}>
                    Hapus Peserta dengan Event
                </Button>
            </div>
            <TanstackTable table={table} alignTable="table-auto"/>
        </>
    )
}

function ManageParticipantResult({
    participants,
    setParticipants,
    deletedParticipants,
    setDeletedParticipants,
}){
    return(
        <div>
            <TabGroup>
                <TabList>
                    <Tab>Semua</Tab>
                    <Tab>Terhapus</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ParticipantResult participants={participants} setParticipants={setParticipants} setDeletedParticipants={setDeletedParticipants}/>
                    </TabPanel>
                    <TabPanel>
                        <DeletedParticipantsResult deletedParticipants={deletedParticipants} setDeletedParticipants={setDeletedParticipants} setParticipants={setParticipants} />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default function ManageParticipants({
    auth,    
    kursus
}){
    const [participants, setParticipants] = useState([])
    const [deletedParticipants, setDeletedParticipants] = useState([])

    console.log(participants)

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Peserta Event'}/>}
        >
            <Head title={get(event, 'name', 'Event')}/>

            <div className="m-5">
                <BreadcrumbMod menu={'events'} title={[get(event, 'name', 'Event'), 'Manage Peserta']} />
                
                <Card className="mb-10">
                    <CardBody>                                                    
                        <div className="flex items-center gap-5 text-red-500 mb-5">
                            <UserGroupIcon className="w-10"/>
                            <p className="text-2xl font-bold">Manage Peserta</p>
                        </div>
                        <ParticipantForm setParticipants={setParticipants} kursus={kursus}/>                        
                    </CardBody>
                </Card>

                <Card>
                    <CardBody>
                        <ParticipantResult
                            participants={participants} 
                            setParticipants={setParticipants}
                            deletedParticipants={deletedParticipants}
                            setDeletedParticipants={setDeletedParticipants}
                            kursus={kursus} 
                        />
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}