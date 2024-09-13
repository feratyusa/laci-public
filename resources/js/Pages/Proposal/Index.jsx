import Authenticated from "@/Layouts/AuthenticatedLayout";
import { 
    PlusIcon,
 }
from "@heroicons/react/24/solid"
import {
  Card,  
  Button,
  CardBody,
  CardFooter,
  Alert
} from "@material-tailwind/react";
import { Head, Link, useForm } from "@inertiajs/react";
import Pagination from "@/Components/Pagination";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import TableProposal from "./Partials/Table";
import Filters from "./Partials/Filters";
import eventCategories from "@/Base/EventCategory";

export default function Index({ auth, status, code, proposals, kursus, paginator, inputs='' }) {
    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'usulan'}/>}
        >
            <Head title="Usulan"/>
            <p>{inputs}</p>
            <div className="container min-h-screen min-w-full p-5">
                <BreadcrumbMod menu="proposals" />
                <Card className="h-max mt-5">
                    <CardBody className="overflow-scroll px-0">
                        <div className="w-max px-5 mb-5">
                            <Link href={route('proposal.create')}>
                                <Button className="flex items-center gap-3" color="green" variant="filled">
                                    <PlusIcon className="h-4 w-4"/>
                                    Usulan
                                </Button>                            
                            </Link>
                        </div>
                        {status && 
                            <Alert color={code===0 ? "red" : code===1 ? 'green' : 'amber'}>
                                {status}
                            </Alert>}
                        <TableProposal proposals={proposals}/>
                    </CardBody>                    
                </Card>
            </div>            
        </Authenticated>
    )
}