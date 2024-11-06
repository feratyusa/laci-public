import { Button } from "@material-tailwind/react";
import axios from "axios";
import ReactSelect from "react-select";
import BulkForm from "./Bulkform";
import NugieForm from "./NugieForm";
import FileForm from "./FileForm";
import { useState } from "react";
import { get, isEmpty, keys } from "lodash";
import InputError from "@/Components/Form/InputError";
import { useForm } from "@inertiajs/react";

export default function ParticipantForm({
    event_id='', 
    event_start='', 
    event_end='', 
    setParticipants,
    setDeletedParticipants,
    kursus,
}){
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const {data, setData} = useForm({
        kd_kursus: kursus.sandi,
        start_date: `${new Date().getFullYear()}-01-01`,
        event_id: event_id,
        event_start: event_start,
        event_end: event_end,
        mode: 'bulk',
        bulk: [{column: '', value: []}],        
    })
    const [file, setFile] = useState()

    const modeOptions = [
        {value: 'bulk', label: 'Secara Bulk'},
        // {value: 'nugie', label: 'Dengan Nugie'},
        {value: 'file', label: 'Dengan File'},
    ]

    function postData(data, config){
        axios.post(route('event.participants.check'), data, config)
            .then((response) => {
                const result = response.data.result
                console.log(result)                
                setParticipants(result.filter(r => get(r, 'inDiklat', false) == false))
                setDeletedParticipants(result.filter(r => get(r, 'inDiklat', false) == true))
                
                setLoading(false)
                setErrors({})
            })
            .catch((response) => {                
                setLoading(false)                
                setErrors(response)
            })
    }

    function handleCheckParticipants(){
        setLoading(true)
        handleReset()
        if(data.mode == 'file'){
            const formData = new FormData()
            formData.append('kd_kursus', data.kd_kursus)
            formData.append('start_date', data.start_date)
            formData.append('event_id', data.event_id)
            formData.append('event_start', data.event_start)
            formData.append('event_end', data.event_end)
            formData.append('mode', data.mode)             
            formData.append('file', file)            
            postData(formData, {headers: {'content-type': 'multipart/form-data'}})
        }
        else{
            postData(data, {})
        }
    }

    function handleReset(){
        setParticipants([])
        setDeletedParticipants([])
    }

    console.log(data)
    
    return(
        <div>
            <div className="grid grid-cols-2 gap-5 mb-2">
                <div className="grid grid-rows-2 items-center">                    
                    <label className="text-red-500 font-bold">
                        Belum Mengikuti Kursus
                    </label>
                    <input
                        className="bg-gray-300"
                        value={`(${kursus.sandi}) ${kursus.lengkap}`}
                        disabled
                    />  
                </div>
                <div className="grid grid-rows-2 items-center">
                    <label htmlFor="start-date" className="text-red-500 font-bold">
                        Rentang Awal Tanggal Peserta Belum Ikut (sampai sekarang)
                    </label>
                    <input
                        id="start-date"
                        value={data.start_date}
                        type="date"
                        onChange={(e) => setData('start_date', e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-rows-2 items-center">
                <label htmlFor="mode" className="text-red-500 font-bold">
                    Metode Mengambil Peserta
                </label>
                <ReactSelect
                    id="mode"
                    classNamePrefix="select2-selection"
                    value={modeOptions.find(m => m.value == data.mode)}
                    options={modeOptions}
                    onChange={(e) => setData('mode', e.value)}
                />
                <div className="h-1 w-full bg-gray-500 my-5"></div>
            </div>
            {
                ! isEmpty(errors) && 
                <div className="bg-red-100 border-2 border-red-500 p-3 my-3">
                    <p className="text-red-500 font-bold text-lg mb-2">Rule Error</p>
                    <div className="pl-5">
                        {
                            keys(errors).map((value) => (
                                <InputError message={errors[value]}/>
                            ))
                        }
                    </div>
                </div>
            }
            <div></div>
            <div className="mb-5">
                {
                    data.mode == 'bulk' ?
                    <BulkForm data={data} setData={setData}/>
                    :
                    data.mode == 'nugie' ?
                    <NugieForm data={data} setData={setData}/>
                    :
                    <FileForm data={data} setData={setData} setFile={setFile}/>
                }
            </div>
            <div className="flex gap-3">                
                <Button color="amber" onClick={handleCheckParticipants} loading={loading}>
                    Ambil Peserta
                </Button>
                <Button color="red" onClick={handleReset}>
                    Reset Peserta
                </Button>
            </div>       
        </div>
    )
}
