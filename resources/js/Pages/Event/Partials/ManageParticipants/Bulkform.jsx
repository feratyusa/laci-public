import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, IconButton } from "@material-tailwind/react";
import axios from "axios";
import { cloneDeep } from "lodash";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

function ValueSelections({selectedColumn, handleInputChange, rule, index}){
    const [columnValues, setColumnValues] = useState([])

    useEffect(() => {
        switch (selectedColumn) {
            case 'jabatan':
                axios.get(route('input.employeeDepartments'))
                    .then((response) => {
                        setColumnValues(response.data.departments)
                    })
                break;
            
            case 'cabang':
                axios.get(route('input.employeeBranches'))
                    .then((response) => {
                        setColumnValues(response.data.branches)
                    })
                break;
            
            case 'seksi':
                axios.get(route('input.employeeSections'))
                    .then((response) => {
                        setColumnValues(response.data.sections)
                    })
                break;

            case 'jobfam':
                axios.get(route('input.employeeJobs'))
                    .then((response) => {
                        setColumnValues(response.data.jobs)
                    })
                break;
            default:
                setColumnValues([])
                break;
        }                
    }, [selectedColumn])

    return(
        <ReactSelect
            placeholder="Pilih Nilai ..."
            classNamePrefix="select2-selection"
            value={columnValues.filter(c => rule.value.includes(c.value))}
            options={columnValues}
            onChange={(e) => handleInputChange(index, 'value', e.map(v => v.value))}
            isMulti
        />
    )
}

export default function BulkForm({data, setData, errors}){

    const columns = [
        {value: 'jabatan', label: 'jabatan'},
        {value: 'cabang', label: 'cabang'},
        {value: 'seksi', label: 'seksi'},
        {value: 'jobfam', label: 'jobfam'},
    ]    
    
    function handleAddInput(){
        setData('bulk', [...data.bulk, {column: '', value: []}])
    }

    function handleInputChange(index, column, value){
        const newColumn = cloneDeep(data.bulk)
        newColumn[index][column] = value
        setData('bulk', newColumn)
    }

    function handleDeleteInput(index){
        const oldColumn = cloneDeep(data.bulk)
        oldColumn.splice(index, 1)
        setData('bulk', oldColumn)
    }

    return(
        <div className="mb-10">
            <p className="text-red-500 font-bold mb-2">Masukkan Aturan (<i>Rule</i>) untuk Mengambil Peserta</p>
            {
                data.bulk.map((rule, index) => (
                    <div className="grid grid-cols-11 gap-3 mb-3">
                        <div className="col-span-5">
                            <label>
                                Kolom
                            </label>
                            <ReactSelect
                                placeholder="Pilih Kolom ..."
                                classNamePrefix="select2-selection"
                                value={columns.find(c => c.value == rule.column)}
                                options={columns.filter(c => ! data.bulk.find(b => c.value == b.column))}
                                onChange={(e) => handleInputChange(index, 'column', e.value)}
                            />
                        </div>
                        <div className="col-span-5">
                            <label>
                                Value
                            </label>
                            <ValueSelections 
                                selectedColumn={rule.column} 
                                rule={rule}                         
                                handleInputChange={handleInputChange}
                                index={index}
                            />
                        </div>
                        <div className="col-span-1 flex items-end justify-center">
                            <IconButton size="md" color="red" onClick={() => handleDeleteInput(index)}>
                                <TrashIcon className="w-full"/>
                            </IconButton>
                        </div>
                    </div>
                ))
            }
            <Button onClick={() => handleAddInput()} color="blue">
                Tambah Aturan
            </Button>
        </div>
    )
}