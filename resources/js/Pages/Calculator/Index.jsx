import HeaderTitle from "@/Components/HeaderTitle";
import InputError from "@/Components/InputError";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function Index({auth, events, prices, totalPrice=0, totalParticipant=0}){
    const [dirty, setDirty] = useState(false)
    const {data, setData, post, put, processing, errors} = useForm({
        events: [...prices],
    })

    const [sumPrices, setSumPrice] = useState(totalPrice)
    const [sumParticipants, setSumParticipants] = useState(totalParticipant)

    const headerClassName = "table-cell p-2 border-b-2 border-r-2 border-gray-500 font-bold bg-red-500 text-white first:rounded-tl-lg last:rounded-tr-lg"
    const cellClassName = "table-cell p-2 border-b-2 border-r-2 border-gray-500 first:border-l-2"

    function handleSubmit(e){
        e.preventDefault()
        console.log(data.events)
        put(route('calculator.update'), {
            onSuccess: setDirty(false)
        })
    }

    function handlePriceChange(value, index){
        const newData = data.events
        newData[index] = {...newData[index], price_per_person: value, total: newData[index]['participant_number'] * value, dirty: true}
        handleSumPricesChange(newData)
        setData('events', newData)
        setDirty(true)
    }

    function handleNumberChange(value, index){
        const newData = data.events
        newData[index] = {...newData[index], participant_number: value, total: newData[index]['price_per_person'] * value, dirty: true}
        handleSumPricesChange(newData)
        handleSumParticipantsChange(newData)
        setData('events', newData)
        setDirty(true)
    }
    
    function handleSumPricesChange(data){
        setSumPrice(data.reduce((d, {total})=> d + total, 0))
    }

    function handleSumParticipantsChange(data){
        setSumParticipants(data.reduce((d, {participant_number})=> d + Number(participant_number), 0))
    }

    function handleCancel(){
        const oldPrice = [...prices]
        handleSumPricesChange(oldPrice)
        handleSumParticipantsChange(oldPrice)
        setData('events', oldPrice)
        setDirty(false)
    }

    console.log(errors)

    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"Calculator Event"} />}
        >
            <div className="p-5">
                <Card className="max-h-screen overflow-auto">
                    <CardBody>
                        <div className="table w-full">
                            <div className="table-header-group">
                                <div className="table-row">
                                    <div className={headerClassName}>NO</div>
                                    <div className={headerClassName}>EVENT</div>
                                    <div className={headerClassName}>PARTISIPAN</div>
                                    <div className={headerClassName}>HARGA/PARTISIPAN</div>
                                    <div className={headerClassName}>TOTAL</div>
                                </div>
                            </div>
                            <div className="table-row-group">
                                {
                                    events.map((event, index) => (
                                        <div className="table-row" key={index}>
                                            <div className={cellClassName + " w-12"}>
                                                {index+1}
                                            </div>
                                            <input type="text" value={data.events[index].id} hidden/>
                                            <div className={cellClassName }>
                                                <div className="flex justify-between items-centere">
                                                    {event.name}
                                                    <div hidden={!data.events[index].dirty}>
                                                        <Tooltip content="This event value has recently been changed">
                                                            <ExclamationCircleIcon className="w-5 text-red-900" hid/>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cellClassName + " w-32"}>
                                                <Tooltip content={"Default: " + prices[index].participant_number}>
                                                    <input
                                                        className="w-full rounded-md" 
                                                        name="participant-number"
                                                        value={data.events[index].participant_number}
                                                        onChange={(e) => handleNumberChange(e.target.value, index)}
                                                    />
                                                </Tooltip>

                                                <InputError message={errors['events.'+index+".participant_number"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                            </div>
                                            <div className={cellClassName + " w-60"}>
                                                <Tooltip content={"Default: Rp " + Number(prices[index].price_per_person).toLocaleString()}>
                                                    <CurrencyInput 
                                                        key={index}
                                                        id="price-per-person"
                                                        name="price-per-person"
                                                        value={data.events[index].price_per_person}
                                                        autoComplete="price-per-person"
                                                        prefix="Rp "
                                                        className="w-full rounded-md"
                                                        onValueChange={(value) => handlePriceChange(value, index)}                  
                                                    />
                                                </Tooltip>

                                                <InputError message={errors['events.'+index+".price_per_person"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                            </div>
                                            <div className={cellClassName + " font-bold"}>
                                                {"Rp " + Number(Number(data.events[index].participant_number) * Number(data.events[index].price_per_person)).toLocaleString()}
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-5 my-5">
                            <Tooltip content="Simpan Perubahan">
                                <Button color="green" onClick={handleSubmit} hidden={!dirty}>
                                    Simpan
                                </Button>   
                            </Tooltip>
                            <Tooltip content="Kembalikan ke Nilai Semula">
                                <Button color="yellow" onClick={handleCancel} hidden={!dirty}>
                                    Reset
                                </Button>   
                            </Tooltip>
                        </div>
                        <div className="flex gap-5 items-center justify-center">
                            <div className="flex border-2 border-gray-500 items-center">
                                <div className="bg-red-500 p-2 text-white">
                                    <Typography variant="h4">Total Harga</Typography>
                                </div>
                                <div className="bg-red-100 p-2">
                                    <Typography variant="h4" color="black">
                                        {"Rp "+Number(sumPrices).toLocaleString()}
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex border-2 border-gray-500 items-center">
                                <div className="bg-red-500 p-2 text-white">
                                    <Typography variant="h4">Total Peserta</Typography>
                                </div>
                                <div className="bg-red-100 p-2">
                                    <Typography variant="h4" color="black">
                                        {Number(sumParticipants).toLocaleString()}
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

        </Authenticated>
    )
}