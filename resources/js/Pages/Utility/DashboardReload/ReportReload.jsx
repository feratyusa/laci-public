import LoadingCircle from "@/Components/Loading/LoadingCircle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { forEach, get, groupBy, isEmpty, map, values } from "lodash"
import { useEffect } from "react";
import { useState } from "react"

function ReportReloadRow({
    value,
    column,
    startDate,
    endDate,
    setDetail,
    setDetailName,
    setPelatihanName,
}){
    const [data, setData] = useState(null)

    useEffect(() => {
        setData(null)
        axios.get(route('reportReload.get.ColumnValues'), {params: {start_date: startDate, end_date: endDate, column: column, value: value}})
            .then((response) => {
                setData(response.data.result)
            })
    }, [startDate, endDate])

    return(
        <tr className="border-2 border-red-500">
            <td className="p-2">
                <p className="uppercase cursor-pointer underline text-blue-500"
                    onClick={() =>
                        {
                            var d = groupBy(data, ({pelatihan}) => pelatihan)
                            var e = forEach(d, (value, key) => d[key] = groupBy(d[key], (item) => {
                                return item.keterangan == null ? "HADIR" : item.keterangan == "TIDAK HADIR" ? "TIDAK" : item.keterangan
                            }))

                            setDetail(e)
                            if (column == "sertifikasi") {
                                setDetailName(`${value == "non" ? "non" : ""} ${column}`)
                            }
                            else{
                                setDetailName(`${column} ${value}`)
                            }
                            setPelatihanName(null)
                        }
                    }
                >
                    {value}
                </p>
            </td>
            {
                data == null ?
                <td colSpan={3}>
                    <div className="flex items-center justify-center ">
                        <LoadingCircle size="w-5 h-5"/>
                    </div>
                </td>
                :
                <>
                    <td>
                        <p>{data.length}</p>
                    </td>
                    <td>
                        <p>{data.filter(f => f.keterangan == null).length}</p>
                    </td>
                    <td>
                        <p>{data.filter(f => f.keterangan != null).length}</p>
                    </td>
                </>
            }
        </tr>
    )
}

function ReportReloadTable({
    name,
    data=[],
    startDate,
    endDate,
    setDetail,
    setDetailName,
    setPelatihanName
}){
    console.log(data)
    return(
        <table className="text-center">
            <thead>
                <tr className="border-2 border-red-500 bg-red-500 text-white">
                    <th className="p-2 capitalize">{name}</th>
                    <th className="p-2">Jumlah Peserta</th>
                    <th className="p-2">Hadir</th>
                    <th className="p-2">Tidak Hadir</th>
                </tr>
            </thead>
            <tbody>
                {
                    isEmpty(data) ?
                    <tr className="border-2 border-red-500">
                            <td className="p-2 bg-gray-200" colSpan={5}>
                                <p className="uppercase font-bold">
                                    Kosong
                                </p>
                            </td>
                        </tr>
                    :
                    data.map(value => (
                        <ReportReloadRow
                            value={value}
                            column={name}
                            startDate={startDate}
                            endDate={endDate}
                            setDetail={setDetail}
                            setDetailName={setDetailName}
                            setPelatihanName={setPelatihanName}
                        />
                    ))
                }
            </tbody>
        </table>
    )
}

function DetailsData({data=[], setParticipants, setParticipantName, setShowDeskripsi}){
    const [arrayData, setArrayData] = useState(map(data, (value, prop) => ({prop, value})))
    console.debug(arrayData)

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor(row => row.prop, {
            id: 'pelatihan',
            header:<span>Pelatihan</span>,
            cell: ({row}) =><p>{row.original.prop}</p>,
            enableSorting: false,
        }),
        columnHelper.accessor(row => row?.value['HADIR']?.length ?? 0, {
            id: 'hadir',
            header:<span>Hadir</span>,
            cell: ({row}) =>
                    <p className="underline text-blue-500 cursor-pointer"
                        onClick={() => {
                                setParticipants(row.original?.value['HADIR'] ?? [])
                                setParticipantName(row.original.prop + " - Hadir")
                                setShowDeskripsi(false)
                            }
                        }
                    >
                        {Number(row.original.value['HADIR']?.length ?? 0)}
                    </p>,
        }),
        columnHelper.accessor(row => row?.value['SAKIT']?.length ?? 0, {
            id: 'sakit',
            header:<span>Sakit</span>,
            cell: ({row}) =>
                <p className="underline text-blue-500 cursor-pointer"
                    onClick={() => {
                            setParticipants(row.original?.value['SAKIT'] ?? [])
                            setParticipantName(row.original.prop + " - Sakit")
                            setShowDeskripsi(true)
                        }
                    }
                >
                    {row.original.value['SAKIT']?.length ?? 0}
                </p>,
        }),
        columnHelper.accessor(row => row?.value['TIDAK']?.length ?? 0, {
            id: 'tidak',
            header:<span>Ijin / Tidak Hadir</span>,
            cell: ({row}) =>
                <p className="underline text-blue-500 cursor-pointer"
                    onClick={() => {
                            setParticipants(row.original?.value['TIDAK'] ?? [])
                            setParticipantName(row.original.prop + " - Tidak Hadir")
                            setShowDeskripsi(true)
                        }
                    }
                >
                    {row.original.value['TIDAK']?.length ?? 0}
                </p>,
        }),
    ]

    const table = useReactTable({
        data: arrayData,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
    })

    useEffect(() => {
        setArrayData(map(data, (value, prop) => ({prop, value})))
    }, [data])

    return(
        <>
            <div className="mb-2">
                <input
                    className="rounded-md"
                    value={table.getState().globalFilter}
                    onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search ..."
                />
            </div>
            <TanstackTable table={table} />
        </>
    )
}

function ParticipantDetails({data}){
    console.debug(data)
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('nip', {
            header:<span>NIP</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('nama', {
            header:<span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('jabatan', {
            header:<span>Jabatan</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('cabang', {
            header:<span>Cabang</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('pelatihan', {
            header:<span>Pelatihan</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('tgl_mulai', {
            header:<span>Tanggal Mulai</span>,
            cell: info => new Date(info.getValue()).toLocaleDateString()
        }),
        columnHelper.accessor(row =>
            Math.floor((new Date(row.tgl_selesai).getTime() - new Date(row.tgl_mulai).getTime()) / (1000 * 60 * 60 * 24))+1, {
                id: 'duration',
                header:<span>Durasi</span>,
                cell: info => info.getValue()
        }),
        columnHelper.accessor('deskripsi', {
            id: 'deskripsi',
            header:<span>Deskripsi</span>,
            cell: info => info.getValue(),
        }),
    ]

    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        globalFilterFn: 'includesString',
    })

    return(
        <>
            <div className="mb-2">
                <input
                    className="rounded-md"
                    value={table.getState().globalFilter}
                    onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search ..."
                />
            </div>
            <TanstackTable table={table} alignTable="table-auto"/>
        </>
    )
}

export default function ReportReload({
    startDate,
    endDate,
}){
    const [detailName, setDetailName] = useState(null)
    const [pelatihanName, setPelatihanName] = useState(null)
    const [detail, setDetail] = useState([])
    const [participants, setParticipants] = useState([])
    const [showDeskripsi, setShowDeskripsi] = useState(false)

    const [columns, setColumns] = useState(null)

    useEffect(() => {
        axios.get(route('reportReload.get.AllColumnValues'))
            .then((response) => {
                setColumns(response.data.result)
            })
    }, [startDate, endDate])

    return(
        <div className="p-5">
            {
                columns == null ?
                <div className="flex justify-center mt-2">
                    <LoadingCircle />
                </div>
                :
                <div className="flex gap-10 justify-center">
                    <div className="mb-5">
                        <ReportReloadTable
                            name="sektor"
                            data={get(columns, 'sektor')}
                            setDetail={setDetail}
                            setDetailName={setDetailName}
                            setPelatihanName={setPelatihanName}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    </div>
                    <div className="flex flex-col items-center mb-5">
                        <div className="mb-5">
                            <ReportReloadTable
                                name="kategori"
                                data={get(columns, 'kategori')}
                                setDetail={setDetail}
                                setDetailName={setDetailName}
                                setPelatihanName={setPelatihanName}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="mb-5">
                            <ReportReloadTable
                                name="lini" data={get(columns, 'lini')}
                                setDetail={setDetail}
                                setDetailName={setDetailName}
                                setPelatihanName={setPelatihanName}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                        <div className="mb-5">
                            <ReportReloadTable
                                name="sertifikasi"
                                data={get(columns, 'sertifikasi')}
                                setDetail={setDetail}
                                setDetailName={setDetailName}
                                setPelatihanName={setPelatihanName}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </div>
                    </div>
                </div>
            }
            <div className="mb-5">
                {
                    detailName == null ?
                    <p className="text-[2px]">balls</p>
                    :
                    <>
                        <div className="mb-2">
                            <p className="text-lg text-red-500 font-bold capitalize">
                                Detail Pelatihan {detailName}
                            </p>
                        </div>
                        <DetailsData data={detail}
                            setParticipants={setParticipants}
                            setParticipantName={setPelatihanName}
                            setShowDeskripsi={setShowDeskripsi}
                        />
                    </>
                }
            </div>
            <div>
                {
                    pelatihanName == null ?
                    <p className="text-[2px]">balls</p>
                    :
                    <>
                        <div className="mb-2">
                            <p className="text-lg text-red-500 font-bold">
                                Detail Peserta {pelatihanName}
                            </p>
                        </div>
                        <ParticipantDetails data={participants} showDeskripsi={showDeskripsi}/>
                    </>
                }
            </div>
        </div>
    )
}
