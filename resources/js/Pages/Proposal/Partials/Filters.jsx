import statuses from "@/Base/Statuses";
import InputDate from "@/Components/InputDate";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import { ArrowDownIcon, ArrowUpIcon, CircleStackIcon, ExclamationCircleIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, Collapse, Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ReactSelect from "react-select";

export default function Filters({filters=null, kursus, categories}){
    const {data, setData, get, transform, isDirty, reset, processing} = useForm({
        search: filters ? filters.search : '',
        start_date: filters ? filters.start_date : '',
        end_date: filters ? filters.end_date : '',
        category: filters ? filters.category : '',
        kursus: filters ? filters?.kursus : [],
        status: filters ? filters.status : [],
    })
 
    // Collapse State
    const [open, setOpen] = useState(false)
    const  [collapseClass, setCollapseClass] = useState("") 

    const [openSelect, setOpenSelect] = useState(false)

    const filterClassName = "flex flex-col gap-2"

    function openCollapse(state){
        setOpen(state)
        if(state) setCollapseClass("overflow-visible");
        else setCollapseClass("");
    }

    function handleSelectChange(property, e){
        if(property === 'status'){
            setData('status', [...e])
        }
        else if(property === 'kursus'){
            setData('kursus', [...e])
        }
        else{
            setData('category', e?.value ?? "")
        }
    }

    function handleInputChange(s){
        if(s.length > 4) setOpenSelect(true)
        else setOpenSelect(false)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        console.log(data)
        get(route('proposal.index'), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: openCollapse(false)           
        })
    }

    return(
        <div className="w-full">                            
            <Collapse open={open} className={collapseClass}>
                <div className="flex flex-col gap-5 px-5 mt-5 mb-10">
                    <div className={filterClassName}>
                        <InputLabel htmlFor="search">
                            <Typography variant="h6">Nama Usulan</Typography>
                        </InputLabel>
                        <TextInput
                            id="search"
                            name="search"
                            placeholder="Nama"
                            value={data.search}
                            onChange={(e) => setData('search', e.target.value)}
                        />
                    </div>
                    <div className={filterClassName}>
                        <Typography variant="h6">Tanggal Masuk</Typography>
                        <div className="flex gap-5">
                            <div className="w-full max-w-lg">
                                <InputLabel htmlFor="start_date">
                                    <Typography>
                                        Dari
                                    </Typography>
                                </InputLabel>
                                <InputDate
                                    id="start_date"
                                    name="start_date" 
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date',e.target.value) }
                                />
                            </div>
                            <div className="w-full max-w-lg">
                                <InputLabel htmlFor="end_date">
                                    <Typography>
                                        Sampai
                                    </Typography>
                                </InputLabel>
                                <InputDate 
                                    id="end_date"
                                    name="end_date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={filterClassName}>
                        <InputLabel htmlFor="category">
                            <Typography variant="h6">Kategori</Typography>
                        </InputLabel>
                        <ReactSelect
                            id="category"
                            name="category" 
                            placeholder="Kategori"
                            classNamePrefix="select2-selection"
                            className="min-w-36"
                            options={[...categories]}
                            value={categories.find(c => c.value === data.category) ?? ""}                             
                            isClearable  ={true}                                                                                    
                            onChange={(e) => handleSelectChange('category', e)}
                        />
                    </div>
                    <div className={filterClassName}>
                        <InputLabel htmlFor="kursus">
                            <Typography variant="h6">Kursus</Typography>
                        </InputLabel>
                        <ReactSelect
                                id="kursus"
                                name="kursus"
                                classNamePrefix="select2-selection"
                                className="max-w-5xl focus:border-red-500"
                                value={kursus.length != 0 ? data.kursus : ''}
                                options={[...kursus]}
                                openMenuOnClick={false}
                                onChange={(e) => handleSelectChange('kursus', e)}
                                onInputChange={(s) => handleInputChange(s)}
                                menuIsOpen={openSelect}
                                isSearchable
                                isClearable
                                isMulti
                                menuShouldBlockScroll
                            />
                    </div>
                    <div className={filterClassName}>
                        <InputLabel htmlFor="status">
                            <Typography variant="h6">Status</Typography>
                        </InputLabel>
                        <ReactSelect 
                            id="status"
                            name="status[]"
                            placeholder="Status"
                            classNamePrefix="select2-selection"
                            className="w-full"
                            options={[...statuses]} 
                            isSearchable={true}                     
                            isMulti
                            isClearable
                            value={data.status.length != 0 ? data.status : ''}
                            onChange={(e) => handleSelectChange('status', e)}
                        />
                    </div>
                    <div className="flex gap-5 justify-center">
                        <Button
                            className="flex items-center gap-2 py-3 pr-5 pl-3"
                            type="submit"
                            color="green"
                            onClick={(e) => handleSubmit(e)}
                            loading={processing}
                        >
                            <MagnifyingGlassIcon className="w-5"/>
                            Apply
                        </Button>
                        <Button
                            className="flex items-center gap-2 w-fit py-3 pr-5 pl-3"
                            // onClick={handleReset}
                            onClick={() => reset()}
                            color="orange"
                        >
                            <XMarkIcon className="w-5"/>
                            Reset
                        </Button>
                    </div>
                </div>
            </Collapse>
            <Button
                className="flex items-center justify-center w-full gap-5 rounded-none border-x-0 focus:ring-0"
                variant="outlined"
                color={isDirty ? "green" : "black"}
                onClick={() => openCollapse(!open)}>
                    <Tooltip content="Filter telah ditambahkan">
                        <ExclamationCircleIcon className="w-7" hidden={!isDirty} />
                    </Tooltip>
                    <Typography
                        variant="h6"        
                    >
                        Filter
                    </Typography>
                    {
                        open 
                        ? <ArrowUpIcon className="h-5 w-5" />
                        : <ArrowDownIcon className="h-5 w-5" /> 
                    }
            </Button>
        </div>  
    )
}