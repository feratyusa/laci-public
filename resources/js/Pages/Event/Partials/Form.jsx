import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import { Button } from "@material-tailwind/react";
import { useForm } from "@inertiajs/react";
import ReactSelect from "react-select";
import InputError from "@/Components/Form/InputError";
import { useState } from "react";
import number_types from "@/Base/NumberType";
import { useEffect } from "react";
import LoadingInput from "@/Components/Loading/LoadingInput";

function LocationInput({data, setData, errors}){
    const [locationOptions, setLocationOptions] = useState(false)
    useEffect(()=>{
        axios.get('/api/input/locations').then(function(response){
            setLocationOptions(response.data.locations)
        })
    }, [])

    return(
        <>
            <div className="table-cell pb-8 w-44">
                <InputLabel value="Lokasi" htmlFor="location_id" 
                    className="font-bold text-lg" />
            </div>
            <div className="table-cell flex justify-center pb-8">
                {
                    locationOptions ?
                    <ReactSelect
                        id="location_id"
                        classNamePrefix="select2-selection"
                        className="max-w-2xl focus:border-red-500"
                        value={locationOptions.find(k => k.value == data.location_id) ?? ''}
                        options={locationOptions}                    
                        onChange={(e) => setData('location_id', e.value)}
                        isSearchable
                    />
                    :
                    <LoadingInput size="h-4 w-1/2"/>
                }

                <InputError message={errors.location_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
            </div>
        </>
    )
}

function AssignToInput({data, setData, errors}){
    const [userOptions, setUserOptions] = useState(false)
    useEffect(()=>{
        axios.get('/api/input/users').then(function(response){
            setUserOptions(response.data.users)
        })
    }, [])

    return(
        <>
            <div className="table-cell pb-8 w-44">
                <InputLabel value="Assign To" htmlFor="assign-to" 
                    className="font-bold text-lg" />
            </div>
            <div className="table-cell flex justify-center pb-8">
                {
                    userOptions ?
                    <ReactSelect
                        id="assign-to"
                        classNamePrefix="select2-selection"
                        className="max-w-2xl focus:border-red-500"
                        value={userOptions.find(k => k.value == data.assign_to) ?? ''}
                        options={userOptions}                    
                        onChange={(e) => setData('assign_to', e.value)}
                        isSearchable
                    />
                    :
                    <LoadingInput size="h-4 w-1/2"/>
                }

                <InputError message={errors.assign_to} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
            </div>
        </>
    )
}

export default function EventForm({
        method, 
        event=null, 
        proposal_id, 
        proposals,
        user,
    }){

    const s_date = event ? new Date(event.start_date) : new Date()
    const s_date_string = `${s_date.getFullYear()}-${('0'+(s_date.getMonth() + 1)).slice(-2)}-${('0'+(s_date.getDate())).slice(-2)}`
    const e_date = event ? new Date(event.end_date) : new Date()
    const e_date_string = `${e_date.getFullYear()}-${('0'+(e_date.getMonth() + 1)).slice(-2)}-${('0'+(e_date.getDate())).slice(-2)}`
    
    const { data, setData, post, put, cancel, processing, errors, reset, transform} = useForm({
        name: event ? event.name : '',
        proposal_id: proposal_id ? proposal_id : '',        
        start_date: s_date_string,
        end_date: e_date_string,
        participant_number_type: event ? event.participant_number_type : number_types[0].value,
        participant_number: event ? event.participant_number : 0,        
        location_id: event?.location?.id ?? '',
        assign_to: event ? event.assign_to : user.username,
    });

    const [proposalDetail, setProposalDetail] = useState(
        proposal_id ? proposals.find(p => p.value == proposal_id) : ''
    )

    const [numberDisabled, setNumberDisabled] = useState(false)

    function handleProposalChange(id){
        setProposalDetail(proposals.find(p => p.value == id))
    }

    function handleSubmit(e){
        e.preventDefault()
        
        transform((data) => ({
            ...data,
            participant_number: data.participant_number_type === number_types[0].value ? data.participant_number : 0
        }))
        
        if(method === 'create'){
            post(route('event.store'))
        }else if(method === 'edit'){
            put(route('event.update', [event.id]))
        }
    }
    
    function handleCancel() {
        cancel()
        reset()
        window.history.back()
    }

    useEffect(() => {
        handleProposalChange(data.proposal_id)
    }, [data.proposal_id])

    return(
        <form onSubmit={handleSubmit} 
            action="post" 
            className={"border-y-2 px-5 py-10 flex flex-col gap-8 border-gray-500"} 
            enctype="multipart/form-data">
            <div className="table w-full">
                <div className="table-row-group">
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Nama" htmlFor="name" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <TextInput 
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder="Nama Event"
                                autoComplete="name"
                                isFocused={true}
                                className="border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900  focus:border-gray-900   "
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <p className="text-sm italic text-gray-400">Alphanumeric only, maximum length 120 characters</p>

                            <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Proposal" htmlFor="proposal_id" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <ReactSelect
                                id="proposal_id"
                                name="proposal_id"
                                placeholder="Proposal"
                                classNamePrefix="select2-selection"
                                className="max-w-full focus:border-red-500"
                                options={proposals}
                                value={proposals.find(p => p.value == data.proposal_id)}
                                isSearchable={true}
                                onChange={(e) => setData('proposal_id', e.value)}
                            />

                            <InputError message={errors.proposal_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Kursus" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <TextInput 
                                type="text"
                                placeholder="Kursus"
                                disabled                                
                                value={data.proposal_id ? `(${proposalDetail?.kursus.sandi}) ${proposalDetail?.kursus.lengkap}` : ''}
                            />
                                
                            <InputError message={proposalDetail == null || proposalDetail == undefined ? "Kursus tidak ada / tidak terbaca di Database" : ''} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Kategori Event" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <TextInput 
                                type="text"
                                placeholder="Kategori Event"
                                disabled
                                value={data.proposal_id ? proposalDetail?.event_category : ''}
                            />
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Tanggal Mulai" htmlFor="start-date" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <input 
                                id="start-date"
                                name="start-date"
                                type="date"
                                value={data.start_date}
                                className="focus:border-red-500 focus:ring-0"
                                onChange={(e) => setData('start_date', e.target.value)}
                            />

                            <InputError message={errors.start_date} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Tanggal Selesai" htmlFor="end-date" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <input 
                                id="end-date"
                                name="end-date"
                                type="date"
                                value={data.end_date}
                                className="focus:border-red-500 focus:ring-0"
                                onChange={(e) => setData('end_date', e.target.value)}
                            />

                            <InputError message={errors.end_date} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Jumlah Partisipan" htmlFor="participant_number" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <TextInput 
                                id="participant_number"
                                type="text"
                                name="participant_number"
                                value={data.participant_number}
                                placeholder="Jumlah Partisipan"
                                autoComplete="jumlah"
                                className="border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900 focus:border-gray-900 disabled:opacity-30"
                                onChange={(e) => setData('participant_number', e.target.value)}
                                disabled={numberDisabled}
                            />
                            <p className="text-sm italic text-gray-400">Number only</p>

                            <InputError message={errors.participant_number} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <AssignToInput data={data} setData={setData} errors={errors}/>
                    </div>
                    <div className="table-row">
                        <LocationInput data={data} setData={setData} errors={errors}/>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-10 justify-center">
                <Button
                    type="submit"
                    color="red"
                    loading={processing}
                    onClick={(e) => handleSubmit(e)}>
                    Submit 
                </Button>
                <Button 
                    onClick={() => handleCancel()}
                    color="yellow">
                    Cancel
                </Button>
            </div>
        </form>
    )
}