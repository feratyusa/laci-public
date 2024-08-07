import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, CardHeader, Chip, IconButton, Typography, Alert } from "@material-tailwind/react";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Head } from "@inertiajs/react";
import Statuses from "@/Base/Statuses";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import ProposalDetails from "./Partials/Details";
import DisclosureFile from "@/Components/DisclosureFile";
import FileCard from "@/Components/FileCard";
import Files from "./Partials/Files";

export default function Show({auth, code, status, proposal, categories, files}){
    const [color, ] = useState(Statuses.find(s => s.value === proposal.status).color)

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'detail usulan'}/>}
        >
            <Head title={proposal.name}/>

            <div className="w-full p-5">
                <BreadcrumbMod menu={'proposals'} title={proposal.name}/>

                {status && 
                            <Alert color={code===0 ? "red" : code===1 ? 'green' : 'amber'}>
                                {status}
                            </Alert>}

                <Card className="max-w-2mt-10">
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
                        <ProposalDetails proposal={proposal} color={color} categories={categories}/>
                        <Files files={proposal.files}/>
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}