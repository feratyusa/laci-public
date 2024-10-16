import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
  Card,    
  CardBody,
} from "@material-tailwind/react";
import { Head } from "@inertiajs/react";
import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";

export default function Index({ auth }) {
    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Nugie'}/>}
        >
            <Head title="Nugie"/>

            <div className="container min-h-screen min-w-full p-5">
                <Card className="h-max mt-5">
                    <CardBody className="px-0">
                        
                    </CardBody>                    
                </Card>
            </div>            
        </Authenticated>
    )
}