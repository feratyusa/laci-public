import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, CardHeader, IconButton, Typography, Alert, Button } from "@material-tailwind/react";
import { DocumentIcon, DocumentMagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import EventDetails from "./Partials/Details";
import Files from "./Partials/Files";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { useState } from "react";
import DialogAddFile from "@/Components/Dialogs/DialogAddFile";
import DialogAddParticipant from "@/Components/Dialogs/DialogAddParticipant";
import Participants from "./Partials/Participants";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";

function TabButton({name}){
    return(
        <>
            <div className="w-8">
                {name == 'Partisipan' ? <UserPlusIcon className="w-full" /> : <DocumentIcon className="w-full"/>}
            </div>
            <div>
                <p className="font-bold text-2xl">{name}</p>
            </div>
        </>
    )
}

function EventTabs({event, categories, participants, mandatoryFiles}){
    const tabClass = "flex items-center justify-center p-4 text-red-500 hover:bg-red-500 hover:text-white ring-0 border-0"
    const [selectedIndex, setSelectedIndex] = useState(0)
    console.log(selectedIndex)

    return(
        <TabGroup 
            defaultIndex={selectedIndex} selectedIndex={selectedIndex} onChange={(index) => setSelectedIndex(index)}>
            <TabList className="grid grid-cols-2">
                <Tab className={`rounded-tl-md ${tabClass} ${selectedIndex == 0 ? "bg-red-100" : ""}`}>
                    <TabButton name={"File(s)"} />
                </Tab>
                <Tab className={`rounded-tr-md ${tabClass} ${selectedIndex == 1 ? "bg-red-100" : ""}`}>
                    <TabButton name={"Partisipan"} />
                </Tab>
            </TabList>
            <TabPanels className={"p-5"}>
                <TabPanel>
                    <div className="mb-5">
                        <DialogAddFile 
                            content={"event"} 
                            content_id={event.id} 
                            content_name={event.name} 
                            categories={categories} 
                            as="text"
                            route={route('file.store')}
                        />
                    </div>
                    <Files files={event?.files} mandatoryFiles={mandatoryFiles}/>
                </TabPanel>
                <TabPanel>
                    <div className="flex justify-between mb-5">
                        <DialogAddParticipant 
                            participants={participants}
                            route={route('event.participant.store', [event.id])}
                        />
                        <Button className="flex gap-2 h-fit w-fit items-center" color="green">
                            <ClipboardDocumentListIcon className="w-5"/>
                            Undangan
                        </Button>
                    </div>
                    <Participants participants={event.participants} event={event}/>
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default function Show({auth, code, status, event, categories, proposalRoute, participants=[], mandatoryFiles=[]}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'detail usulan'}/>}
        >
            <Head title={event.name}/>

            <div className="container min-w-full p-5">
                <BreadcrumbMod menu={'events'} title={event.name}/>

                {status && 
                            <Alert color={code===0 ? "red" : code===1 ? 'green' : 'amber'}>
                                {status}
                            </Alert>}
                
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <Card>
                            <CardBody>
                                <div className="flex items-center gap-5 mb-5 text-wrap text-red-500">
                                    <div className="w-10">
                                        <DocumentMagnifyingGlassIcon className="w-full"/>
                                    </div>
                                    <div className="w-full">
                                        <p className="font-bold text-2xl">{event.name}</p>
                                    </div>
                                </div>
                                <EventDetails event={event} categories={categories} proposalRoute={proposalRoute}/>
                            </CardBody>
                        </Card>
                    </div>
                    <div>
                        <div className="rounded-md bg-white shadow-lg w-full">
                            <EventTabs event={event} categories={categories} participants={participants} mandatoryFiles={mandatoryFiles}/>                                                             
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}