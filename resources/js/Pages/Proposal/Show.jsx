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
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

function ProposalHeader({proposal, color}){
    return(
        <>
            <div className="col-span-2">
                <IconButton
                    variant="text"
                    color={color}
                    ripple={false}
                >
                    <DocumentTextIcon className="w-10"/>
                </IconButton>
            </div>
            <div className="col-span-10">
                <Typography
                    variant="h4"
                    color={color}
                >
                    {proposal.name}
                </Typography>
            </div>
        </>
    )
}

export default function Show({auth, code, status, proposal, events, categories, mandatoryFiles=[]}){
    const [color, ] = useState('red')
    const tabListClass = "p-3 bg-red-100 uppercase font-bold rounded-lg text-red-500 data-[hover]:bg-red-300 data-[hover]:text-white data-[selected]:bg-red-500 data-[selected]:text-white border-0 focus:ring-0"

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'detail usulan'}/>}
        >
            <Head title={proposal.name}/>

            <div className="w-full p-5">
                <BreadcrumbMod menu={'proposals'} title={proposal.name}/>

                <Card className="mt-10">
                    <CardHeader className={"flex items-center gap-10 px-20 py-5"}>
                        <ProposalHeader proposal={proposal} color={color} />
                    </CardHeader>
                    <CardBody className="m-5">
                        <TabGroup>
                            <TabList className={"grid grid-cols-12 gap-5 mb-5"}>
                                <Tab className={tabListClass}>Detail</Tab>
                                <Tab className={tabListClass}>File</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel className={'border-gray-500 border-2 p-5 rounded-lg'}>
                                    <ProposalDetails proposal={proposal} color={color} categories={categories} events={proposal.events}/>
                                </TabPanel>
                                <TabPanel>
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
                                    <Files 
                                        files={proposal.files} 
                                        mandatoryFiles={mandatoryFiles} 
                                        routeFile={route('file.store.proposal', [proposal.id])}
                                        contentName={proposal.name}
                                    />
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}