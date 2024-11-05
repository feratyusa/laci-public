import { useForm } from "@inertiajs/react"
import { Button } from "@material-tailwind/react"
import InputDate from "./Form/InputDate"
import InputLabel from "./Form/InputLabel"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useEffect } from "react"
import axios from "axios"

export default function BetweenDates({
    title=null,
    start, 
    end,
    mode,
    setStart,
    setEnd,
    setEvents,
    apiURL,
    params,
    setLoaded,
    loaded,
})
{
    function handleReset(){
        setStart('')
        setEnd('')
    }    

    function handleEventsChange(){
        setLoaded(false)
    }

    useEffect(() => {
        axios.get(apiURL, {params: params})
            .then((response) => {
                setEvents(response.data.events)
                setLoaded(true)
        })
    }, [loaded])

    return(
        <>
            {title && <div className="flex justify-center ">
                <div className="flex items-center text-white gap-2 bg-red-500 mb-5 py-1 px-2 rounded-md">
                    <MagnifyingGlassIcon className="w-5"/>
                    <p className="uppercase font-bold">{title}</p>
                </div>
            </div>}
            <div className="flex gap-5 items-center">
                <div className="flex w-full items-center">
                    <div className="mr-5">
                        <InputLabel value={"Dari"} htmlFor="start"/>
                    </div>
                    <InputDate 
                        id="start"
                        name="start"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                    />
                </div>
                <div className="flex w-full items-center">
                    <div className="mr-5">
                        <InputLabel value={"Sampai"} htmlFor="end"/>
                    </div>
                    <InputDate
                        id="end"
                        name="end"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                    />
                </div>
                <div className="flex w-fit h-fit gap-2">
                    <Button color="blue" onClick={() => handleEventsChange()} loading={loaded == false}>
                        Cari
                    </Button>
                    <Button color="amber" onClick={() => handleReset()}>
                        Reset
                    </Button>
                </div>
            </div>
        </>
    )
}