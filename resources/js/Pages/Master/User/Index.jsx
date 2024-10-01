import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TagIcon, UserIcon } from "@heroicons/react/24/outline";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import UsersTable from "./Partials/UsersTable";

export default function Index({
    auth,
    users=[],
}){
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Master Users"} />}
        >
            <Head title="Master Users"/>
                        
            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <UserIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Users</p>
                    </div>
                    <UsersTable users={users}/>
                </CardBody>
            </Card>
        </Authenticated>
    )
}