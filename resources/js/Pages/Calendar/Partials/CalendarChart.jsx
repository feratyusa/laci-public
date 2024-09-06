import Colors from '@/Base/Colors';
import InputDate from '@/Components/Form/InputDate';
import { changeToIndonesiaDateTime, changeToInputDate } from '@/helpers/IndoesiaDate';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { Button, IconButton } from '@material-tailwind/react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from 'react';

function ToolTipCustom({task}, event){
    return(
        <div className="bg-white p-3 shadow-lg rounded-md">
            <p><span className='font-bold'>Event: </span>{task.name}</p>
            <p><span className='font-bold'>Kursus: </span>{task?.kursus}</p>
            <p><span className='font-bold'>Kategori: </span>{event?.proposal.event_category}</p>
            <p><span className='font-bold'>Mulai: </span>{changeToIndonesiaDateTime(task.start, true)}</p>
            <p><span className='font-bold'>Selesai: </span>{changeToIndonesiaDateTime(task.end, true)}</p>
            <p className='italic text-xs mt-2 text-blue-500'>Click to see more</p>
            <p className='italic text-xs text-blue-500'>Double click to reset</p>
        </div>
    )
}

function EventHeaderSelected({onClose}){
    return(
        <div className='grid grid-cols-12 items-center mb-5'>
            <div className='col-span-11 flex items-center gap-5 text-red-500'>
                <CalendarIcon className='w-8'/>
                <p className='text-lg font-bold uppercase'>Event</p>
            </div>
            <div className='col-span-1'>
                <IconButton color='red' onClick={onClose} size='sm'>
                    <XMarkIcon className='w-5'/>
                </IconButton>
            </div>
        </div>
    )
}

function EventTableSelected({event, color, onStartChange, onEndChange, ...props}){
    const attrClassName = "p-2 border-x-2 border-b-2 first:border-t-2 border-black text-white"
    const valueClassName = "p-2 bg-gray-100 text-black border-b-2 border-r-2 last:border-t-2 border-black"
    return(
        <table className='w-full table-auto' style={{backgroundColor: color}}>
            <tbody className='text-left'>
                <tr>
                    <th className={attrClassName}>ID</th>
                    <td className={valueClassName}>{event.id}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Nama</th>
                    <td className={valueClassName}>{event.name}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Kursus</th>
                    <td className={valueClassName}>{event.kursus}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Kategori</th>
                    <td className={valueClassName}>{event.event_category}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Tanggal Mulai</th>
                    <td className={valueClassName}>
                        <InputDate 
                            id={event.id}
                            name="start_date"
                            value={changeToInputDate(event.start)}
                            max={changeToInputDate(event.end)}
                            onChange={onStartChange}
                            onKeyDown={(e) => e.preventDefault()}
                        />
                    </td>
                </tr>
                <tr>
                    <th className={attrClassName}>Tanggal Selesai</th>
                    <td className={valueClassName}>
                        <InputDate 
                            id={event.id}
                            name="end_date"
                            value={changeToInputDate(event.end)}
                            min={changeToInputDate(event.start)}
                            onChange={onEndChange}
                            onKeyDown={(e) => e.preventDefault()}
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default function CalendarChart({
    events=[],
    start='',
    end=''
}){
    const [eventSelected, setEventSelected] = useState(false)
    const [isDirty, setIsDirty] = useState(false)
    const [defaultTasks, setDefaultTasks] = useState([])
    const {data, setData, put, processing} = useForm({
        tasks: []
    })

    function handleOnClose(){
        setEventSelected(false)
    }

    function handleShowTaskDetails(task){
        const temp = events.find(e => e.id == task.id)
        if(eventSelected.id != task.id) setEventSelected(temp.id)
    }

    function handleResetTask(task){
        const newTasks = [...data.tasks]
        const indexTask = newTasks.findIndex(t => t.id == task.id)

        newTasks[indexTask] = {...defaultTasks[indexTask]}

        setData('tasks', newTasks)
    }

    function handleOnInputDateChange(e, position){
        const newTasks = [...data.tasks]
        const indexTasks = newTasks.findIndex(t => t.id == e.target.id)

        const newDate = new Date(e.target.value)
        if(position == 'start'){
            newTasks[indexTasks] = {...newTasks[indexTasks], start: newDate, dirty: +newDate != +defaultTasks[indexTasks].start}
        }
        else if(position == 'end'){
            newTasks[indexTasks] = {...newTasks[indexTasks], end: newDate, dirty: +newDate != +defaultTasks[indexTasks].end}
        }
        
        setData('tasks', newTasks)

        console.log('Task date change on input: ' + e.target.id)
    }

    function handleDateChange(task){
        const newTasks = [...data.tasks]
        const indexTask = newTasks.findIndex(t => t.id == task.id)

        const isTaskDirty = (+task.start != +defaultTasks[indexTask].start || +task.end != +defaultTasks[indexTask].end)
        newTasks[indexTask] = {...task, dirty: isTaskDirty}

        setData('tasks', newTasks)

        const temp = events.find(e => e.id == task.id)

        setEventSelected(temp.id)

        console.log("Expander Click: " + task.id + " start: " + task.start + " end: " + task.end)
        console.log(data.tasks)
    }

    function handleResetAll(){
        setData('tasks', [...defaultTasks])
        setEventSelected(false)
    }

    function handleSave(){
        console.log(data)
        put(route('calendar.update'), {
            preserveState: false
        })
    }
    
    function generateTasks(){
        var temps = []
        events.forEach((element, index) => {
            console.log(Object.keys(Colors).at(index))
            temps.push({
                start: new Date(element.start_date),
                end: new Date(element.end_date),
                name: element.name,
                id: element.id,
                type: 'task',
                progress: 0,
                styles: { backgroundColor: `${Object.keys(Colors).at(index%43)}`, backgroundSelectedColor: `${Object.keys(Colors).at(index%43)}`},
                kursus: `(${element.proposal.kursus.sandi}) ${element.proposal.kursus.lengkap}`,
                event_category: element.proposal.event_category
            })
        });

        setDefaultTasks([...temps])
        setData('tasks', temps)
    }

    function checkDirtyTasks(){
        var flag = false
        data.tasks.map(element => {
            if(element.dirty == true) flag = true
        })
        setIsDirty(flag)
    }
    
    useEffect(() => {
        if(data.tasks.length == 0){
            generateTasks()
        }
        else{
            checkDirtyTasks()
        }
    }, [data])

    return(
            <>
            {
                data.tasks.length != 0 ?
                <>
                <div className='relative'>
                    <Gantt 
                        tasks={data.tasks}
                        viewMode={ViewMode.Day}
                        TooltipContent={(component) => ToolTipCustom(component, events.find(e => e.id == component.task.id))}
                        preStepsCount={2}
                        listCellWidth=''
                        timeStep={8.64e+7} // One day
                        onDateChange={(task) => handleDateChange(task)}
                        onClick={(task) => handleShowTaskDetails(task)}
                        onDoubleClick={(task) => handleResetTask(task)}                        
                        locale='id'
                    />
                        <div className={`absolute top-5 left-5 border-gray-500 border-2 bg-white max-w-md shadow-xl rounded-lg p-5 pb-10 duration-300 ease-in-out ${eventSelected == false ? "opacity-0" : ''}`}>
                            {
                                eventSelected ?
                                <>
                                    <EventHeaderSelected onClose={() => handleOnClose()} />
                                    <EventTableSelected 
                                        event={data.tasks.find(t => t.id == eventSelected)}
                                        color={data.tasks.find(t => t.id == eventSelected).styles.backgroundColor}
                                        onStartChange={(e) => handleOnInputDateChange(e, 'start')}
                                        onEndChange={(e) => handleOnInputDateChange(e, 'end')}
                                    />
                                </>
                                :
                                ''
                            }
                        </div>
                </div>
                <div className='flex justify-center gap-5'>
                    <Button hidden={!isDirty} onClick={() => handleSave()} color='green' loading={processing}>
                        Simpan
                    </Button>
                    <Button hidden={!isDirty} onClick={() => handleResetAll()} color='red'>
                        Reset
                    </Button>
                </div>
                </>
                :
                ""
            }
            </>
    )
}