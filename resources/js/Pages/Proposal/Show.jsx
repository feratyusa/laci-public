import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, CardHeader, Chip, IconButton, Typography, Alert } from "@material-tailwind/react";
import { DocumentTextIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import { TabGroup, Tab, TabList, TabPanels, TabPanel } from "@headlessui/react";
import Statuses from "@/Base/Statuses";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import DialogDelete from "@/Components/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import DialogAddFile from "@/Components/DialogAddFile";

function TableRow({name, value=null, color="red", option=null}){    
    return(
        <div className="table-row">
            <div className={"table-cell border-b-2 py-4 w-60"}>
                <Typography variant="h6">
                    {name}
                </Typography>
            </div>
            <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                {
                    option == "chip" ?
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

export default function Show({auth, code, status, proposal, categories, files}){
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

                {status && 
                            <Alert color={code===0 ? "red" : code===1 ? 'green' : 'amber'}>
                                {status}
                            </Alert>}

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
                        <div className="table w-full p-2 mb-5">
                            <div className="table-row-group">
                                <TableRow name={"ID Usulan"} value={proposal.id} />
                                <TableRow name={"Nama Usulan"} value={proposal.name}  />
                                <TableRow name={"Kategori"} value={proposal.event_category}  />
                                <TableRow name={"Kode Kursus"} value={proposal.kd_kursus}  />
                                <TableRow name={"Tanggal Masuk Usulan"} value={new Date(proposal.entry_date).toLocaleDateString('id', dateoptions)}  />
                                <TableRow name={"Status"} value={proposal.status} color={color} option={'chip'} />
                                <TableRow name={"Tanggal Dibuat"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
                                <TableRow name={"Tanggal Diupdate"} value={new Date(proposal.created_at).toLocaleTimeString('id', dateoptions)} color={color} />
                                <div className="table-row">
                                    <div className={"table-cell border-b-2 py-4 w-60"}>
                                        <Typography variant="h6">
                                            Options
                                        </Typography>
                                    </div>
                                    <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                                        <div className="flex flex-row gap-5">
                                            <DialogAddFile 
                                                content={"proposal"} 
                                                content_id={proposal.id} 
                                                content_name={proposal.name} 
                                                categories={categories} 
                                                route={route('file.store')}
                                            />
                                            <OptionButton tip="Edit Proposal" link={route('proposal.edit', [proposal.id])} color="yellow" variant="filled">
                                                <Cog8ToothIcon className="w-5"/>
                                            </OptionButton>
                                            <DialogDelete
                                                key={proposal.id}
                                                content="Proposal"
                                                title={"Hapus Proposal?"}
                                                message={"Proposal "+proposal.name+" akan dihapus. Proposal yang telah dihapus tidak dapat dikembalikan."}
                                                route={route('proposal.destroy', [proposal.id])}
                                            /> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-start">
                            <Typography variant="h4">File</Typography>
                            <div className="grid grid-cols-5 max-w-full border-y-2 gap-4 my-5 p-2">
                                {
                                    files.map((file, index) => (
                                        <div>
                                            <div>{file.id}</div>
                                            <div>{file.category}</div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}