import Authenticated from "@/Layouts/AuthenticatedLayout";
import HeaderTitle from "@/Components/HeaderTitle";
import { Alert, Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import EventForm from "./Partials/Form";

export default function Create({auth, proposals=null, proposal_id=null, kursus, status, event_categories, number_types}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'buat event baru'}/>}
        >
            <Head title="Buat Event"/>
            {status ? <Alert className="m-5" color="green">{status}</Alert> : ''}
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
                        <div className="flex flex-col items-center justify-center my-4">
                            <Typography
                            variant="h4"
                            color="red"
                            className="uppercase"
                            >
                                Form Event Baru
                            </Typography>
                            {
                                proposal_id ? 
                                <Typography
                                    variant="h6"
                                    color="red"
                                >
                                    Event untuk Usulan {proposals.find(p => p.value === proposal_id).label}
                                </Typography> : ''
                            }
                        </div>

                        <EventForm 
                            method={'create'} 
                            proposals={proposals} 
                            event_categories={event_categories} 
                            number_types={number_types}
                            proposal_id={proposal_id}
                            kursus={kursus}
                        />
                    </CardBody>
                </Card>
            </div>

        </Authenticated>
    )
}