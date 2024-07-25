import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { Button } from "@material-tailwind/react";
import { Link, useForm } from "@inertiajs/react";
import ReactSelect from "react-select";
import statuses from "@/Base/Statuses";
import InputError from "@/Components/InputError";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";

export default function EventForm({
        method, 
        event=null, 
        proposal_id=null, 
        proposals,
        number_types,
        event_categories,
    }){

    const s_date = event ? new Date(event.start_date) : new Date()
    const s_date_string = `${s_date.getFullYear()}-${('0'+(s_date.getMonth() + 1)).slice(-2)}-${('0'+(s_date.getDate())).slice(-2)}`
    const e_date = event ? new Date(event.end_date) : new Date()
    const e_date_string = `${e_date.getFullYear()}-${('0'+(e_date.getMonth() + 1)).slice(-2)}-${('0'+(e_date.getDate())).slice(-2)}`
    
    const kd_kursus =[
        {value: '90051', label: '90051'},
        {value: '90050', label: '90050'},
        {value: '90049', label: '90049'},
        {value: '90048', label: '90048'},
        {value: '90047', label: '90047'},
        {value: '90046', label: '90046'},
        {value: '90045', label: '90045'},
        {value: '90044', label: '90044'},
        {value: '90043', label: '90043'},
        {value: '90042', label: '90042'},
    ]
    
    const { data, setData, post, put, cancel, processing, errors, reset, transform} = useForm({
        name: event ? event.name : '',
        proposal_id: proposal_id ? proposal_id : '',
        event_category: event ? event.event_category : event_categories[0].value,
        kd_kursus: event ? event.kd_kursus : '',
        start_date: s_date_string,
        end_date: e_date_string,
        participant_number_type: event ? event.participant_number_type : number_types[0].value,
        participant_number: event ? event.participant_number : 0,
        price_per_person: event ? event.price_per_person : 0.00
    });

    const [numberDisabled, setNumberDisabled] = useState(false)

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
                                value={proposals.find(p => p.value === data.proposal_id)}
                                isSearchable={true}
                                onChange={(e) => setData('proposal_id', e.value)}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'red',
                                    },
                                })}
                            />

                            <InputError message={errors.proposal_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Kategori Event" htmlFor="event-category" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <ReactSelect
                                id="event-category"
                                name="event-category"
                                classNamePrefix="select2-selection"
                                className="max-w-full focus:border-red-500"
                                options={event_categories}
                                value={event_categories.find(v => v.value === data.event_category)}
                                onChange={(e) => setData('event_category', e.value)}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'red',
                                    },
                                })}
                            />

                            <InputError message={errors.event_category} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Kursus" htmlFor="kd-kursus" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <ReactSelect
                                id="kd-kursus"
                                name="kd-kursus"
                                placeholder="Kursus"
                                classNamePrefix="select2-selection"
                                className="max-w-full focus:border-red-500"
                                value={kd_kursus.find(k => k.value === data.kd_kursus)}
                                options={kd_kursus}
                                onChange={(e) => setData('kd_kursus', e.value)}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'red',
                                    },
                                })}
                            />

                            <InputError message={errors.kd_kursus} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
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
                            <InputLabel value="Tipe Jumlah Partisipan" htmlFor="number-type" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <ReactSelect
                                id="number-type"
                                name="number-type"
                                placeholder="Tipe Jumlah Partisipan"
                                classNamePrefix="select2-selection"
                                className="max-w-full focus:border-red-500"
                                value={number_types.find(n => n.value === data.participant_number_type)}
                                options={number_types}
                                onChange={(e) => {
                                    setData('participant_number_type', e.value)
                                    if(e.value === 'FIXED') setNumberDisabled(false)
                                    else setNumberDisabled(true)
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    colors: {
                                        ...theme.colors,
                                        primary: 'red',
                                    },
                                })}
                            />

                            <InputError message={errors.participant_number_type} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
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
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Harga Per Orang" htmlFor="price-per-person" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <CurrencyInput 
                                id="price-per-person"
                                name="price-per-person"
                                value={data.price_per_person}
                                placeholder="Jumlah Partisipan"
                                autoComplete="price-per-person"
                                prefix="Rp "
                                className="w-full rounded-md focus:drop-shadow-lg border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900 focus:border-gray-900 disabled:opacity-30"
                                onValueChange={(value) => setData('price_per_person', value)}
                            />
                            <p className="text-sm italic text-gray-400">Number only</p>

                            <InputError message={errors.price_per_person} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
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