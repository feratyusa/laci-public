import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card } from "@material-tailwind/react";
import CategoriesTable from "./Partials/Table";
import { DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function Index({auth, categories, flash}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'File Kategori'}/>}
        >
            <Head title="File Kategori"/>

            <BreadcrumbMod />
            <Card className="m-5 py-5">
                <div className="flex items-center gap-4 px-5 text-red-500">
                    <DocumentMagnifyingGlassIcon className="w-8"/>
                    <p className="uppercase text-lg font-bold">List File Kategori</p>
                </div>
                <CategoriesTable categories={categories}/>
            </Card>
        </Authenticated>
    )
}