import { useForm } from "@inertiajs/react"
import { Button } from "@material-tailwind/react"
import InputDate from "./Form/InputDate"
import InputLabel from "./Form/InputLabel"

export default function BetweenDates({
    title,
    start, 
    end,
    routeSubmit,
    routeReset,
})
{
    const {data, setData, get, reset, processing} = useForm({
        start: start,
        end: end
    })

    function handleSubmit(){
        get(routeSubmit)
    }

    function handleReset(){
        reset()
        get(routeReset)
    }

    return(
        <>
            <div className="text-center mb-5">
                <p className="uppercase font-bold">{title}</p>
            </div>
            <div className="flex gap-5 items-center">
                <div className="flex w-full items-center">
                    <div className="mr-5">
                        <InputLabel value={"Dari"} htmlFor="start"/>
                    </div>
                    <InputDate 
                        id="start"
                        name="start"
                        value={data.start}
                        onChange={(e) => setData('start', e.target.value)}
                    />
                </div>
                <div className="flex w-full items-center">
                    <div className="mr-5">
                        <InputLabel value={"Sampai"} htmlFor="end"/>
                    </div>
                    <InputDate
                        id="end"
                        name="end"
                        value={data.end}
                        onChange={(e) => setData('end', e.target.value)}
                    />
                </div>
                <div className="flex w-fit h-fit gap-2">
                    <Button loading={processing} color="blue" onClick={() => handleSubmit()}>
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