import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";

export default function Index({
    auth,
    users=[],
}){
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Kalkulator"} />}
        >
            <Head title="Kategori File"/>
                        
            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <TagIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Kategori File</p>
                    </div>
                    
                </CardBody>
            </Card>
        </Authenticated>
    )
}