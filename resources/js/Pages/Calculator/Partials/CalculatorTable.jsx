import InputError from "@/Components/Form/InputError";
import EmptyRow from "@/Components/Table/EmptyRow";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, Card, CardBody, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { useEffect } from "react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function CalculatorTable({
    publics=[],
    totalPricePublic=0,
    totalPartcPublic=0,
    inHouses=[],
    totalPriceInHouse=0,
    totalPartcInHouse=0,
    data,
    setData,
    put,
    processing,
    sumPrices,
    setSumPrice,
    sumParticipants,
    setSumParticipants,
}){
    const [dirty, setDirty] = useState(false)
    const [error, setError] = useState(null)

    const tableBodyClassName = "w-40"
    const childTableBody = "border-l-2 border-b-2 last:border-r-2 p-2 border-blue-300 text-black"
    const childTableHeader = "border-l-2 border-b-2 border-t-2 last:border-r-2 p-2 bg-blue-500 text-white border-blue-300"

    function checkTable(){
        let errorFlag = false
        let dirtyFlag = false

        data.public.forEach(element => {
            if(element?.isValid == false) errorFlag = true
            if(element?.dirty == true) dirtyFlag = true
        });
        data.inHouse.forEach(element => {
            if(element?.isValid == false) errorFlag = true
            if(element?.dirty == true) dirtyFlag = true
        })        

        setError(errorFlag)
        setDirty(dirtyFlag)
    }

    function checkValue(value){
        const regex = /^[0-9]+$/
        console.log("Value " + value + " - Regex " + regex.test(value))
        return regex.test(value)
    }


    function handlePriceChange(value, index, priceType, type){
        if(value == '' || value == null) value = 0

        const isValid = checkValue(value)

        const newData = data[type]
        if(priceType === 'training'){
            newData[index] = {...newData[index], training_price: value, total: Number(newData[index]['participant_number']) * (Number(value) + Number(newData[index]['accomodation_price'])), dirty: true, isValid: isValid}
        }
        else if(priceType === 'accomodation'){
            newData[index] = {...newData[index], accomodation_price: value, total: Number(newData[index]['participant_number']) * (Number(value) + Number(newData[index]['training_price'])), dirty: true, isValid: isValid}
        }

        handleSumPricesChange([...newData], type)

        setData(type, newData)
        setDirty(true)
    }

    function handleNumberChange(value, index, type){        
        const isValid = checkValue(value)
        
        const newData = data[type]
        newData[index] = {...newData[index], participant_number: value, total: (Number(newData[index]['accomodation_price']) + Number(newData[index]['training_price'])) * Number(value), dirty: true, isValid: isValid}

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
        const newSumPartc = {...sumParticipants}
        newSumPartc[type] = data.reduce((d, {participant_number})=> Number(d) + Number(participant_number), 0)
        setSumParticipants(newSumPartc) 
    }

    function handleIndexRowReset(index, type){
        const newData = data[type]

        const defaultParticipant = type == 'public' ? publics[index]['participant_number'] : inHouses[index]['participant_number']
        const defaultAcc = type == 'public' ? publics[index]['accomodation_price'] : inHouses[index]['accomodation_price']
        const defaultTraining = type == 'public' ? publics[index]['training_price'] : inHouses[index]['training_price']

        newData[index] = {...newData[index], participant_number: defaultParticipant, training_price: defaultTraining, accomodation_price: defaultAcc, total: (Number(defaultAcc) + Number(defaultTraining)) * Number(defaultParticipant), dirty: false, isValid: true}

        handleSumPricesChange([...newData], type)
        handleSumParticipantsChange([...newData], type)        
        
        setData(type, newData)
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

        setError(false)

        setDirty(false)
    }

    function handleSubmit(e){
        e.preventDefault()
        put(route('calculator.update'), {
            preserveState: false
        })        
    }

    useEffect(() => {
        checkTable()
    }, [data])

    console.log(data)

    return(    
        <>        
            <table className="w-full table-fixed text-center align-middle">
                <thead className="border-x-4 border-red-500">
                    <tr className="bg-red-500 text-white">
                        <th className="py-2">TIPE TRAINING</th>
                        <th>TOTAL PARTISIPAN</th>
                        <th>TOTAL BIAYA </th>                                    
                    </tr>
                </thead>
                <tbody>
                    <tr className="font-bold text-black border-b-2 border-red-300">
                        <td className="py-4">PUBLIC TRAINING</td>
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
                                        publics.length == 0 ?
                                        <EmptyRow colSpan={6}/>
                                        :
                                        publics.map((event, index) => (
                                            <tr>
                                                <td className={childTableBody}>
                                                    {event.id}
                                                </td>
                                                <td className={childTableBody + " relative"}>
                                                    {event.name}
                                                    <div className="absolute right-0 bottom-1/4 " hidden={data?.public[index]?.dirty ? false : true}>
                                                        <Tooltip content={`${data?.public.at(index).isValid ? "Nominal telah diubah" : "Input harus berupa angka"}, klik untuk reset`}>
                                                            <IconButton variant="text" color={data?.public.at(index).isValid ? "amber" : "red"} size="sm" onClick={() => handleIndexRowReset(index, 'public')}>
                                                                <ExclamationTriangleIcon className="w-full"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>  
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
                    <tr className="border-red-500 border-b-2 font-bold text-black">
                        <td className="py-4">IN HOUSE TRAINING</td>
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
                                        inHouses.length == 0 ?
                                        <EmptyRow colSpan={6}/>
                                        :
                                        inHouses.map((event, index) => (
                                            <tr>
                                                <td className={childTableBody}>
                                                    {event.id}
                                                </td>
                                                <td className={childTableBody + " relative"}>
                                                    {event.name}
                                                    <div className="absolute right-0 bottom-1/4 " hidden={data?.inHouse[index]?.dirty ? false : true}>
                                                        <Tooltip content={`${data?.inHouse.at(index).isValid ? "Nominal telah diubah" : "Input harus berupa angka"}, klik untuk reset`}>
                                                            <IconButton variant="text" color={data?.inHouse.at(index).isValid ? "amber" : "red"} size="sm" onClick={() => handleIndexRowReset(index, 'inHouse')}>
                                                                <ExclamationTriangleIcon className="w-full"/>
                                                            </IconButton>
                                                        </Tooltip>
                                                    </div>
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
            {
                error &&
                <div className="flex justify-center items-center gap-5 text-red-500">
                    <XCircleIcon className="w-5"/>
                    <p className="italic">Pastikan input merupakan angka</p>
                </div>
            }
            <div className="flex justify-center items-center gap-5 my-5">
                <Tooltip content="Simpan Perubahan">
                    <Button color="green" onClick={handleSubmit} hidden={!dirty} loading={processing} disabled={error}>
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
        </>
    )
}