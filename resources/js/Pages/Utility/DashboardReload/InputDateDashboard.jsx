import { useForm } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";

export default function InputDateDashboard({
    setReportData,
    setLoaded,
    loaded
}){
    const {data, setData, reset} = useForm({
        'start_date': '2024-01-01',
        'end_date': '2024-12-31',
    });

    function handleSearch(){
        setLoaded(false)
        axios.get(route('reportReload.get'), {params: data})
            .then((response) => {
                console.log(response)
                setReportData(response.data.reports)
            })
            .catch((error) => {
                console.debug(error)
            })
            .finally(() => {
                setLoaded(true)
            })

        reset();
    }

    useEffect(() => {
        handleSearch()
    }, [])

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
                <Button color="blue"  onClick={() => handleSearch()} loading={loaded == false}>
                    Cari
                </Button>
            </div>
        </div>
    )
}
