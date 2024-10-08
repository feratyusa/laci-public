import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import CalculatorTable from "./Partials/CalculatorTable";
import { BanknotesIcon, CalculatorIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import BetweenDates from "@/Components/BetweenDates";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { useState } from "react";
import BudgetReport from "./Partials/BudgetReport";
import ReportTable from "./Partials/ReportTable";

export default function Index({
    auth,     
    inHouses=[],
    publics=[],    
    budget=null,
    budgets=[],
    budgetTypePrices=[],
}){
    const [startDate, setStartDate] = useState('2024-10-01')
    const [endDate, setEndDate] = useState('2024-10-31')
    const [events, setEvents] = useState(null)    
    const [budgetID, setBudgetID] = useState(null)
    const [mode, setMode] = useState(1)

    const dateString = startDate && endDate ? ` (${changeToIndonesiaDateTime(new Date(startDate), true)} - ${changeToIndonesiaDateTime(new Date(endDate), true)})` : null    
    
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Kalkulator"} />}
        >
            <Head title="Kalkulator"/>

            <Card className="m-5 p-10 max-h-screen overflow-auto">
                <div className="flex items-center gap-5 mb-10 text-red-500">
                    <CalculatorIcon className="w-8"/>
                    <div>
                        <p className="font-bold text-2xl">{`Rekap Biaya Event${dateString ?? ''}`}</p>
                        <p className="italic text-sm text-gray-500">{`${dateString ? `Edit kotak input untuk mengubah nominal` : `Pilih Tanggal Mulai event`}`}</p>
                    </div>
                </div>
                <div className="mb-10">
                    <BetweenDates 
                        title={null}
                        start={startDate}
                        end={endDate}
                        setStart={setStartDate}
                        setEnd={setEndDate}
                        setEvents={setEvents}
                        apiURL={"/api/calculator/changeEvents"}
                    />
                </div>
                {
                    startDate == '' || startDate == null || endDate == '' || endDate == null ?
                    <div className="flex justify-center">
                        <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                            <p className="uppercase font-bold text-white">Pilih rentang tanggal mulai event terlebih dahulu!</p>
                        </div>
                    </div>
                    :
                    <ReportTable data={events} mode={mode}/>
                }
            </Card>

            <Card className="m-5 p-10">
                <div className="flex items-center gap-5 mb-10 text-red-500">
                    <BanknotesIcon className="w-8"/>
                    <div>
                        <p className="font-bold text-2xl">{`Rekap Anggaran${budget ? ` (${budget.year})` : ''}`}</p>
                        <p className="italic text-sm text-gray-500">Pilih tahun anggaran</p>
                    </div>
                </div>
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
                    />
                }
            </Card>
            
        </Authenticated>
    )
}