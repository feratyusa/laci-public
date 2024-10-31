import { useForm } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import axios from "axios";
import ReactSelect from "react-select";
import BulkForm from "./Bulkform";
import NugieForm from "./NugieForm";
import FileForm from "./FileForm";

export default function ParticipantForm({setParticipants, kursus}){
    const {data, setData, reset, post, errors} = useForm({
        kd_kursus: kursus.sandi,
        start_date: `${new Date().getFullYear()}-01-01`,
        mode: 'bulk',
        bulk: [{column: '', value: []}],
        nugie: [{index: '', detail: ''}],
        file: ''
    })

    const modeOptions = [
        {value: 'bulk', label: 'Secara Bulk'},
        {value: 'nugie', label: 'Dengan Nugie'},
        {value: 'file', label: 'Dengan File'},
    ]

    function handleCheckParticipants(){
        axios.post(route('event.participants.check'), data)
            .then((response) => {
                setParticipants(response.data.result)
            })
    }

    return(
        <div>
            <div className="grid grid-cols-2 gap-5 mb-2">
                <div className="grid grid-rows-2 items-center">                    
                    <label className="text-red-500 font-bold">
                        Belum Mengikuti Kursus
                    </label>
                    <input
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
            <div className="mb-5">
                {
                    data.mode == 'bulk' ?
                    <BulkForm data={data} setData={setData}/>
                    :
                    data.mode == 'nugie' ?
                    <NugieForm data={data} setData={setData}/>
                    :
                    <FileForm data={data} setData={setData}/>
                }
            </div>
            <div className="flex gap-3">
                <Button color="green">
                    Simpan
                </Button>
                <Button color="amber" onClick={handleCheckParticipants}>
                    Cek Peserta
                </Button>
                <Button color="red">
                    Reset
                </Button>
            </div>       
        </div>
    )
}
