import Authenticated from "@/Layouts/AuthenticatedLayout";
import { 
    PlusIcon,
 }
from "@heroicons/react/24/solid"
import {
  Card,  
  Button,
  CardBody,
} from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import TableProposal from "./Partials/Table";

export default function Index({ auth }) {
    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'usulan'}/>}
        >
            <Head title="Usulan"/>
            
            <div className="container min-h-screen min-w-full p-5">
                <BreadcrumbMod menu="proposals" />
                
                <Link href={route('proposal.create')}>
                    <Button className="flex items-center gap-3" color="green" variant="filled">
                        <PlusIcon className="h-4 w-4"/>
                        Usulan
                    </Button>                            
                </Link>
                
                <Card className="h-max mt-5">
                    <CardBody className="px-0">
                        <TableProposal />
                    </CardBody>                    
                </Card>
            </div>            
        </Authenticated>
    )
}