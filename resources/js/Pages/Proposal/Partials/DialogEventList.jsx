import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { EyeIcon, LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

function EventListTable({events}){
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor(row => row.id, {
            id: 'id',
            header: <span>ID</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.name, {
            id: 'name',
            header: <span>Nama</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('start_date', {
            header: <span>Tanggal Mulai</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor('end_date', {
            header: <span>Tanggal Selesai</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.participant_number, {
            id: 'participant_number',
            header: <span>Partisipan</span>,
            cell: info => info.getValue(),
        }),
        columnHelper.accessor(row => row.prices.training_price, {
            id: 'training_price',
            header: <span>Harga Pelatihan</span>,
            cell: info => `Rp ${Number(info.getValue()).toLocaleString()}`,
        }),
        columnHelper.accessor(row => row.prices.accomodation_price, {
            id: 'accomodation_price',
            header: <span>Harga Akomodasi</span>,
            cell: info => `Rp ${Number(info.getValue()).toLocaleString()}`,
        }),
        columnHelper.accessor(row => row.id, {
            id: 'link',
            header: <span>Link</span>,
            cell: (info) => {
                return (
                    <Tooltip content="Menuju ke Event">
                        <Link href={route('event.show', [info.getValue()])}>
                            <IconButton size="sm" color="blue">
                                <LinkIcon className="w-full"/>
                            </IconButton>
                        </Link>
                    </Tooltip>
                )
              },
        })
    ]

    const table = useReactTable({
        data: events,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    return(
        <TanstackTable table={table}/>
    )
}

export default function DialogEventList({proposal, events}){
    const [open, setOpen] = useState(false)

    return(
        <>
            <Button className="flex items-center gap-3" size="sm" color="blue" onClick={() => setOpen(!open)}>
                <EyeIcon className="w-5"/>
                Tampilkan
            </Button>
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                className={'relative z-50'}
            >
                <DialogBackdrop className={"fixed inset-0 bg-black/30 ease-in duration-200 data-[closed]:opacity-0"}/>
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="relative w-full space-y-4 max-h-[calc(100vh-5rem)] overflow-auto rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0"
                    >
                        <DialogTitle className={"text-center"}>
                            <p className="uppercase font-bold text-lg">List Event</p>
                            <p className="text-sm italic text-gray-500">{`Usulan: ${proposal?.name ?? ''}`}</p>
                        </DialogTitle>
                        <div className="absolute top-5 right-20">
                            <IconButton color="red" onClick={() => setOpen(false)} variant="text">
                                <XMarkIcon className="w-full"/>
                            </IconButton>
                        </div>
                        <div>
                            <div className="mb-10">
                                <EventListTable events={events}/>
                            </div>
                            <div className="flex justify-center">
                                <Button color="red" onClick={() => setOpen(false)}>
                                    Tutup
                                </Button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}