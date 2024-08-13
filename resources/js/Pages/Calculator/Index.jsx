import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import CalculatorTable from "./Partials/CalculatorTable";
import InputDate from "@/Components/Form/InputDate";
import InputLabel from "@/Components/Form/InputLabel";

export default function Index({
    auth, 
    calc_start_date='',
    calc_end_date='',
    publics=[],
    totalPricePublic=0,
    totalPartcPublic=0,
    inHouses=[],
    totalPriceInHouse=0,
    totalPartcInHouse=0,
}){
    const {data, setData, get, processing} = useForm({
        calc_start_date: calc_start_date ?? '',
        calc_end_date: calc_end_date ?? '',
    })
    
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"Calculator Event"} />}
        >
            <div className="p-5 mx-5 mb-5 bg-white rounded-b-lg">
                <div className="text-center mb-5">
                    <p className="uppercase font-bold">Tanggal Mulai Event</p>
                </div>
                <div className="flex gap-5 items-center">
                    <div className="flex w-full items-center">
                        <div className="mr-5">
                            <InputLabel value={"Dari"} htmlFor="calc_start_date"/>
                        </div>
                        <InputDate 
                            id="calc_start_date"
                            name="calc_start_date"
                            value={data.calc_start_date}
                            onChange={(e) => setData('calc_start_date', e.target.value)}
                        />
                    </div>
                    <div className="flex w-full items-center">
                        <div className="mr-5">
                            <InputLabel value={"Sampai"} htmlFor="calc_end_date"/>
                        </div>
                        <InputDate 
                            id="calc_end_date"
                            name="calc_end_date"
                            value={data.calc_end_date}
                            onChange={(e) => setData('calc_end_date', e.target.value)}
                        />
                    </div>
                    <div className="flex w-fit h-fit gap-2">
                        <Button color="blue" onClick={() => get(route('calculator.index'))}>
                            Cari
                        </Button>
                        <Button color="amber" onClick={() => get(route('calculator.reset'))}>
                            Reset
                        </Button>
                    </div>
                </div>
            </div>            
            <div className="p-5">
                {
                    publics?.length != 0 && inHouses?.length != 0 ? 
                    <CalculatorTable 
                        publics={publics}
                        inHouses={inHouses}
                        totalPricePublic={totalPricePublic}
                        totalPriceInHouse={totalPriceInHouse}
                        totalPartcPublic={totalPartcPublic}
                        totalPartcInHouse={totalPartcInHouse}
                    />
                    :
                    publics?.length == 0 && inHouses?.length == 0 ?
                    <div className="flex justify-center">
                        <div className="w-fit bg-amber-900 py-3 px-5 rounded-lg shadow-lg shadow-amber-900/50">
                            <p className="uppercase font-bold text-white tracking-widest">Event Kosong!</p>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center">
                        <div className="w-fit bg-amber-900 py-3 px-5 rounded-lg shadow-lg shadow-amber-900/50">
                            <p className="uppercase font-bold text-white">Pilih rentang tanggal mulai event terlebih dahulu!</p>
                        </div>
                    </div>
                }
            </div>
            
        </Authenticated>
    )
}