import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import { get } from "lodash";
import { useEffect, useRef, useState } from "react";
import ParticipantForm from "./Partials/ManageParticipants/ManageForm";
import ManageResult from "./Partials/ManageParticipants/ManageResult";

export default function ManageParticipants({
    auth,
    event,
    kursus,
}){
    const [participants, setParticipants] = useState([])
    const [deletedParticipants, setDeletedParticipants] = useState([])
    const resultRef = useRef()

    useEffect(() => {
        resultRef.current.scrollIntoView({behavior: 'smooth'})
    }, [participants])

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Peserta Event'}/>}
        >
            <Head title={get(event, 'name', 'Event')}/>

            <div className="m-5">
                <BreadcrumbMod menu={'events'} title={[get(event, 'name', 'Event'), 'Manage Peserta', null]} />

                <Card className="mb-10">
                    <CardBody>
                        <div className="flex items-center gap-5 text-red-500 mb-5">
                            <UserGroupIcon className="w-10"/>
                            <p className="text-2xl font-bold">Manage Peserta</p>
                        </div>
                        <ParticipantForm
                            setParticipants={setParticipants}
                            setDeletedParticipants={setDeletedParticipants}
                            kursus={kursus}
                            event_start={event.start_date}
                            event_end={event.end_date}
                            event_id={event.id}
                        />
                    </CardBody>
                </Card>

                <Card>
                    <CardBody ref={resultRef}>
                        <ManageResult
                            event_id={event.id}
                            participants={participants}
                            setParticipants={setParticipants}
                            deletedParticipants={deletedParticipants}
                            setDeletedParticipants={setDeletedParticipants}
                            kursus={kursus}
                        />
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}
