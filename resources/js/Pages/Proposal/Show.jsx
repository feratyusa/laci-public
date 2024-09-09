import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, CardHeader, Chip, IconButton, Typography, Alert } from "@material-tailwind/react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import Statuses from "@/Base/Statuses";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import ProposalDetails from "./Partials/Details";
import Files from "./Partials/Files";
import DialogAddFile from "@/Components/Dialogs/DialogAddFile";

export default function Show({auth, code, status, proposal, events, categories, mandatoryFiles=[]}){
    const [color, ] = useState(Statuses.find(s => s.value === proposal.status).color)

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'detail usulan'}/>}
        >
            <Head title={proposal.name}/>

            <div className="w-full p-5">
                <BreadcrumbMod menu={'proposals'} title={proposal.name}/>
                
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Card className="w-full mt-5">
                            <CardHeader 
                                className={"flex items-center justify-between px-20 py-3"}>
                                    <IconButton
                                        variant="text"
                                        color={color}
                                        ripple={false}
                                    >
                                        <DocumentTextIcon className="w-10"/>
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
                                <ProposalDetails proposal={proposal} color={color} categories={categories} events={proposal.events}/>
                            </CardBody>
                        </Card>
                    </div>
                    <div>
                        <Card className="w-full mt-5">
                            <CardHeader className="px-20 py-3">
                                <Typography
                                    variant="h4"
                                    color="black"
                                >
                                    File(s)
                                </Typography>
                            </CardHeader>
                            <CardBody>
                                <div className="mb-5">
                                    <DialogAddFile 
                                        content={"proposal"} 
                                        content_id={proposal.id} 
                                        content_name={proposal.name} 
                                        categories={categories} 
                                        as="text"
                                        route={route('file.store')}
                                    />
                                </div>
                                <Files files={proposal.files} mandatoryFiles={mandatoryFiles}/>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}