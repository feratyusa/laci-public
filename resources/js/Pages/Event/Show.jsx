import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Card, CardBody, CardHeader, IconButton, Typography, Alert } from "@material-tailwind/react";
import { DocumentIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import EventDetails from "./Partials/Details";
import Files from "./Partials/Files";

export default function Show({auth, code, status, event, categories, proposalRoute}){
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

                <Card className="mt-10">
                    <CardHeader 
                        className={"flex items-center justify-between px-20 py-3"}>
                            <IconButton
                                variant="text"
                                ripple={false}
                            >
                                <DocumentIcon className="h-10 w-10"/>
                            </IconButton>
                            <Typography
                                variant="h4"
                            >
                                {event.name}
                            </Typography>
                            <div></div>                          
                    </CardHeader>
                    <CardBody>
                        <EventDetails event={event} categories={categories} proposalRoute={proposalRoute}/>
                        <Files files={event?.files}/>
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}