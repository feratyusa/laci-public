import LoadingCircle from "@/Components/Loading/LoadingCircle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { differenceInDays } from "date-fns";
import DetailTableDialog from "./DetailTableDialog";
import { useEffect } from "react";
import { useState } from "react";

export default function ReportSertifikasiTable({
    data,
}){
    return(
        data == null ?
        <div className="flex justify-center items-center">
            <LoadingCircle size="h-8 w-8"/>
        </div>
        :
        <ReportTable
            data={data}
        />
    )
}

function ReportTable({
    data,
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
        columnHelpers.accessor(row => differenceInDays(new Date(row.expired), new Date()), {
            id: 'durations',
            header: <span>Expired in (days)</span>,
            cell: info => <DifferenceDaysCell difference={info.getValue()}/>,
            filterFn: 'FilterNumbered'
        }),
        columnHelpers.accessor(row => row.nip, {
            id: 'details',
            header: <span>Detail</span>,
            cell: ({row}) => <DetailTableDialog nip={row.original.nip} jenis_sertifikasi_id={row.original.jenis_sertifikasi_id}/>
        })
    ]

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        filterFns: {
            FilterNumbered: (rows, columnId, filterValue) => {
                if (filterValue.max && filterValue.min) {
                    return rows.getValue('durations') >= Number(filterValue.min) && rows.getValue('durations') <= Number(filterValue.max)
                }
                else if(filterValue.max){
                    return rows.getValue('durations') <= Number(filterValue.max)
                }
                else if(filterValue.min){
                    return rows.getValue('durations') >= Number(filterValue.min)
                }
                return true
            }
        }
    })

    return(
        <div>
            <div className="grid grid-cols-2 gap-5">
                <div className="w-full">
                    <p>Filter Global</p>
                    <input
                        className="mb-5 rounded-lg w-full"
                        placeholder="Search Global ..."
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                    />
                </div>
                <div>
                    <p>Filter Durasi Expired</p>
                    <div className="grid grid-cols-2 gap-2">
                        <input
                            className="mb-5 rounded-lg"
                            placeholder="Durasi Minimum ..."
                            onChange={(e) => table.getColumn('durations').setFilterValue({...table.getColumn('durations').getFilterValue(), min: e.target.value})}
                        />
                        <input
                            className="mb-5 rounded-lg"
                            placeholder="Durasi Maksimum ..."
                            onChange={(e) => table.getColumn('durations').setFilterValue({...table.getColumn('durations').getFilterValue(), max: e.target.value})}
                        />
                    </div>
                </div>
            </div>
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
