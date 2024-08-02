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

export default function Index({ auth, status, code, proposals, paginator, inputs='', filters=null }) {
    const categories = [
        {value: 'In House Training', label: 'In House Training'},
        {value: 'Public Training', label: 'Public Training'},
    ]

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
                    <div className="flex justify-between mx-5 mt-5 mb-5">
                        <div className="w-max">
                            <Link href={route('proposal.create')}>
                                <Button className="flex items-center gap-3" color="green" variant="filled">
                                    <PlusIcon className="h-4 w-4"/>
                                    Usulan
                                </Button>                            
                            </Link>
                        </div>
                    </div>
                    <Filters categories={categories}/>
                    <CardBody className="overflow-scroll px-0">
                        {status && 
                            <Alert color={code===0 ? "red" : code===1 ? 'green' : 'amber'}>
                                {status}
                            </Alert>}

                        <TableProposal proposals={proposals}/>
                        
                    </CardBody>
                    <CardFooter className="flex justify-center">
                        {
                            paginator ? 
                            <Pagination paginator={paginator}/>
                            : ''
                        }
                    </CardFooter>
                </Card>
            </div>            
        </Authenticated>
    )
}