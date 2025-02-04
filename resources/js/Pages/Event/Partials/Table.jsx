import ProposalStatus from "@/Base/ProposalStatus";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import { DropdownMenuOption } from "@/Components/DropdownOptions";
import LoadingCircle from "@/Components/Loading/LoadingCircle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { MenuItem } from "@headlessui/react";
import { BanknotesIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Cog8ToothIcon, EyeIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

function FiltersTable({table=useReactTable({})}){
    const [courses, setCourses] = useState([])
    const [eventCategories, setEventCategories] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/input/courses').then((response) => {
            setCourses(response.data.courses)
        }).catch((e) => {
            console.log(e)
        })

        axios.get('/api/input/event-categories').then((response) => {
            setEventCategories(response.data.event_categories)
        })

        axios.get('/api/input/users').then((response) => {
            setUsers(response.data.users)
        })
    }, [])

    return(
        <div className="m-5">
            <p className="font-bold text-lg mb-1">Filter Event</p>
            <div className="grid grid-cols-4 items-center gap-5 mb-3">
                <div className="flex">                    
                    <input
                        className="rounded-md w-full"
                        id="id-event" 
                        placeholder="ID Event"
                        onChange={(e) => table.getColumn('id').setFilterValue(String(e.target.value))}                     
                    />
                </div>
                <div className="flex">
                    <input
                        className="rounded-md w-full"
                        id="name" 
                        placeholder="Nama Event"
                        onChange={(e) => table.getColumn('name').setFilterValue(e.target.value)}                     
                    />
                </div>
                <div className="col-span-2">
                    <ReactSelect 
                        options={eventCategories}
                        placeholder="Kategori Event"
                        classNamePrefix="select2-selection"
                        className="w-full"
                        isSearchable
                        isClearable
                        onChange={(e) => table.getColumn('event_category').setFilterValue(e?.label)}
                    />
                </div>               
            </div>
            <div className="flex items-center gap-3 mb-3">
                <p className="font-bold text-nowrap">Tanggal Mulai</p>
                <div className="flex items-center gap-2 w-full">
                    <p>Dari</p>
                    <input
                        type="date"
                        placeholder="Tanggal Masuk"
                        className="rounded-md w-full"
                        onChange={(e) => table.getColumn('start_date').setFilterValue({...table.getColumn('start_date').getFilterValue(), start: e.target.value})}
                    />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <p>Sampai</p>
                    <input 
                        type="date"
                        className="rounded-md w-full"
                        onChange={(e) => table.getColumn('start_date').setFilterValue({...table.getColumn('start_date').getFilterValue(), end: e.target.value})}
                    />
                </div>
            </div>            
            <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                    <ReactSelect 
                        options={courses}
                        placeholder="Kursus"
                        classNamePrefix="select2-selection"
                        isSearchable
                        isMulti
                        onChange={(e) => table.getColumn('course').setFilterValue(e.map(item => item.label))}
                    />
                </div>
                <div>
                    <ReactSelect 
                        options={ProposalStatus.filter(p => p.value == 0 || p.value == 1 || p.value == 6 || p.value == 7)}
                        placeholder="Status"
                        classNamePrefix="select2-selection"
                        isSearchable
                        isMulti
                        onChange={(e) => table.getColumn('status').setFilterValue(e.map(item => item.value))}
                    />
                </div>
                <div>
                    <ReactSelect 
                        options={users}
                        placeholder="Assign To"
                        classNamePrefix="select2-selection"
                        isSearchable      
                        isClearable                  
                        isMulti
                        onChange={(e) => table.getColumn('action').setFilterValue(e.map(item => item.value))}
                    />
                </div>
            </div>
        </div>
    )
}

function OptionButtons({id, name}){
    return(
        <div className="flex justify-center items-center gap-3">
            <Link href={route('event.show', [id])}>
                <IconButton size="sm" color="blue" className="rounded-full">
                    <EyeIcon className="w-full"/>
                </IconButton>
            </Link>
            <DropdownMenuOption>
                <MenuItem>
                    <Link href={route('event.edit', [id])} className="block p-2 data-[focus]:bg-amber-100">
                        <div className="flex items-center gap-2 text-amber-500">
                            <Cog8ToothIcon className="w-5"/>
                            Edit Usulan
                        </div>
                    </Link>   
                </MenuItem>
                <MenuItem>
                    <DialogDelete mode="text" route={route('event.destroy', [id])} content={'event'} title={'Hapus Usulan'} message={`Yakin ingin menghapus (${name})? Usulan yang telah dihapus tidak dapat dikembalikan`}/>  
                </MenuItem>
            </DropdownMenuOption>
        </div>
    )
}

function CompleteStatus({isComplete, defaultPrices}){
    return(
        <div className="flex justify-center items-center gap-2">
        {
            isComplete ? 
            <Tooltip content="Berkas Lengkap">
                <IconButton color="green" size="sm" className="cursor-default">
                    <CheckIcon className="w-full"/>
                </IconButton>
            </Tooltip>
            :
            <Tooltip content="Berkas Belum Lengkap">
                <IconButton color="amber" size="sm">
                    <XMarkIcon className="w-full"/>
                </IconButton>
            </Tooltip>
        }
        {
            defaultPrices ?
            <Tooltip content="Anggaran Awal">
                <IconButton color="red" size="sm" className="cursor-default">
                    <BanknotesIcon className="w-full"/>
                </IconButton>
            </Tooltip>
            :
            <Tooltip content="Anggaran Realisasi">
                <IconButton color="green" size="sm" className="cursor-default">
                    <BanknotesIcon className="w-full"/>
                </IconButton>
            </Tooltip>
        }
        </div>
    )
}

export default function TableEvent(){
    const [events, setEvents] = useState(false)
    const [columnFilters, setColumnFilters] = useState([])

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue(),
            filterFn: 'includesString'
        }),
        columnHelper.accessor('name', {
            header: <span>Nama Event</span>,
            cell: info => info.getValue(),
            filterFn: 'includesString'
        }),
        columnHelper.accessor(row => row.proposal.event_category, {
            id: 'event_category',
            header: <span>Kategori</span>,
            cell: info => info.getValue(),
            filterFn: 'equalsString',
        }),
        columnHelper.accessor(row => row.proposal.kursus.lengkap, {
            id: 'course',
            header: <span>Kursus</span>,
            cell: info => info.getValue(),
            filterFn: 'arrIncludesSome'
        }),
        columnHelper.accessor(row => row.start_date, {            
            id:'end_date',
            header: <span>Tanggal Mulai</span>,
            cell: info => changeToIndonesiaDateTime(info.getValue(), true),
            filterFn: 'DateCustomFilter'
        }),
        columnHelper.accessor(row => row.start_date, {
            id:'start_date',            
            header: <span>Tanggal Selesai</span>,
            cell: info => changeToIndonesiaDateTime(info.getValue(), true),
            filterFn: 'DateCustomFilter'
        }),
        columnHelper.accessor(row => row, {
            id: 'participants',
            header: <span>Partisipan</span>,
            cell: info => info.getValue().participant_number_type == 'DYNAMIC' ? info.getValue().participants.length : info.getValue().participant_number,
            filterFn: 'includesString'
        }),
        columnHelper.accessor(row => row, {            
            id: 'status',
            header: <span>Status</span>,
            cell: info => <CompleteStatus isComplete={info.getValue().isComplete} defaultPrices={info.getValue().defaultPrices}/>,
            filterFn: 'StatusFilter'
        }),
        columnHelper.accessor(row => row, {
            id: 'action',
            header: <span>Opsi</span>,
            cell: info => <OptionButtons id={info.getValue().id} name={info.getValue().name}/>,
            filterFn: 'UserFilter'
        }),
    ]

    const table = useReactTable({
        data: events,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            columnFilters: columnFilters
        },
        filterFns: {
            DateCustomFilter: (row, columnID, filterValue) => {
                const start = filterValue?.start != null && filterValue?.start != "" ? filterValue.start : null
                const end = filterValue?.end != null && filterValue?.end != "" ? filterValue.end : null
                if(start && end) return start <= row.original.start_date && end >= row.original.start_date
                else if(start) return start <= row.original.start_date
                else if(end) return end >= row.original.start_date                
                else return true
            },
            StatusFilter: (row, columnID, filterValue) => {
                if(filterValue?.length == 0 || filterValue == "") return true 
                var status = []
                if(row.original.isComplete) status.push(0)
                else status.push(1)
                if(row.original.defaultPrices) status.push(6)
                else status.push(7)

                var flag = true
                filterValue.forEach(value => {
                    if( ! status.includes(value) ){
                        flag = false
                    }
                })

                return flag
            },
            UserFilter: (row, columnID, filterValue) => {
                if(filterValue.length == 0) return true
                return filterValue.includes(row.original.assign_to)
            }
        }
    })
    
    useEffect(() => {
        axios.get('/api/get/events').then(function(response) {
            setEvents(response.data.events)
        })
    }, [])

    return(
        <div>
            {
                events ? 
                <>
                    <FiltersTable table={table}/>
                    <TanstackTable table={table} alignTable="table-auto" className="text-sm"/>
                </>
                :
                <div className="flex justify-center">
                    <LoadingCircle />
                </div>
            }
        </div>
    )
}