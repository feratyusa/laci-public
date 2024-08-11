import { DATE, MULTISELECT, SELECT, TEXT } from "@/Base/FiltersInputType";
import InputDate from "@/Components/Form/InputDate";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import { ArrowDownIcon, ArrowUpIcon, ExclamationCircleIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, Collapse, Tooltip, Typography } from "@material-tailwind/react";
import { useState } from "react";
import ReactSelect from "react-select";
import MultiSelectFilter from "./MultiSelectFilter";
import SelectFilter from "./SelectFilter";
import TextFilter from "./TextFilter";
import DateFilter from "./DateFilter";

export default function FiltersGroup({filters, filtersAttribute, route}){
    const {data, setData, get, isDirty, reset, processing} = useForm(filters)
 
    // Collapse State
    const [open, setOpen] = useState(false)
    const  [collapseClass, setCollapseClass] = useState("") 

    const filterClassName = "flex flex-col gap-2"

    function openCollapse(state){
        setOpen(state)
        if(state) setCollapseClass("overflow-visible");
        else setCollapseClass("");
    }

    function handleSelectChange(property, e, multi=false){
        if(multi){
            var elements = []
            e.forEach(element => {
                elements.push(element.value)
            });
            setData(property, [...elements])
        }
        else{
            setData(property, e?.value ?? "")
        }
    }

    function handleDateChange(attribute, position, value){
        const newDate = position === 'start' ? {start: value, end: data[attribute].end} : {start: data[attribute].start, end: value}
        setData(attribute, newDate)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        get(route, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: openCollapse(false)           
        })
    }



    return(
        <div className="w-full">                            
            <Collapse open={open} className={collapseClass}>
                <div className="flex flex-col gap-5 px-5 mt-5 mb-10">
                    {
                        Object.keys(filters).map((filter, index) => {
                            if(filtersAttribute[index].type === TEXT){
                                return (
                                    <TextFilter 
                                        id={filter}
                                        value={data[filter]}
                                        filterClassName={filterClassName}
                                        placeholder={filtersAttribute[index].placeholder}
                                        onChange={(e) => setData(filter, e.target.value)}
                                    />
                                )
                            }
                            else if(filtersAttribute[index].type === DATE){
                                return(
                                    <DateFilter 
                                        id={filtersAttribute[index].name}
                                        placeholder={filtersAttribute[index].placeholder}
                                        start_value={data[filter].start}
                                        end_value={data[filter].end}
                                        filterClassName={filterClassName}
                                        onChangeStart={(e) => handleDateChange(filter, 'start', e.target.value)}
                                        onChangeEnd={(e) => handleDateChange(filter, 'end', e.target.value)}
                                    />
                                )
                            }
                            else if(filtersAttribute[index].type === SELECT){
                                const selections = [...filtersAttribute[index].options]
                                return(
                                    <SelectFilter 
                                        id={filtersAttribute[index].name}
                                        selections={selections}
                                        placeholder={filtersAttribute[index].placeholder}
                                        value={selections.find(s => s.value === data[filter])}
                                        onChange={(e) => handleSelectChange(filter, e)}
                                        filterClassName={filterClassName}
                                    />
                                )
                            }
                            else if(filtersAttribute[index].type === MULTISELECT){
                                const selections = [...filtersAttribute[index].options]
                                console.log(filtersAttribute[index].name)
                                return(
                                    <MultiSelectFilter 
                                        id={filtersAttribute[index].name}
                                        name={filtersAttribute[index].name}
                                        placeholder={filtersAttribute[index].placeholder}
                                        selections={selections}
                                        instruction={filtersAttribute[index].instruction ?? false}
                                        value={data[filter].length != 0 ? selections.filter(k => data[filter].includes(k.value)) : ''}
                                        onChange={(e) => handleSelectChange(filter, e, true)}
                                        filterClassName={filterClassName}
                                        onClickOpenMenu={filtersAttribute[index].name == 'status' ? true : false}
                                    />
                                )
                            }
                        })
                    }
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