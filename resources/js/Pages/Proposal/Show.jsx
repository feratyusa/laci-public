import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, CardHeader, Chip, IconButton, Input, Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
 } from "@material-tailwind/react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Statuses from "@/Base/Statuses";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import MultipleFileInput from "@/Components/MultipleFileInput";
import HeaderTitle from "@/Components/HeaderTitle";
import { Head } from "@inertiajs/react";

function TableRow({name, value, color="red", chip=null}){    
    return(
        <div className="table-row">
            <div className={"table-cell border-b-2 py-4 w-60"}>
                <Typography variant="h6">
                    {name}
                </Typography>
            </div>
            <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                {
                    chip ?
                    <Chip 
                        className="w-fit"
                        color={color}
                        value={value}
                    /> :
                    <Typography variant="h6">
                        {value}
                    </Typography>
                }
            </div>
        </div>
    )
}

export default function Show({auth, proposal}){
    const [color, ] = useState(Statuses.find(s => s.value === proposal.status).color)
    const dateoptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'detail usulan'}/>}
        >
            <Head title={proposal.name}/>

            <div className="container min-w-full p-5">
                <BreadcrumbMod menu={'proposals'} title={proposal.name}/>
                <Card className="mt-10">
                    <CardHeader 
                        className={"flex items-center justify-between px-20 py-3 shadow-"+color+"-100"}>
                            <IconButton
                                variant="text"
                                color={color}
                                ripple={false}
                            >
                                <DocumentTextIcon className="h-10 w-10"/>
                            </IconButton>
                            <Typography
                                variant="h4"
                                color={color}
                            >
                                {proposal.name}
                            </Typography>
                            <Chip
                                variant="ghost"
                                color={color}
                                value={proposal.status}
                            />                            
                    </CardHeader>
                    <CardBody>
                        <div className="table w-full p-2 mb-10">
                            <div className="table-row-group">
                                <TableRow name={"ID Usulan"} value={proposal.id} />
                                <TableRow name={"Nama Usulan"} value={proposal.name}  />
                                <TableRow name={"Kategori"} value={proposal.event_category}  />
                                <TableRow name={"Kode Kursus"} value={proposal.kd_kursus}  />
                                <TableRow name={"Tanggal Masuk Usulan"} value={new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}  />
                                <TableRow name={"Status"} value={proposal.status} color={color} chip={true} />
                                <TableRow name={"Tanggal Dibuat"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
                                <TableRow name={"Tanggal Diupdate"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
                            </div>
                        </div>
                    </CardBody>
                </Card>

            </div>
        </Authenticated>
    )
}