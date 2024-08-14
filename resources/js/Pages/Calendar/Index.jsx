import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CalendarChart from "./Partials/CalendarChart";

export default function Index({
    auth,
    events,
}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"Kalender"}/>}
        >
            <div className="p-5 bg-white overflow-auto">
                <CalendarChart events={events} />
            </div>
        </Authenticated>
    )
}