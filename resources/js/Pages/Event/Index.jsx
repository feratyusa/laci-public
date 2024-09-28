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

                <Card>
                    <CardBody className="overflow-scroll px-0">
                        <div className="flex justify-between mx-5 mb-5">
                            <div className="w-max">
                                <Link href={route('event.create')}>
                                    <Button className="flex items-center gap-3" color="green" variant="filled">
                                        <PlusIcon className="h-4 w-4"/>
                                        Event
                                    </Button>                            
                                </Link>
                            </div>
                        </div>
                        <TableEvent />
                    </CardBody>                    
                </Card>

            </div>
        </Authenticated>
    )
}