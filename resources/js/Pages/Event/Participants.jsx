import BreadcrumbMod from "@/Components/BreadcrumbMod";
import HeaderTitle from "@/Components/HeaderTitle";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Head, useForm } from "@inertiajs/react";
import { Button, Card, CardBody, IconButton, Option, Select } from "@material-tailwind/react";
import axios from "axios";
import { cloneDeep, get, values } from "lodash";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

function CourseSelections({data, setData, errors}){
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get(route('input.courses'))
            .then((response) => {
                setCourses(response.data.courses)
            })
    }, [])

    return(
        <ReactSelect
            classNamePrefix={'select2-selection'}
            value={courses.filter(c => data.kd_kursus.find(k => k == c.value))}
            options={courses}
            onChange={(e) => setData('kd_kursus', e.map(d => d.value))}
            isMulti
        /> 
    )
}

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
            value={columnValues.filter(c => rule.value.includes(c.value))}
            options={columnValues}
            onChange={(e) => handleInputChange(index, 'value', e.map(v => v.value))}
            isMulti
        />
    )
}

function BulkForm({data, setData, errors}){

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
        <div>
            {
                data.bulk.map((rule, index) => (
                    <div className="grid grid-cols-7 gap-5">
                        <div className="col-span-3">
                            <ReactSelect
                                value={columns.find(c => c.value == rule.column)}
                                options={columns.filter(c => ! data.bulk.find(b => c.value == b.column))}
                                onChange={(e) => handleInputChange(index, 'column', e.value)}
                            />
                        </div>
                        <div className="col-span-3">
                            <ValueSelections 
                                selectedColumn={rule.column} 
                                rule={rule}                         
                                handleInputChange={handleInputChange}
                                index={index}
                            />
                        </div>
                        <div>
                            <IconButton size="md" color="red" onClick={() => handleDeleteInput(index)}>
                                <TrashIcon className="w-full"/>
                            </IconButton>
                        </div>
                    </div>
                ))
            }
            <Button onClick={() => handleAddInput()}>
                Tambah Aturan
            </Button>
        </div>
    )
}

function NugieForm({data, setData, errors}){
    return(
        <div>
            Nugie
        </div>
    )
}

function FileForm({data, setData}){
    return(
        <div>
            File
        </div>
    )
}

function ParticipantForm({event, kursus}){
    const {data, setData, reset, post, errors} = useForm({
        kd_kursus: [kursus],
        start_date: `${new Date().getFullYear()}-01-01`,
        mode: 'bulk',
        bulk: [{column: '', value: []}],
        nugie: [{index: '', detail: ''}],
        file: ''
    })

    const modeOptions = [
        {value: 'bulk', label: 'By Bulk'},
        {value: 'nugie', label: 'By Nugie'},
        {value: 'file', label: 'By File'},
    ]

    console.log(data)

    return(
        <div>
            <CourseSelections data={data} setData={setData}/>
            <input
                value={data.start_date}
                type="date"
                onChange={(e) => setData('start_date', e.target.value)}
            />
            <ReactSelect
                value={modeOptions.find(m => m.value == data.mode)}
                options={modeOptions}
                onChange={(e) => setData('mode', e.value)}
            />
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
    )
}

export default function ManageParticipants({
    auth,
    event=[],
    kursus
}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Peserta Event'}/>}
        >
            <Head title={get(event, 'name', 'Event')}/>

            <div className="m-5">
                <BreadcrumbMod menu={'events'} title={[get(event, 'name', 'Event'), 'Manage Peserta']} />
                
                <Card>
                    <CardBody>
                        <div>
                            <p>Masukkan Peserta dengan memilih salah satu cara di bawah.</p>
                            <ParticipantForm event={event} kursus={kursus}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </Authenticated>
    )
}