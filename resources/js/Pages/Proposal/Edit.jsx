import Authenticated from "@/Layouts/AuthenticatedLayout";
import HeaderTitle from "@/Components/HeaderTitle";
import { Card, CardBody, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { Head } from "@inertiajs/react";
import ProposalForm from "./Partials/Form";

export default function Edit({auth, proposal, kursus}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'edit usulan'}/>}
        >
            <Head title="Edit Usulan"/>

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
                                Form Edit Usulan
                            </Typography>
                        </div>
                        <ProposalForm auth={auth} method={'edit'} proposal={proposal} kursus={kursus}/>
                    </CardBody>
                </Card>
            </div>

        </Authenticated>
    )
}