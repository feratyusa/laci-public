import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import HeaderTitle from "@/Components/HeaderTitle";
import InputDateDashboard from "./InputDateDashboard";
import { useState } from "react";
import LoadingCircle from "@/Components/Loading/LoadingCircle";
import ReportReload from "./ReportReload";
import { Card } from "@material-tailwind/react";
import { TableCellsIcon } from "@heroicons/react/24/outline";

export default function Index({
    auth
}) {
    const [reportData, setReportData] = useState([]);
    const [loaded, setLoaded] = useState(true);

    console.debug(reportData);

    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Dashboard Reload'}/>}
        >
            <Head title="Dashboard Reload"/>

            <div className="container min-w-full p-5">
                <div className="w-full">
                    <InputDateDashboard
                        setReportData={setReportData}
                        setLoaded={setLoaded}
                        loaded={loaded}
                    />
                    <Card className="m-5 p-5">
                        <div className="flex gap-5 text-red-500 font-bold">
                            <TableCellsIcon className="w-10"/>
                            <div>
                                <p className="text-2xl">Report Pendidikan Reload</p>
                                <p className="text-xs italic text-gray-700 capitalize">menampilkan detail peserta beserta keterangannya</p>
                            </div>
                        </div>
                        <div className="m-5">
                            {
                                loaded ?
                                <ReportReload reports={reportData}/>
                                :
                                <div className="flex justify-center">
                                    <LoadingCircle />
                                </div>
                            }
                        </div>
                    </Card>
                </div>
            </div>
        </Authenticated>
    )
}
