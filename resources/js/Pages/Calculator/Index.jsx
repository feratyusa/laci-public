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

export default function Index({
    auth, 
    calc_start_date='',
    calc_end_date='',
    publics=null,
    totalPricePublic=0,
    totalPartcPublic=0,
    inHouses=null,
    totalPriceInHouse=0,
    totalPartcInHouse=0,
    budget=null,
    budgets=[]
}){
    const {data, setData, put, processing} = useForm({        
        public: publics ? [...publics] : null,
        inHouse: inHouses ? [...inHouses] : null,
    })

    const [sumPrices, setSumPrice] = useState({
        public: totalPricePublic,
        inHouse: totalPriceInHouse
    })
    const [sumParticipants, setSumParticipants] = useState({
        public: totalPartcPublic,
        inHouse: totalPartcInHouse
    })

    const dateString = calc_start_date && calc_end_date ? ` (${changeToIndonesiaDateTime(calc_start_date, true)} - ${changeToIndonesiaDateTime(calc_end_date, true)})` : null    
    
    return(
        <Authenticated
            user={auth.user}
            header={
            <HeaderTitle title={"Calculator Event"} />}
        >
            <Head title="Calculator"/>

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
                        start={calc_start_date}
                        end={calc_end_date}
                        routeSubmit={route('calculator.index')}
                        routeReset={route('calculator.reset')}
                    />
                </div>
                {
                    publics == null && inHouses == null ?
                    <div className="flex justify-center">
                        <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                            <p className="uppercase font-bold text-white">Pilih rentang tanggal mulai event terlebih dahulu!</p>
                        </div>
                    </div>
                    :
                    publics?.length != 0 || inHouses?.length != 0 ? 
                    <CalculatorTable 
                        publics={publics}
                        inHouses={inHouses}
                        totalPricePublic={totalPricePublic}
                        totalPriceInHouse={totalPriceInHouse}
                        totalPartcPublic={totalPartcPublic}
                        totalPartcInHouse={totalPartcInHouse}
                        data={data}
                        setData={setData}
                        put={put}
                        processing={processing}
                        sumPrices={sumPrices}
                        setSumPrice={setSumPrice}
                        sumParticipants={sumParticipants}
                        setSumParticipants={setSumParticipants}
                    />
                    :
                    publics?.length == 0 && inHouses?.length == 0 ?
                    <div className="flex justify-center">
                        <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                            <p className="uppercase font-bold text-white">Event Kosong</p>
                        </div>
                    </div>
                    :
                    ''
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
                    publics == null && inHouses == null ?
                    <div className="flex justify-center">
                        <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                            <p className="uppercase font-bold text-white">Pilih rentang tanggal mulai event terlebih dahulu!</p>
                        </div>
                    </div>
                    : 
                    publics.length == 0  && inHouses.length == 0 ?
                    <div className="flex justify-center">
                        <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                            <p className="uppercase font-bold text-white">Event Kosong</p>
                        </div>
                    </div>
                    :
                    <BudgetReport 
                        sumPrices={sumPrices}
                        sumParticipants={sumParticipants}
                        budget={budget}
                        budgets={budgets}
                    />
                }
            </Card>
            
        </Authenticated>
    )
}