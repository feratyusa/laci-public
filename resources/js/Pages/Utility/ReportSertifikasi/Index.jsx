import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card } from "@material-tailwind/react";
import axios from "axios";
import { first, get } from "lodash";
import { useEffect } from "react";
import { useState } from "react";
import ReportSertifikasiTable from "./ReportSertifikasiTable";
import { GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";

export default function Index({
    auth,
    jenis_sertifikasi=[],
    levels=[]
}){
    const {data, setData} = useForm({
        jenis_sertifikasi_id: first(jenis_sertifikasi)?.id,
        level_id: 0,
    })

    const [results, setResults] = useState([])
    const [subtitle, setSubtitle] = useState(null)

    function search(){
        setResults(null)
        setSubtitle(null)
        axios.get(route('get.report.sertifikasi'), {params: {jenis_sertifikasi_id: data.jenis_sertifikasi_id, level_id: data.level_id}})
            .then((response) => {
                setResults(response.data.results.sort((a, b) => new Date(a.expired) < new Date(b.expired) ? -1 : new Date(a.expired) > new Date(b.expired) ? 1 : 0))
                setSubtitle(response.data.subtitle)
            })
            .catch((error) => {
                console.log(error)
                setResults([])
                setSubtitle(null)
            })
    }

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Report Sertifikasi'}/>}
        >
            <Head title="Report Sertifikasi"/>

            <div className="container min-w-full p-5">
                <div className="w-full">
                    <div className="grid grid-cols-8 gap-2 m-5">
                        <div className="col-span-3">
                            <SertifikasiSelection sertifikasi={jenis_sertifikasi} data={data} setData={setData}/>
                        </div>
                        <div className="col-span-4">
                            <LevelSelection levels={levels} data={data} setData={setData}/>
                        </div>
                        <div className="col-span-1">
                            <Button className="w-full" color="blue" loading={results == null} onClick={search}>
                                Cari
                            </Button>
                        </div>
                    </div>
                    <Card className="m-5 p-5">
                        <div className="flex items-center gap-5 text-red-500 m-5">
                            <GlobeAsiaAustraliaIcon className="w-10"/>
                            <div>
                                <p className="text-2xl font-bold">Report Sertifikasi</p>
                                    {
                                        subtitle &&
                                        <p className="text-sm">
                                            {subtitle}
                                        </p>
                                    }
                            </div>
                        </div>
                        <div className="m-5">
                            <div className="mb-5">
                                <ExportButton
                                    jenis_sertifikasi_id={data.jenis_sertifikasi_id}
                                    level_id={data.level_id}
                                />
                            </div>
                            <ReportSertifikasiTable
                                data={results}
                            />
                        </div>
                    </Card>
                </div>
            </div>
        </Authenticated>
    )
}

function ExportButton({
    jenis_sertifikasi_id,
    level_id
}){
    return(
        <a href={route('report.sertifikasi.export', {jenis_sertifikasi_id: jenis_sertifikasi_id, level_id: level_id})} target="__blank">
            <Button color="green">
                Export Report Sertifikasi
            </Button>
        </a>
    )
}

function SertifikasiSelection({
    sertifikasi,
    data,
    setData,
}){
    return(
        <select
            className="w-full rounded-md"
            value={data.jenis_sertifikasi_id}
            onChange={(e) => setData('jenis_sertifikasi_id', e.target.value)}
        >
            <option value="0">Semua</option>
            {
                sertifikasi.map(s => (
                    <option value={get(s, 'id', 'sack')}>{get(s, 'nama', 'balls')}</option>
                ))
            }
        </select>
    )
}

function LevelSelection({
    levels,
    data,
    setData,
}){
    const [selections, setSelections] = useState([])

    useEffect(() => {
        if (data.jenis_sertifikasi_id == 0) {
            setSelections([])
        }
        else{
            setSelections(levels.filter(l => l.jenis_sertifikasi_id == data.jenis_sertifikasi_id))
        }
        setData('level_id', 0)
    }, [data.jenis_sertifikasi_id])

    return(
        <select
            className="w-full rounded-md"
            value={data.level_id}
            onChange={(e) => setData('level_id', e.target.value)}
        >
            <option value="0">Semua</option>
            {
                selections.map(l => (
                    <option value={get(l, 'id', 'balls')}>{get(l, 'level', 'sack')}</option>
                ))
            }
        </select>
    )
}
