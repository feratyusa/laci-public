import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CalendarChart from "./Partials/CalendarChart";
import BetweenDates from "@/Components/BetweenDates";
import EventList from "./Partials/EventList";
import { CalendarDateRangeIcon, NumberedListIcon } from "@heroicons/react/24/outline";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function Index({
    auth,
    events=null,
    start='',
    end='',
}){
    const dateString = start && end ? ` (${changeToIndonesiaDateTime(start, true)} - ${changeToIndonesiaDateTime(end, true)})` : null

    const [filter, setFilter] = useState('')
    const [eventsFiltered, setEventsFiltered] = useState([...events])
    function handleEventChange(value){
        setFilter(value)
        var temp = events.filter(e => String(e.name).toLowerCase().includes(String(value).toLowerCase()) ||
                                        String(e.id).toLowerCase().includes(String(value).toLowerCase()) ||
                                        String(e.prices.training_price).toLowerCase().includes(String(value).toLowerCase()) ||
                                        String(e.prices.accomodation_price).toLowerCase().includes(String(value).toLowerCase()) ||
                                        changeToIndonesiaDateTime(e.start_date, true).toLowerCase().includes(String(value).toLowerCase()) ||
                                        changeToIndonesiaDateTime(e.end_date, true).toLowerCase().includes(String(value).toLowerCase())
                                )
        setEventsFiltered([...temp])
    }

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"Kalender"}/>}
        >
            <Head title="Kalendar"/>

            <div className="bg-white rounded-lg shadow-lg m-5 p-10">
                <div className="flex items-center gap-5 mb-5 text-red-500">
                    <CalendarDateRangeIcon className="w-8"/>
                    <div>
                        <p className="font-bold text-2xl">{`Kalender Event${dateString ?? ''}`}</p>
                        <p className="italic text-sm text-gray-500">{`${dateString ? `Edit kotak input untuk mengubah nominal` : `Pilih Tanggal Mulai event`}`}</p>
                    </div>
                </div>
                <div className="p-5 bg-white rounded-md shadow-lag mb-10">
                    <BetweenDates 
                        title={null}
                        start={start}
                        end={end}
                        routeSubmit={route('calendar.index')}
                        routeReset={route('calendar.reset')}
                    />
                </div>            
                {
                    events == null ?
                    <div className="flex justify-center">
                        <div className='rounded-md shadow-lg px-5 py-2 bg-orange-500 w-fit text-white'>
                            <p className='uppercase tracking-widest font-bold'>Pilih tanggal mulai event terlebih dahulu</p>
                        </div>
                    </div>
                    :
                    events.length == 0 ?
                    <div className="flex justify-center">
                        <div className='rounded-md shadow-lg px-5 py-2 bg-orange-500 w-fit text-white'>
                            <p className='uppercase tracking-widest font-bold'>Event Kosong</p>
                        </div>
                    </div>
                    :
                    <CalendarChart events={eventsFiltered} start={start} end={end}/>
                }
            </div>

            <div className="bg-white rounded-lg shadow-lg m-5 p-10">
                <div className="flex items-center gap-5 mb-10 text-red-500">
                    <NumberedListIcon className="w-8"/>
                    <div>
                        <p className="font-bold text-2xl">{`Daftar Event${dateString ?? ''}`}</p>                        
                    </div>
                </div>
                {
                    events == null ?
                    <div className="flex justify-center">
                        <div className='rounded-md shadow-lg px-5 py-2 bg-orange-500 w-fit text-white'>
                            <p className='uppercase tracking-widest font-bold'>Pilih tanggal mulai event terlebih dahulu</p>
                        </div>
                    </div>
                    :
                    <>
                        <input 
                            placeholder="Search..."
                            value={filter}
                            onChange={(e) => handleEventChange(e.target.value)}
                            className="rounded-md mb-5"
                        />
                        <EventList start={start} end={end} events={eventsFiltered} className="mx-5 mb-5 pb-5"/>
                    </>
                }
            </div>
        </Authenticated>
    )
}