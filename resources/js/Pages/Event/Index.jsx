import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardBody, Button } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/solid";
import TableEvent from "./Partials/Table";

export default function Index({
    auth,        
}){ 
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"event"}/>}
        >
            <Head title="Event" />

            <div className="container min-h-screen min-w-full p-5">
                <BreadcrumbMod menu={"events"}/>
                
                <div className="mb-5">
                    <Link href={route('event.create')}>
                        <Button className="flex items-center gap-3" color="green" variant="filled">
                            <PlusIcon className="h-4 w-4"/>
                            Event
                        </Button>                            
                    </Link>
                </div>

                <Card>
                    <CardBody className="px-0">                        
                        <TableEvent />
                    </CardBody>                    
                </Card>
            </div>
        </Authenticated>
    )
}