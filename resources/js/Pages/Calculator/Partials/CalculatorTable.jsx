import InputError from "@/Components/Form/InputError";
import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function CalculatorTable({
    publics,
    totalPricePublic=0,
    totalPartcPublic=0,
    inHouses,
    totalPriceInHouse=0,
    totalPartcInHouse=0,
}){
    const [dirty, setDirty] = useState(false)
    const {data, setData, put, processing, errors} = useForm({        
        public: [...publics],
        inHouse: [...inHouses],
    })

    const [sumPrices, setSumPrice] = useState({
        public: totalPricePublic,
        inHouse: totalPriceInHouse
    })
    const [sumParticipants, setSumParticipants] = useState({
        public: totalPartcPublic,
        inHouse: totalPartcInHouse
    })

    const tableBodyClassName = "w-40"
    const childTableBody = "border-l-2 border-b-2 last:border-r-2 p-2 border-blue-300 text-black"
    const childTableHeader = "border-l-2 border-b-2 border-t-2 last:border-r-2 p-2 bg-blue-500 text-white border-blue-300"

    function handleSubmit(e){
        e.preventDefault()
        put(route('calculator.update'))
    }

    function handlePriceChange(value, index, priceType, type){
        const newData = data[type]
        if(priceType === 'training'){
            newData[index] = {...newData[index], training_price: value, total: Number(newData[index]['participant_number']) * (Number(value) + Number(newData[index]['accomodation_price'])), dirty: true}
        }
        else if(priceType === 'accomodation'){
            newData[index] = {...newData[index], accomodation_price: value, total: Number(newData[index]['participant_number']) * (Number(value) + Number(newData[index]['training_price'])), dirty: true}
        }
        handleSumPricesChange([...newData], type)
        setData(type, newData)
        setDirty(true)
    }

    function handleNumberChange(value, index, type){        
        const newData = data[type]
        newData[index] = {...newData[index], participant_number: value, total: (Number(newData[index]['accomodation_price']) + Number(newData[index]['training_price'])) * Number(value), dirty: true}
        handleSumPricesChange([...newData], type)
        handleSumParticipantsChange([...newData], type)
        setData(type, newData)
        setDirty(true)
    }
    
    function handleSumPricesChange(data, type){
        const newSumPrice = {...sumPrices}        
        newSumPrice[type] = data.reduce((d, {total})=> Number(d) + Number(total), 0)
        setSumPrice(newSumPrice)
    }

    function handleSumParticipantsChange(data, type){
        console.log(data)
        const newSumPartc = {...sumParticipants}
        newSumPartc[type] = data.reduce((d, {participant_number})=> Number(d) + Number(participant_number), 0)
        setSumParticipants(newSumPartc) 
    }

    function handleCancel(){
        setSumPrice({
            public: totalPricePublic,
            inHouse: totalPriceInHouse
        })
        setSumParticipants({
            public: totalPartcPublic,
            inHouse: totalPartcInHouse
        })
        setData({
                public: [...publics],
                inHouse: [...inHouses]
        })
        setDirty(false)
    }

    return(
        <Card className="max-h-screen-lg overflow-auto">
            <CardBody>                
                <table className="w-full table-fixed text-center align-middle border-x-4 border-b-4 border-amber-300">
                    <thead className="border-x-4 border-red-500">
                        <tr className="bg-red-500 text-white">
                            <th className="py-2">TIPE TRAINING</th>
                            <th>TOTAL PARTISIPAN</th>
                            <th>TOTAL BIAYA </th>                                    
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-amber-300 font-bold text-black">
                            <td className="py-2">PUBLIC TRAINING</td>
                            <td>{sumParticipants.public}</td>
                            <td>{"Rp " + Number(sumPrices.public).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="py-5 px-10">
                                <table className="w-full table-auto border-2">
                                    <thead>
                                        <tr>
                                            <th className={childTableHeader}>ID</th>
                                            <th className={childTableHeader}>EVENT</th>
                                            <th className={childTableHeader}>PARTISIPAN</th>
                                            <th className={childTableHeader}>BIAYA PELATIHAN</th>
                                            <th className={childTableHeader}>BIAYA AKOMODASI</th>
                                            <th className={childTableHeader}>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-left">
                                        {
                                            publics.map((event, index) => (
                                                <tr>
                                                    <td className={childTableBody}>
                                                        {event.id}
                                                    </td>
                                                    <td className={childTableBody}>
                                                        {event.name}
                                                    </td>
                                                    <td className={tableBodyClassName + " " + childTableBody}>
                                                        <Tooltip content={"Semula: " + event.participant_number}>
                                                            <input
                                                                className="w-full rounded-md" 
                                                                name="participant-number"
                                                                value={data?.public[index]?.participant_number}
                                                                onChange={(e) => handleNumberChange(e.target.value, index, 'public')}
                                                            />
                                                        </Tooltip>

                                                        <InputError message={errors['public.'+index+".participant_number"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                                    </td>
                                                    <td className={tableBodyClassName + " " + childTableBody}>
                                                        <Tooltip content={"Semula: Rp " + Number(event.training_price).toLocaleString()}>
                                                            <CurrencyInput 
                                                                key={index}
                                                                id="price-per-person"
                                                                name="price-per-person"
                                                                value={Number(data?.public[index]?.training_price)}
                                                                autoComplete="price-per-person"
                                                                prefix="Rp "
                                                                className="w-full rounded-md"
                                                                onValueChange={(value) => handlePriceChange(value, index, 'training', 'public')}                  
                                                            />
                                                        </Tooltip>

                                                        <InputError message={errors['public.'+index+".training_price"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                                    </td>
                                                    <td className={tableBodyClassName + " " + childTableBody}>
                                                        <Tooltip content={"Semula: Rp " + Number(event.accomodation_price).toLocaleString()}>
                                                            <CurrencyInput 
                                                                key={index}
                                                                id="price-per-person"
                                                                name="price-per-person"
                                                                value={Number(data?.public[index]?.accomodation_price)}
                                                                autoComplete="price-per-person"
                                                                prefix="Rp "
                                                                className="w-full rounded-md"
                                                                onValueChange={(value) => handlePriceChange(value, index, 'accomodation', 'public')}                  
                                                            />
                                                        </Tooltip>

                                                        <InputError message={errors['public.'+index+".accomodation_price"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                                    </td>
                                                    <td className={"w-60 " + childTableBody}>
                                                        {"Rp " + Number(Number(data?.public[index]?.participant_number) * (Number(data?.public[index]?.training_price) + Number(data?.public[index]?.accomodation_price))).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))
                                        }                                
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                        <tr className="bg-amber-300 font-bold text-black">
                            <td className="py-2">IN HOUSE TRAINING</td>
                            <td>{sumParticipants.inHouse}</td>
                            <td>{"Rp " + Number(sumPrices.inHouse).toLocaleString()}</td>
                        </tr>
                        <tr>
                            <td colSpan={3} className="px-10 py-5">
                                <table className="w-full table-auto">
                                    <thead>
                                        <tr>
                                            <th className={childTableHeader}>ID</th>
                                            <th className={childTableHeader}>EVENT</th>
                                            <th className={childTableHeader}>PARTISIPAN</th>
                                            <th className={childTableHeader}>BIAYA PELATIHAN</th>
                                            <th className={childTableHeader}>BIAYA AKOMODASI</th>
                                            <th className={childTableHeader}>TOTAL</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-left">
                                        {
                                            inHouses.map((event, index) => (
                                                <tr>
                                                    <td className={childTableBody}>
                                                        {event.id}
                                                    </td>
                                                    <td className={childTableBody}>
                                                        {event.name}
                                                    </td>
                                                    <td className={tableBodyClassName + " " + childTableBody}>
                                                        <Tooltip content={"Semula: " + event.participant_number}>
                                                            <input
                                                                className="w-full rounded-md" 
                                                                name="participant-number"
                                                                value={data?.inHouse[index]?.participant_number}
                                                                onChange={(e) => handleNumberChange(e.target.value, index, 'inHouse')}
                                                            />
                                                        </Tooltip>

                                                        <InputError message={errors['inHouse.'+index+".participant_number"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                                    </td>
                                                    <td className={tableBodyClassName + " " + childTableBody}>
                                                        <Tooltip content={"Semula: Rp " + Number(event.training_price).toLocaleString()}>
                                                            <CurrencyInput 
                                                                key={index}
                                                                id="price-per-person"
                                                                name="price-per-person"
                                                                value={Number(data?.inHouse[index]?.training_price)}
                                                                autoComplete="price-per-person"
                                                                prefix="Rp "
                                                                className="w-full rounded-md"
                                                                onValueChange={(value) => handlePriceChange(value, index, 'training', 'inHouse')}                  
                                                            />
                                                        </Tooltip>

                                                        <InputError message={errors['inHouse.'+index+".training_price"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                                    </td>
                                                    <td className={tableBodyClassName + " " + childTableBody}>
                                                        <Tooltip content={"Semula: Rp " + Number(event.accomodation_price).toLocaleString()}>
                                                            <CurrencyInput 
                                                                key={index}
                                                                id="price-per-person"
                                                                name="price-per-person"
                                                                value={Number(data?.inHouse[index]?.accomodation_price)}
                                                                autoComplete="price-per-person"
                                                                prefix="Rp "
                                                                className="w-full rounded-md"
                                                                onValueChange={(value) => handlePriceChange(value, index, 'accomodation', 'inHouse')}                  
                                                            />
                                                        </Tooltip>

                                                        <InputError message={errors['inHouse.'+index+".accomodation_price"]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                                    </td>
                                                    <td className={"w-60 " + childTableBody}>
                                                        {"Rp " + Number(Number(data?.inHouse[index]?.participant_number) * (Number(data?.inHouse[index]?.training_price) + Number(data?.inHouse[index]?.accomodation_price))).toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))
                                        }                                
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody> 
                </table>
                <div className="flex justify-center items-center gap-5 my-5">
                    <Tooltip content="Simpan Perubahan">
                        <Button color="green" onClick={handleSubmit} hidden={!dirty} loading={processing}>
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
                            <Typography variant="h4">Total Biaya</Typography>
                        </div>
                        <div className="bg-red-100 p-2">
                            <Typography variant="h4" color="black">
                                {"Rp "+ Number(Number(sumPrices.public) + Number(sumPrices.inHouse)).toLocaleString()}
                            </Typography>
                        </div>
                    </div>
                    <div className="flex border-2 border-gray-500 items-center">
                        <div className="bg-red-500 p-2 text-white">
                            <Typography variant="h4">Total Peserta</Typography>
                        </div>
                        <div className="bg-red-100 p-2">
                            <Typography variant="h4" color="black">
                                {Number(Number(sumParticipants.public) + Number(sumParticipants.inHouse)).toLocaleString()}
                            </Typography>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}