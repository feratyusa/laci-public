import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { Card, CardBody, CardFooter, Button, Input, IconButton } from "@material-tailwind/react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import TableEvent from "./Partials/Table";
import Pagination from "@/Components/Pagination";
import Filters from "./Partials/Filters";
import eventCategories from "@/Base/EventCategory";

export default function Index({
    auth,
    kursus=[],
    events, 
    paginator
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
                        {/* <Filters kursus={kursus} categories={eventCategories}/> */}
                        <TableEvent events={events}/>
                    </CardBody>
                    <CardFooter className="flex justify-center">
                        {
                            paginator ?
                            <Pagination paginator={paginator}/> :
                            ''
                        }
                    </CardFooter>
                </Card>

            </div>
        </Authenticated>
    )
}