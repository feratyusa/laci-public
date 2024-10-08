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
            <p><span className='font-bold'>ID: </span>{task.id}</p>
            <p><span className='font-bold'>Event: </span>{task.name}</p>
            <p><span className='font-bold'>Kursus: </span>{task?.kursus}</p>
            <p><span className='font-bold'>Kategori: </span>{event?.proposal.event_category}</p>
            <p><span className='font-bold'>Mulai: </span>{changeToIndonesiaDateTime(task.start, true)}</p>
            <p><span className='font-bold'>Selesai: </span>{changeToIndonesiaDateTime(task.end, true)}</p>
            <p className='italic text-xs mt-2 text-blue-500'>Click to see more</p>     
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

function EventTableSelected({event, color, ...props}){
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
                    <th className={attrClassName}>Lokasi</th>
                    <td className={valueClassName}>{event.location}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Dibuat Oleh</th>
                    <td className={valueClassName}>{event.created_by}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Assign To</th>
                    <td className={valueClassName}>{event.assign_to}</td>
                </tr>
                <tr>
                    <th className={attrClassName}>Tanggal Mulai</th>
                    <td className={valueClassName}>
                        <InputDate 
                            id={event.id}
                            name="start_date"
                            value={changeToInputDate(event.start)}                            
                            disabled
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
                            disabled
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
    
    function generateTasks(){
        var temps = []
        console.log(events)
        events?.forEach((element, index) => {
            var color = String(element?.location?.name).toLowerCase().includes('prigen') ? "rgb(34 197 94)" : "rgb(59 130 246)"
            temps.push({
                start: new Date(element.start_date),
                end: new Date(element.end_date),
                name: element.name,
                id: element.id,
                location: element?.location?.name,
                created_by: element.created_by,
                assign_to: element.assign_to,
                type: 'task',
                progress: 0,
                styles: { backgroundColor: color, backgroundSelectedColor: color },
                kursus: `(${element.proposal.kursus.sandi}) ${element.proposal.kursus.lengkap}`,
                event_category: element.proposal.event_category
            })
        });

        setDefaultTasks([...temps])
        setData('tasks', temps)
    }

    function checkDirtyTasks(tasks){
        var flag = false
        tasks.map(element => {
            if(element?.dirty == true) flag = true
        })
        setIsDirty(flag)
    }    
    
    useEffect(() => {        
        generateTasks()
    }, [events])

    return(
            <>
            {
                data.tasks.length != 0 ?
                <>
                <div className='flex justify-center gap-10 mb-5'>
                    <div className='flex items-center gap-2'>
                        <div className='w-5 h-5 bg-green-500'></div>
                        <p className='text-green-500 font-bold'>: Lokasi di Prigen (PRNG)</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='w-5 h-5 bg-blue-500'></div>
                        <p className='text-blue-500 font-bold'>: Lokasi Bukan di Prigen</p>
                    </div>
                </div>
                <div className='relative'>
                    <Gantt 
                        tasks={data.tasks}
                        viewMode={ViewMode.Day}
                        TooltipContent={(component) => ToolTipCustom(component, events.find(e => e.id == component.task.id))}
                        preStepsCount={2}
                        ganttHeight={events.length > 10 ? 500 : ''}
                        listCellWidth=''
                        onClick={(task) => handleShowTaskDetails(task)}                      
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
                                    />
                                </>
                                :
                                ''
                            }
                        </div>
                </div>                
                </>
                :
                ""
            }
            </>
    )
}