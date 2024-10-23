import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
  Card,    
  CardBody,
} from "@material-tailwind/react";
import { Head } from "@inertiajs/react";
import HeaderTitle from "@/Components/HeaderTitle";
import FormNugieDialog from "./Partials/FormNugieDialog";
import NugieTable from "./Partials/Table";

function NugieDescription(){
    return(
        <div className="mb-5">
            <p className="text-xl font-bold">
                Dy<span className="text-red-500">n</span>amic <span className="text-red-500">U</span>tility for <span className="text-red-500">G</span>eneral 
                <span className="text-red-500"> I</span>nformation on <span className="text-red-500">E</span>ducation
                <span className="text-red-500 font-extrablod tracking-widest"> (NUGIE)</span>
            </p>            
            <p className="text-sm italic">Report Maker using Query Builder</p>            
        </div>
    )
}

export default function Index({ 
    auth,
    nugies,
}) {
    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Nugie'}/>}
        >
            <Head title="Nugie"/>

            <div className="container min-h-screen min-w-full p-5">
                <FormNugieDialog route={route('nugie.store')} user={auth.user}/>
                <Card className="h-max mt-5">
                    <CardBody className="p-5">           
                        <NugieDescription />
                        <NugieTable nugies={nugies}/>
                    </CardBody>                
                </Card>
            </div>            
        </Authenticated>
    )
}