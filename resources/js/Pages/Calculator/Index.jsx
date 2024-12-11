import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Card } from "@material-tailwind/react";
import { BanknotesIcon, CalculatorIcon } from "@heroicons/react/24/outline";
import BetweenDates from "@/Components/BetweenDates";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { useState } from "react";
import BudgetReport from "./Partials/BudgetReport";
import ReportTable from "./Partials/ReportTable";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function Index({
    auth,
    budget=null,
    year=new Date().getFullYear(),
}){
    const [startDate, setStartDate] = useState(`${year}-01-01`)
    const [endDate, setEndDate] = useState(`${year}-12-31`)
    const [events, setEvents] = useState(null)
    const [budgetID, setBudgetID] = useState(budget)
    const [mode, setMode] = useState(1)
    const [loaded, setLoaded] = useState(true)

    const dateString = startDate && endDate ? ` (${changeToIndonesiaDateTime(new Date(startDate), true)} - ${changeToIndonesiaDateTime(new Date(endDate), true)})` : null
    const tabClass = "py-2 px-5 bg-red-100 uppercase font-bold text-red-500 data-[hover]:bg-red-300 data-[hover]:text-white data-[selected]:bg-red-500 data-[selected]:text-white border-0 ring-0"

    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Kalkulator"} />}
        >
            <Head title="Kalkulator"/>

            <Card className="m-5 p-10">
                <div className="flex items-center gap-5 mb-10 text-red-500">
                    <CalculatorIcon className="w-8"/>
                    <div>
                        <p className="font-bold text-2xl">{`Kalkulator ${dateString ?? ''}`}</p>
                        <p className="italic text-sm text-gray-500">{`${dateString ? `Edit kotak input untuk mengubah nominal` : `Pilih Tanggal Mulai event`}`}</p>
                    </div>
                </div>
                <div className="mb-10">
                    <BetweenDates
                        title={null}
                        start={startDate}
                        end={endDate}
                        mode={mode}
                        setStart={setStartDate}
                        setEnd={setEndDate}
                        setEvents={setEvents}
                        apiURL={"/api/calculator/changeEvents"}
                        params={{start: startDate, end: endDate, mode: mode}}
                        setLoaded={setLoaded}
                        loaded={loaded}
                    />
                </div>
                <TabGroup>
                    <TabList className={'grid grid-cols-2 mb-10'}>
                        <Tab className={tabClass}>
                            <div className="flex gap-5 items-center p-2">
                                <BanknotesIcon className="w-5"/>
                                <p>Rekap Biaya Event</p>
                            </div>
                        </Tab>
                        <Tab className={tabClass}>
                            <div className="flex gap-5 items-center">
                                <BanknotesIcon className="w-5"/>
                                <p>Rekap Anggaran</p>
                            </div>
                        </Tab>
                    </TabList>
                    <TabPanels className={'m-5'}>
                        <TabPanel>
                            {
                                loaded == false ?
                                <div className="flex justify-center">
                                    <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                                        <p className="uppercase font-bold text-white animate-pulse">Loading...</p>
                                    </div>
                                </div>
                                :
                                startDate == '' || startDate == null || endDate == '' || endDate == null ?
                                <div className="flex justify-center">
                                    <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                                        <p className="uppercase font-bold text-white">Pilih rentang tanggal mulai event terlebih dahulu!</p>
                                    </div>
                                </div>
                                :
                                <ReportTable data={events}/>
                            }
                        </TabPanel>
                        <TabPanel>
                            {
                                events == null ?
                                <div className="flex justify-center">
                                    <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                                        <p className="uppercase font-bold text-white">Pilih rentang tanggal mulai event terlebih dahulu!</p>
                                    </div>
                                </div>
                                :
                                events.publics.length == 0 && events.inHouses.length == 0 ?
                                <div className="flex justify-center">
                                    <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                                        <p className="uppercase font-bold text-white">Event Kosong</p>
                                    </div>
                                </div>
                                :
                                <BudgetReport
                                    start={startDate}
                                    end={endDate}
                                    budgetID={budgetID}
                                    setBudgetID={setBudgetID}
                                    mode={mode}
                                    setMode={setMode}
                                    loaded={loaded}
                                    setLoaded={setLoaded}
                                />
                            }
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </Card>



        </Authenticated>
    )
}
