import Authenticated from "@/Layouts/AuthenticatedLayout";
import {
  Card,    
  CardBody,
  IconButton,
} from "@material-tailwind/react";
import { Head } from "@inertiajs/react";
import HeaderTitle from "@/Components/HeaderTitle";
import NugieDetails from "./Partials/NugieDetails";
import { useState } from "react";
import EmployeeDetails from "./Partials/EmployeeDetails";
import { BookmarkSquareIcon } from "@heroicons/react/24/solid";
import FormNugieDialog from "./Partials/FormNugieDialog";

export default function Index({ 
    auth,
    nugie,
    details,    
}) {
    const [employees, setEmployees] = useState({
        empIn: [],
        empOut: [],
    })

    console.log(employees)

    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Nugie'}/>}
        >
            <Head title={nugie.name ?? 'Nugie'}/>

            <div className="container min-h-screen min-w-full p-5">
                <Card className="h-max mt-5">
                    <div className="flex justify-between p-5">
                        <div>
                            <div className="flex gap-5 text-red-500">
                                <BookmarkSquareIcon className="w-8"/>
                                <p className="font-bold text-2xl">{nugie.name}</p>
                            </div>
                            <div className="ml-2 mt-5 pl-5 border-l-4 border-gray-500">                            
                                <p>{nugie.description ?? 'Deskripsi'}</p>
                            </div>
                        </div>
                        <div>
                            <FormNugieDialog mode="edit" nugie={nugie} route={route('nugie.update', [nugie.id])} user={auth.user}/>
                        </div>
                    </div>
                    <CardBody className="p-5">
                        <NugieDetails nugie={nugie} details={details} setEmployees={setEmployees}/>            
                    </CardBody>                    
                </Card>
                
                <Card className="mt-5 p-5">
                    <div>
                        <EmployeeDetails empIn={employees.empIn} empOut={employees.empOut}/>
                    </div>
                </Card>
            </div>            
        </Authenticated>
    )
}