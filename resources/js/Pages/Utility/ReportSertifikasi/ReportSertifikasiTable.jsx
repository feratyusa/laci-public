import LoadingCircle from "@/Components/Loading/LoadingCircle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { info } from "autoprefixer";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { get } from "lodash";
import { useState } from "react";
import { useEffect } from "react";

export default function ReportSertifikasiTable({
    data,
    jenis_sertifikasi_id,
}){
    return(
        data == null ?
        <div className="flex justify-center items-center">
            <LoadingCircle size="h-8 w-8"/>
        </div>
        :
        <ReportTable
            data={data}
            jenis_sertifikasi_id={jenis_sertifikasi_id}
        />
    )
}

function ReportTable({
    data,
    jenis_sertifikasi_id,
}){
    console.log(data)
    const columnHelpers = createColumnHelper()
    const columns = [
        columnHelpers.accessor('nip', {
            header: <span>NIP</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('nama', {
            header: <span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('jabatan', {
            header: <span>Jabatan</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => `${row.jenis_sertifikasi} ${row.level}`, {
            id: 'level_sertifikasi',
            header: <span>Sertifikasi</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('tgl_lulus', {
            header: <span>Tanggal Lulus</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('expired', {
            header: <span>Kadaluarsa</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => differenceInDays(new Date(row.expired), new Date(),), {
            id: 'durations',
            header: <span>Expired in (days)</span>,
            cell: info => <DifferenceDaysCell difference={info.getValue()}/>
        }),
        columnHelpers.accessor(row => row.nip, {
            id: 'details',
            header: <span>Detail</span>,
            cell: ({row}) => <DetailsDialog nip={row.original.nip} jenis_sertifikasi_id={jenis_sertifikasi_id}/>
        })
    ]

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return(
        <div>
            <input
                className="mb-5 rounded-lg w-96"
                placeholder="Search..."
                onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            />
            <TanstackTable table={table} alignTable="table-auto"/>
        </div>
    )
}

function DifferenceDaysCell({
    difference
}){
    const bgColor = difference < -120 ? 'bg-gray-500' :
                    difference < 7 ? 'bg-red-500' :
                    difference <= 120 ? 'bg-orange-500' :
                    'bg-green-500'

    return(
        <div className={`flex items-center justify-center rounded-md py-1 ${bgColor}`}>
            <p className={`text-white font-bold`}>{difference}</p>
        </div>
    )
}

function DetailsDialog({
    nip,
    jenis_sertifikasi_id
}){

}
