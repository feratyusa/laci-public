import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import CategoriesTable from "./Partials/Table";
import { TagIcon } from "@heroicons/react/24/outline";

export default function Index({auth, categories}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'File Kategori'}/>}
        >
            <Head title="File Kategori"/>
                        
            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <TagIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Kategori File</p>
                    </div>
                    <CategoriesTable categories={categories}/>
                </CardBody>
            </Card>
        </Authenticated>
    )
}