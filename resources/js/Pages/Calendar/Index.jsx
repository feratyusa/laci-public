import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CalendarChart from "./Partials/CalendarChart";
import BetweenDates from "@/Components/BetweenDates";
import { Card, CardBody } from "@material-tailwind/react";
import EventList from "./Partials/EventList";

export default function Index({
    auth,
    events=[],
    start='',
    end='',
}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"Kalender"}/>}
        >
            <div className=" mx-5 p-5 bg-white rounded-md shadow-lag mb-10">
                <BetweenDates 
                    title="Tanggal Mulai Event"
                    start={start}
                    end={end}
                    routeSubmit={route('calendar.index')}
                    routeReset={route('calendar.reset')}
                />
            </div>

            <Card className="mx-5 mb-5 py-5">
                <CardBody>
                    {
                        events.length != 0 ?
                            <CalendarChart events={events} start={start} end={end}/>
                        :
                        <div className="flex justify-center">
                            <div className='rounded-md shadow-lg px-5 py-2 bg-orange-500 w-fit text-white'>
                                <p className='uppercase tracking-widest font-bold'>Event Kosong</p>
                            </div>
                        </div>
                    }
                </CardBody>   
            </Card>

            <EventList start={start} end={end} events={events} className="mx-5 mb-5 pb-5"/>
        </Authenticated>
    )
}