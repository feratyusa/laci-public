import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import HeaderTitle from "@/Components/HeaderTitle";

export default function Index({
    auth
}) {
    return (
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Dashboard Reload'}/>}
        >
            <Head title="Dashboard Reload"/>

            <div className="container min-w-full p-5">
                <p>Hai, Dashboard Reload</p>
            </div>
        </Authenticated>
    )
}
