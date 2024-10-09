import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import ChangeLogList from "./Partials/ChangeLogList";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

export default function Index({
    auth,            
}){ 
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"change log"}/>}
        >
            <Head title="Change Log" />
            
            <Card className="m-5 p-10">                
                <div className="flex items-center gap-5 mb-5 text-red-500 m-5">
                    <Cog8ToothIcon className="w-8"/>
                    <p className="font-bold text-2xl ">Change Log</p>
                </div>
                <ChangeLogList />                        
            </Card>            
        </Authenticated>
    )
}