import InDevelopment from "@/Components/InDevelopment";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function Index({
    auth
}){
    return(
        <Authenticated
            user={auth.user}
        >
            <InDevelopment />
        </Authenticated>
    )
}