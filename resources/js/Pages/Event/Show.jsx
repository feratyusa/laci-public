import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, Alert, Button } from "@material-tailwind/react";
import { DocumentIcon, DocumentMagnifyingGlassIcon, UserGroupIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import { Head, Link } from "@inertiajs/react";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import EventDetails from "./Partials/Details";
import Files from "./Partials/Files";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import DialogAddFile from "@/Components/Dialogs/DialogAddFile";
import DialogAddParticipant from "@/Components/Dialogs/DialogAddParticipant";
import Participants from "./Partials/Participants";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import ImportFromAttendence from "./Partials/ImportFromAttendence";
import MigrateToDiklatDialog from "./Partials/MigrateToDiklatDialog";
import { get } from "lodash";

function TabButton({name}){
    return(
        <>
            <div className="w-5">
                {name == 'Peserta' ? <UserPlusIcon className="w-full" /> : <DocumentIcon className="w-full"/>}
            </div>
            <div>
                <p className="font-bold">{name}</p>
            </div>
        </>
    )
}

export default function Show({auth, code, status, event, categories, proposalRoute, participants=[], mandatoryFiles=[]}){
    const [reload, setReload] = useState(true)

    const tabListClass = "p-3 flex gap-2 bg-red-100 uppercase font-bold rounded-lg text-red-500 data-[hover]:bg-red-300 data-[hover]:text-white data-[selected]:bg-red-500 data-[selected]:text-white border-0 focus:ring-0"

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
                
                <Card className="p-5">
                    <div className="flex items-center gap-5 text-wrap text-red-500">
                        <div className="w-10">
                            <DocumentMagnifyingGlassIcon className="w-full"/>
                        </div>
                        <div className="w-full">
                            <p className="font-bold text-2xl">{event.name}</p>
                        </div>
                    </div>
                    <CardBody className="m-5">
                        <TabGroup>
                            <TabList className={"flex items-center gap-5 mb-5"}>
                                <Tab className={tabListClass}>
                                    <TabButton name={'Detail'}/>
                                </Tab>
                                <Tab className={tabListClass}>
                                    <TabButton name={'File(s)'}/>
                                </Tab>
                                <Tab className={tabListClass}>
                                    <TabButton name={'Peserta'}/>
                                </Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel className={'border-gray-500 border-2 p-5 rounded-lg'}>
                                    <EventDetails event={event} categories={categories} proposalRoute={proposalRoute}/>
                                </TabPanel>
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
                                    <Files
                                        files={event?.files} 
                                        mandatoryFiles={mandatoryFiles}                                         
                                        routeFile={route('file.store.event', [event.id])}
                                        contentName={event.name}
                                    />
                                </TabPanel>
                                <TabPanel>
                                    <div className="flex gap-5 mb-5">
                                        <Link href={route('event.participant.manage', [event.id])}>
                                            <Button className="flex gap-2" size="md" color="blue">
                                                <UserGroupIcon className="w-5"/>
                                                Manage Peserta
                                            </Button>
                                        </Link>
                                        <DialogAddParticipant 
                                            reload={reload}
                                            setReload={setReload}
                                            event_id={event.id}
                                            route={route('event.participant.store', [event.id])}
                                        />
                                        <a href={route('event.exportEventParticipants', [event.id])} target="_ blank">
                                            <Button className="flex gap-2 h-fit w-fit items-center" color="green">
                                                <ClipboardDocumentListIcon className="w-5"/>
                                                Buat Undangan
                                            </Button>
                                        </a>
                                        <DialogDelete
                                            buttonText="Hapus Semua Peserta"
                                            mode="button"
                                            content={'Peserta Event'}
                                            route={route('event.participant.destroyAll', [event.id])}
                                            title={'Hapus Semua Peserta Event'}
                                            message={'Aksi ini tidak dapat dikembalikan'}
                                        />
                                        <ImportFromAttendence event_id={event.id}/>
                                        <MigrateToDiklatDialog 
                                            participants={event.participants} 
                                            event_id={event.id} 
                                            event_name={event.name}
                                            active={get(event, 'is_migrated', 0)}
                                        />
                                    </div>
                                    <Participants reload={reload} setReload={setReload} event={event} participants={event.participants}/>
                                </TabPanel>
                            </TabPanels>
                        </TabGroup>
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}