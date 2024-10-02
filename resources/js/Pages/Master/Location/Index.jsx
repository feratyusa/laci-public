import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { UserIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import LocationsTable from "./Partials/LocationsTable";

export default function Index({
    auth,
    locations=[],
}){
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Master Lokasi"} />}
        >
            <Head title="Master Lokasi"/>
                        
            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <UserIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Lokasi</p>
                    </div>
                    <LocationsTable locations={locations}/>
                </CardBody>
            </Card>
        </Authenticated>
    )
}