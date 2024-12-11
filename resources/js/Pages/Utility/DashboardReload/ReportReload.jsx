import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { forEach, get, groupBy, isEmpty, map, values } from "lodash"
import { useEffect } from "react";
import { useState } from "react"

function ReportReloadTable({
    name,
    data={},
    setDetail,
    setDetailName,
}){
    return(
        <table className="text-center">
            <thead>
                <tr className="border-2 border-red-500 bg-red-500 text-white">
                    <th className="py-2 px-10 capitalize">{name}</th>
                    <th className="py-2 px-10">Jumlah</th>
                </tr>
            </thead>
            <tbody>
                {
                    isEmpty(data) ?
                    <tr className="border-2 border-red-500">
                            <td className="p-2 bg-gray-200" colSpan={2}>
                                <p className="uppercase font-bold">
                                    Kosong
                                </p>
                            </td>
                        </tr>
                    :
                    Object.keys(data).map((key, index) => (
                        <tr className="border-2 border-red-500">
                            <td className="p-2">
                                <p className="uppercase cursor-pointer underline text-blue-500"
                                    onClick={() =>
                                        {
                                            var d = groupBy(data[key], ({pelatihan}) => pelatihan)
                                            var e = forEach(d, (value, key) => d[key] = groupBy(d[key], (item) => {
                                                return item.keterangan == null ? "HADIR" : item.keterangan == "TIDAK HADIR" ? "TIDAK" : item.keterangan
                                            }))

                                            setDetail(e)
                                            if (name == "sertifikasi") {
                                                setDetailName(`${key == "non" ? "non" : ""} ${name}`)
                                            }
                                            else{
                                                setDetailName(`${name} ${key}`)
                                            }
                                        }
                                    }>
                                    {key}
                                </p>
                            </td>
                            <td>
                                <p>{data[key].length}</p>
                            </td>
                        </tr>
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
        }),
        columnHelper.accessor(row => row.value, {
            id: 'num',
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
                        {row.original.value['HADIR']?.length ?? 0}
                    </p>,
        }),
        columnHelper.accessor(row => row.value, {
            id: 'num',
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
        columnHelper.accessor(row => row.value, {
            id: 'num',
            header:<span>Tidak Hadir</span>,
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
    })

    useEffect(() => {
        setArrayData(map(data, (value, prop) => ({prop, value})))
    }, [data])

    return(
        <TanstackTable table={table} />
    )
}

function ParticipantDetails({data, showDeskripsi=false}){
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
    })

    return(
        <TanstackTable table={table} alignTable="table-auto"/>
    )
}

export default function ReportReload({
    reports=[]
}){
    const [detailName, setDetailName] = useState(null)
    const [pelatihanName, setPelatihanName] = useState(null)
    const [detail, setDetail] = useState([]);
    const [participants, setParticipants] = useState([])
    const [showDeskripsi, setShowDeskripsi] = useState(false)

    return(
        <div className="p-5">
            <div className="flex gap-10 justify-center">
                <div className="mb-5">
                    <ReportReloadTable name="sektor" data={get(reports, 'sektor')} setDetail={setDetail} setDetailName={setDetailName}/>
                </div>
                <div className="flex flex-col items-center mb-5">
                    <div className="mb-5">
                        <ReportReloadTable name="kategori" data={get(reports, 'kategori')} setDetail={setDetail} setDetailName={setDetailName}/>
                    </div>
                    <div className="mb-5">
                        <ReportReloadTable name="lini" data={get(reports, 'lini')} setDetail={setDetail} setDetailName={setDetailName}/>
                    </div>
                    <div className="mb-5">
                        <ReportReloadTable name="sertifikasi" data={get(reports, 'sertifikasi')} setDetail={setDetail} setDetailName={setDetailName}/>
                    </div>
                </div>
            </div>
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
