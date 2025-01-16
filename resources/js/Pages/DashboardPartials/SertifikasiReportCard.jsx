import LoadingCircle from "@/Components/Loading/LoadingCircle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { differenceInDays } from "date-fns";
import { useEffect } from "react";
import { useState } from "react";
import TitleReportCard from "./TitleReportCard";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";

export default function SertifikasiReportCard(){
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(route('get.report.sertifikasi'), {params: {jenis_sertifikasi_id: 0, level_id: 0, limit: 1000}})
            .then((response) => {
                setData(response.data.results.sort((a, b) => new Date(a.expired) < new Date(b.expired) ? -1 : new Date(a.expired) > new Date(b.expired) ? 1 : 0))
            })
    }, [])

    return(
        <div className="bg-white rounded-lg m-5 p-5">
            <div className='mb-5'>
                <TitleReportCard textSize='xl'>
                    <GlobeAsiaAustraliaIcon className='w-8'/>
                    <div>
                        <p className='font-bold'>Rekap Sertifikasi Pegawai</p>
                        <p className='text-sm'>untuk rekap lainnya dapat menggunakan menu <a href={route('report.sertifikasi.index')} className='underline text-blue-500'>Report Sertifikasi</a></p>
                    </div>
                </TitleReportCard>
            </div>
            {
                data == null ?
                <div className="flex justify-center items-center">
                    <LoadingCircle />
                </div>
                :
                <SertifikasiTable data={data}/>

            }
        </div>
    )
}

function SertifikasiTable({
    data
}){
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
    ]

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel()
    })

    return(
        <div>
            <input
                className="mb-5 rounded-lg w-full"
                placeholder="Search Global ..."
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
