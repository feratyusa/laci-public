import Authenticated from "@/Layouts/AuthenticatedLayout";
import HeaderTitle from "@/Components/HeaderTitle";
import { Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import EventForm from "./Partials/Form";

export default function Edit({auth, event, proposal_id, proposals, number_types, event_categories}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'edit event'}/>}
        >
            <Head title="Edit Event"/>

            <div className="m-10">
                <Card className="px-5 pb-10">
                    <CardHeader className="bg-red-500 flex justify-center p-2">
                        <IconButton
                            variant="text"
                            color="white"                            
                        >
                            <DocumentPlusIcon className="h-8 w-8"/>
                        </IconButton>
                    </CardHeader>
                    <CardBody>
                        <div className="flex justify-center my-4">
                            <Typography
                            variant="h4"
                            color="amber"
                            className="uppercase"
                            >
                                Form Edit Event
                            </Typography>
                        </div>
                        <EventForm method={'edit'} event={event} proposal_id={proposal_id} proposals={proposals} event_categories={event_categories} number_types={number_types}/>
                    </CardBody>
                </Card>
            </div>

        </Authenticated>
    )
}