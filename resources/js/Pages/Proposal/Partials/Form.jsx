import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import { Button, Typography } from "@material-tailwind/react";
import { Link, useForm } from "@inertiajs/react";
import ReactSelect from "react-select";
import statuses from "@/Base/Statuses";
import InputError from "@/Components/Form/InputError";
import { useEffect, useState } from "react";
import event_category from "@/Base/EventCategory";

export default function ProposalForm({method, proposal=null, kursus=[]}){
    const date = proposal ? new Date(proposal.entry_date) : new Date()
    const date_string = `${date.getFullYear()}-${('0'+(date.getMonth() + 1)).slice(-2)}-${('0'+(date.getDate())).slice(-2)}`    
    
    const { data, setData, post, put, cancel, processing, errors } = useForm({
        name: proposal ? proposal.name : '',
        event_category: proposal ? proposal.event_category : event_category[0].value,
        entry_date: date_string,
        kd_kursus: proposal ? proposal.kd_kursus : '',
        status: proposal ? proposal.status : statuses[0].value,
    });

    const [openSelect, setOpenSelect] = useState(false)
    
    function setEventCategory(kd_kursus){
        setData('event_category', kursus.find(k => k.value == kd_kursus)?.kategori ?? '')
        console.log(kursus.find(k => k.value === kd_kursus)?.event_category)
    }

    function handleInputChange(s){
        if(s.length > 2) setOpenSelect(true)
        else setOpenSelect(false)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(method === 'create'){
            post(route('proposal.store'))
        }else if(method === 'edit'){
            put(route('proposal.update', [proposal.id]))
        }
    }
    
    function handleCancel() {
        cancel()
        window.history.back()
    }

    useEffect(() => {
        setEventCategory(data.kd_kursus)
    }, [data.kd_kursus])

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
                                placeholder="Nama Usulan"
                                autoComplete="name"
                                isFocused={true}
                                className="max-w-2xl border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900 focus:border-gray-900   "
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <p className="text-sm italic text-gray-400">Alphanumeric only, maximum length 120 characters</p>

                            <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Tanggal Masuk" htmlFor="entry-date" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <input 
                                id="entry-date"
                                name="entry-date"
                                type="date"
                                value={data.entry_date}
                                className="focus:border-red-500 focus:ring-0"
                                onChange={(e) => setData('entry_date', e.target.value)}
                            />

                            <InputError message={errors.entry_date} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
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
                                className="max-w-2xl focus:border-red-500"
                                value={event_category.find(k => k.value == data.event_category) ?? ''}
                                options={[...event_category]}
                                onChange={(e) => setData('event_category', e?.value ?? "")}
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
                                classNamePrefix="select2-selection"
                                className="max-w-2xl focus:border-red-500"
                                value={kursus.find(k => k.value == data.kd_kursus) ?? ''}
                                options={[...kursus]}
                                openMenuOnClick={false}
                                onChange={(e) => setData('kd_kursus', String(e?.value) ?? "")}
                                onInputChange={(s) => handleInputChange(s)}
                                menuIsOpen={openSelect}
                                isSearchable
                                isClearable
                                menuShouldBlockScroll
                            />
                            <p className="text-sm italic text-gray-400">Ketik 3 karakter</p>

                            <InputError message={errors.kd_kursus} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                        </div>
                    </div>
                    <div className="table-row">
                        <div className="table-cell pb-8 w-44">
                            <InputLabel value="Status" htmlFor="status" 
                                className="font-bold text-lg" />
                        </div>
                        <div className="table-cell pb-8">
                            <ReactSelect
                                id="status"
                                classNamePrefix="select2-selection"
                                className="max-w-2xl focus:border-red-500"
                                options={statuses}
                                value={statuses.find(s => s.value === data.status)}
                                onChange={(e) => setData('status', e.value)}
                            />
                            
                            <InputError message={errors.status} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
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