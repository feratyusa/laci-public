import LoadingCircle from "@/Components/Loading/LoadingCircle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function DetailTableDialog({
    nip,
    jenis_sertifikasi_id,
}){
    const [open, setOpen] = useState(false)

    return(
        <>
            <Button className="flex items-center gap-2" color="orange" onClick={() => setOpen(true)} size="sm">
                <MagnifyingGlassIcon className="w-4"/>
                Sertifikasi
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/30 ease-in duration-200 data-[closed]:opacity-0"
                />

                {/* Full-screen container to center the panel */}
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                    {/* The actual dialog panel  */}
                    <DialogPanel
                        transition
                        className="w-full max-w-7xl max-h-[90vh] space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0 overflow-auto"
                    >
                        <DialogTitle className="flex items-center justify-center">
                            <p className="text-2xl font-bold text-red-500">
                                Detail Sertifikasi Pegawai {nip}
                            </p>
                        </DialogTitle>
                        <SertifikasiTable nip={nip} jenis_sertifikasi_id={jenis_sertifikasi_id}/>
                        <div className="flex justify-center items-center m-5">
                            <Button color="orange" onClick={() => setOpen(false)}>
                                Tutup
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}

function SertifikasiTable({
    nip,
    jenis_sertifikasi_id
}){
    const [data, setData] = useState(null)

    useEffect(() => {
        axios.get(route('get.report.sertifikasi.allCourses', [nip]), {params: {jenis_sertifikasi_id: jenis_sertifikasi_id}})
            .then((response) => {
                setData(response.data.courses)
            })
    }, [])

    return(
        data == null ?
        <div className="flex justify-center">
            <LoadingCircle />
        </div>
        :
        <SertifikasiTableDetails data={data}/>
    )
}

function SertifikasiTableDetails({
    data
}){
    const columnHelpers = createColumnHelper()
    const columns = [
        columnHelpers.accessor('kd_kursus', {
            header: <span>Kode Kursus</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('lengkap', {
            header: <span>Kursus</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => `${row.nama} ${row.level}`, {
            id: 'sertifikasi',
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
    ]
    const table = useReactTable({
        data: data,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return(
        <div>
            <div className="mb-3">
                <input
                    className="rounded-md"
                    onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                    placeholder="Search..."
                />
            </div>
            <TanstackTable table={table} alignTable="table-auto"/>
        </div>
    )
}
