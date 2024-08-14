import Colors from '@/Base/Colors';
import InputDate from '@/Components/Form/InputDate';
import { changeToInputDate } from '@/helpers/IndoesiaDate';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { useForm } from '@inertiajs/react';
import { Button, IconButton } from '@material-tailwind/react';
import { Gantt, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";
import { useEffect, useState } from 'react';

function ToolTipCustom({task}, event){
    return(
        <div className="bg-white p-3 shadow-lg rounded-md">
            <p>{task.name}</p>
            <p>{event?.proposal.event_category}</p>
        </div>
    )
}

function EventHeaderSelected({onClose}){
    return(
        <div className='flex justify-between items-center my-5 px-2'>
            <p className='uppercase tracking-widest'>Event</p>
            <IconButton color='red' onClick={onClose}>
                <XMarkIcon className='w-5'/>
            </IconButton>
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
                        />
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default function CalendarChart({
    events=[]
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

    function handleTaskClick(task){
        const temp = events.find(e => e.id == task.id)
        if(eventSelected.id != task.id) setEventSelected(temp.id)
    }

    function handleOnInputDateChange(e, position){
        const newTasks = [...data.tasks]
        const indexTasks = newTasks.findIndex(t => t.id == e.target.id)
        if(position == 'start'){
            newTasks[indexTasks] = {...newTasks[indexTasks], start: new Date(e.target.value)}
        }
        else if(position == 'end'){
            newTasks[indexTasks] = {...newTasks[indexTasks], end: new Date(e.target.value)}
        }
        setData('tasks', newTasks)
        setIsDirty(true)

        console.log('Task date change on input: ' + e.target.id)
    }

    function handleDateChange(task){
        const newTasks = [...data.tasks]
        const indexTask = newTasks.findIndex(t => t.id == task.id)
        newTasks[indexTask] = task
        setData('tasks', newTasks)
        const temp = events.find(e => e.id == task.id)
        setEventSelected(temp.id)
        setIsDirty(true)

        console.log("Expander Click: " + task.id + " start: " + task.start + " end: " + task.end)
        console.log(data.tasks)
    }

    function handleReset(){
        setData('tasks', [...defaultTasks])
        setEventSelected(false)
        setIsDirty(false)
    }

    function handleSubmit(){
        // put(route())
    }
    
    useEffect(() => {
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
                event_category: element.proposal.event_category
            })
        });
        setDefaultTasks([...temps])
        setData('tasks', temps)
    }, [])

    return(
            <>
            {
                data.tasks.length != 0 ?
                <div className='grid grid-cols-12 gap-4'>
                    {
                        eventSelected ?
                        <div className={'col-span-4'}>
                            <EventHeaderSelected onClose={() => handleOnClose()} />
                            <EventTableSelected 
                                event={data.tasks.find(t => t.id == eventSelected)}
                                color={data.tasks.find(t => t.id == eventSelected).styles.backgroundColor}
                                onStartChange={(e) => handleOnInputDateChange(e, 'start')}
                                onEndChange={(e) => handleOnInputDateChange(e, 'end')}
                            />
                        </div>
                        :
                        ""
                    }
                    <div className={(eventSelected ? 'col-span-8' : 'col-span-12')}>
                        <Gantt 
                            tasks={data.tasks}
                            viewMode={ViewMode.Day}
                            TooltipContent={(component) => ToolTipCustom(component, events.find(e => e.id == component.task.id))}
                            preStepsCount={2}
                            listCellWidth=''
                            timeStep={8.64e+7} // One day
                            onDateChange={(task) => handleDateChange(task)}
                            onClick={(task) => handleTaskClick(task)}                        
                            locale='id'
                        />
                    </div>
                    <div>

                    </div>
                </div>
                :
                ""
            }
            <div>
                <Button hidden={!isDirty} onClick={() => handleReset()}>
                    Reset
                </Button>
                <Button>
                    Simpan
                </Button>
            </div>

            </>
    )
}