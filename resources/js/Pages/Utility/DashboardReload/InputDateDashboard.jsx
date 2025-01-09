import { changeToInputDate, changeToInputDateFromDate } from "@/helpers/IndoesiaDate";
import { useForm } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";

export default function InputDateDashboard({
    setStartDate,
    setEndDate,
}){
    const {data, setData, reset} = useForm({
        'start_date': changeToInputDate(Date.parse(`${new Date().getFullYear()}-01-01`)),
        'end_date': changeToInputDateFromDate(new Date()),
    });

    function handleSearch(){
        setStartDate(data.start_date)
        setEndDate(data.end_date)
    }

    return(
        <div className="flex items-center gap-5">
            <input
                className="w-full rounded-lg"
                type="date"
                value={data.start_date}
                onChange={(e) => setData('start_date', e.target.value)}
            />
            <input
                className="w-full rounded-lg"
                type="date"
                value={data.end_date}
                onChange={(e) => setData('end_date', e.target.value)}
            />
            <div>
                <Button color="blue"  onClick={() => handleSearch()}>
                    Cari
                </Button>
            </div>
        </div>
    )
}
