import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

export default function EventList({events=[]}){
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('name', {
            header: <span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.proposal, {
            id: 'kursus',
            header: <span>Kursus</span>,
            cell: info => `(${info.getValue().kursus.sandi}) ${info.getValue().kursus.lengkap})`
        }),
        columnHelper.accessor(row => row.participant_number_type == 'DYNAMIC' ? row.participants.length : row.participant_number, {
            id: 'partisipan',
            header: <span>Partisipan</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor(row => row.start_date, {
            id: 'start_date',
            header: <span>Tanggal Mulai</span>,
            cell: info => `${changeToIndonesiaDateTime(info.getValue(), true)}`
        }),
        columnHelper.accessor(row => row.end_date, {
            id: 'end_date',
            header: <span>Tanggal Selesai</span>,
            cell: info => `${changeToIndonesiaDateTime(info.getValue(), true)}`
        }),
        columnHelper.accessor(row => row?.location ?? '', {
            id: 'location',
            header: <span>Lokasi</span>,
            cell: info => `${info.getValue()?.name} (${info.getValue()?.id})`
        }),
    ]

    const table = useReactTable({
        data: events,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })
    
    return(
        <>
            <TanstackTable table={table} alignTable="table-auto" className="text-sm"/>
        </>
    )
}