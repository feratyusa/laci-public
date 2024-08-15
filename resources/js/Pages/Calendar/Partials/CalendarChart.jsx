import Colors from '@/Base/Colors';
import DialogDelete from '@/Components/Dialogs/DialogDelete';
import InputDate from '@/Components/Form/InputDate';
import { changeToIndonesiaDateTime, changeToInputDate } from '@/helpers/IndoesiaDate';
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
            <p><span className='font-bold'>Kategori: </span>{event?.proposal.event_category}</p>
            <p><span className='font-bold'>Mulai: </span>{changeToIndonesiaDateTime(task.start, true)}</p>
            <p><span className='font-bold'>Selesai: </span>{changeToIndonesiaDateTime(task.end, true)}</p>
        </div>
    )
}

function EventHeaderSelected({onClose}){
    return(
        <div className='flex justify-between items-center my-5 px-2'>
            <div className='basis-3/4 flex justify-center'>
                <p className='uppercase text-black tracking-widest'>Event</p>
            </div>
            <div className='basis-1/4 flex justify-center'>
                <IconButton color='red' onClick={onClose} size='sm'>
                    <XMarkIcon className='w-5'/>
                </IconButton>
            </div>
        </div>
    )
}

function EventTableOptions({event}){
    return(
        <div className='flex justify-center p-5'>
            <DialogDelete 
                content={'event'}
                title={'Hapus Event'}
                message={`Event (${event.id}) ${event.name} akan dihapus. Event yang dihapus tidak dapat dikembalikan. Yakin inging menghapus event?`}
                route={route('event.destroy', [event.id])}
            />
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

    function handleSave(){
        put(route())
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
                kursus: `(${element.proposal.kursus.sandi}) ${element.proposal.kursus.lengkap}`,
                event_category: element.proposal.event_category
            })
        });
        setDefaultTasks([...temps])
        setData('tasks', temps)
    }, [events])

    return(
            <>
            <div className='flex justify-center mb-5'>
                <div className='text-black'>
                    <p className='uppercase tracking-wide font-bold'>Kalender Event {`(${changeToIndonesiaDateTime(start, true)} - ${changeToIndonesiaDateTime(end, true)})`}</p>
                </div>
            </div>
            {
                data.tasks.length != 0 ?
                <>
                <div className='grid grid-cols-12 gap-5'>
                    {
                        eventSelected ?
                        <div className={'col-span-4 px-4 pb-4 rounded-lg shadow-lg'}>
                            <EventHeaderSelected onClose={() => handleOnClose()} />
                            <EventTableSelected 
                                event={data.tasks.find(t => t.id == eventSelected)}
                                color={data.tasks.find(t => t.id == eventSelected).styles.backgroundColor}
                                onStartChange={(e) => handleOnInputDateChange(e, 'start')}
                                onEndChange={(e) => handleOnInputDateChange(e, 'end')}
                            />
                            <EventTableOptions event={data.tasks.find(t => t.id == eventSelected)}/>
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
                </div>
                <div className='flex justify-center gap-5'>
                    <Button hidden={!isDirty} onClick={() => handleReset()} color='red'>
                        Reset
                    </Button>
                    <Button hidden={!isDirty} onClick={() => handleSubmit()} color='green'>
                        Simpan
                    </Button>
                </div>
                </>
                :
                ""
            }
            </>
    )
}