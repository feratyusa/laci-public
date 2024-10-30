import DialogDelete from "@/Components/Dialogs/DialogDelete";
import { Link } from "@inertiajs/react";
import { CheckIcon, Cog8ToothIcon, EyeIcon } from "@heroicons/react/24/solid";
import { DropdownMenuOption } from "@/Components/DropdownOptions";
import { MenuItem } from "@headlessui/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactSelect from "react-select";
import { ArchiveBoxIcon, ArchiveBoxXMarkIcon, DocumentCheckIcon, ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ProposalStatus from "@/Base/ProposalStatus";
import LoadingCircle from "@/Components/Loading/LoadingCircle";

function FiltersTable({table=useReactTable({})}){
    const [courses, setCourses] = useState([])
    const [eventCategories, setEventCategories] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('/api/input/courses').then((response) => {
            setCourses(response.data.courses)
        })

        axios.get('/api/input/event-categories').then((response) => {
            setEventCategories(response.data.event_categories)
        })

        axios.get('/api/input/users').then((response) => {
            setUsers(response.data.users)
        })
    }, [])

    return(
        <div className="w-full">
            <p className="font-bold text-lg mb-1">Filter Usulan</p>
            <div className="grid grid-cols-4 items-center gap-5 mb-3">
                <div className="flex">                    
                    <input
                        className="rounded-md w-full"
                        id="id-usulan" 
                        placeholder="ID Usulan"
                        onChange={(e) => table.getColumn('id').setFilterValue(e.target.value)}                     
                    />
                </div>
                <div className="flex">
                    <input
                        className="rounded-md w-full"
                        id="name" 
                        placeholder="Nama Usulan"
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
                <p className="font-bold text-nowrap">Tanggal Masuk</p>
                <div className="flex items-center gap-2 w-full">
                    <p>Dari</p>
                    <input
                        type="date"
                        placeholder="Tanggal Masuk"
                        className="rounded-md w-full"
                        onChange={(e) => table.getColumn('entry_date').setFilterValue({...table.getColumn('entry_date').getFilterValue(), start: e.target.value})}
                    />
                </div>
                <div className="flex items-center gap-2 w-full">
                    <p>Sampai</p>
                    <input 
                        type="date"
                        className="rounded-md w-full"
                        onChange={(e) => table.getColumn('entry_date').setFilterValue({...table.getColumn('entry_date').getFilterValue(), end: e.target.value})}
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
                        options={ProposalStatus}
                        placeholder="Status"
                        classNamePrefix="select2-selection"
                        className="z-10"
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

function OptionButtons({proposal_id, proposal_name}){
    return(
        <div className="flex justify-center items-center gap-3">
            <Link href={route('proposal.show', [proposal_id])}>
                <IconButton size="sm" color="blue" className="rounded-full">
                    <EyeIcon className="w-full"/>
                </IconButton>
            </Link>
            <DropdownMenuOption>
                <MenuItem>
                    <Link href={route('proposal.edit', [proposal_id])} className="block p-2 data-[focus]:bg-amber-100">
                        <div className="flex items-center gap-2 text-amber-500">
                            <Cog8ToothIcon className="w-5"/>
                            Edit Usulan
                        </div>
                    </Link>   
                </MenuItem>
                <MenuItem>
                    <DialogDelete mode="text" route={route('proposal.destroy', [proposal_id])} content={'event'} title={'Hapus Usulan'} message={`Yakin ingin menghapus (${proposal_name})? Usulan yang telah dihapus tidak dapat dikembalikan`}/>  
                </MenuItem>
            </DropdownMenuOption>
        </div>
    )
}

function CompleteStatus({isComplete, haveEvents, isEventsComplete}){
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
            haveEvents ? 
            <Tooltip content="Punya Event">
                <IconButton color="green" size="sm">
                    <DocumentCheckIcon className="w-full"/>
                </IconButton>
            </Tooltip>
            :
            <Tooltip content="Belum Punya Event">
                <IconButton color="amber" size="sm">
                    <ExclamationTriangleIcon className="w-full"/>
                </IconButton>
            </Tooltip>
        }
        {
            isEventsComplete ? 
            <Tooltip content="Berkas Event Lengkap">
                <IconButton color="green" size="sm">
                    <ArchiveBoxIcon className="w-full"/>
                </IconButton>
            </Tooltip>
            :
            <Tooltip content="Berkas Event Belum Lengkap">
                <IconButton color="amber" size="sm">
                    <ArchiveBoxXMarkIcon className="w-full"/>
                </IconButton>
            </Tooltip>
        }
        </div>
    )
}

export default function TableProposal(){
    const [proposals, setProposals] = useState(false)

    const [columnFilters, setColumnFilters] = useState([])

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue(),
            filterFn: 'includesString'
        }),
        columnHelper.accessor('name', {
            header: <span>Nama Usulan</span>,
            cell: info => info.getValue(),
            filterFn: 'includesString'
        }),
        columnHelper.accessor(row => row.event_category, {
            id: 'event_category',
            header: <span>Kategori</span>,
            cell: info => info.getValue(),
            filterFn: 'equalsString',
        }),
        columnHelper.accessor(row => row.kursus.lengkap, {
            id: 'course',
            header: <span>Kursus</span>,
            cell: info => info.getValue(),
            filterFn: 'arrIncludesSome'
        }),
        columnHelper.accessor('entry_date', {            
            header: <span>Tanggal Masuk</span>,
            cell: info => changeToIndonesiaDateTime(info.getValue(), true),
            filterFn: 'DateCustomFilter'
        }),
        columnHelper.accessor(row => row, {            
            id: 'status',
            header: <span>Status</span>,
            cell: info => <CompleteStatus isComplete={info.getValue().isComplete} haveEvents={info.getValue().haveEvents} isEventsComplete={info.getValue().isEventsComplete}/>,
            filterFn: 'StatusFilter'
        }),
        columnHelper.accessor(row => row, {
            id: 'action',
            header: <span>Opsi</span>,
            cell: info => <OptionButtons proposal_id={info.getValue().id} proposal_name={info.getValue().name}/>,
            filterFn: 'UserFilter'
        }),
    ]

    const table = useReactTable({
        data: proposals,
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
                if(start && end) return filterValue.start <= row.original.entry_date && filterValue.end >= row.original.entry_date
                else if(start) return filterValue.start <= row.original.entry_date
                else return filterValue.end <= row.original.entry_date                
            },
            StatusFilter: (row, columnID, filterValue) => {
                if(filterValue?.length == 0 || filterValue == "") return true 
                var status = []
                if(row.original.isComplete) status.push(0)
                else status.push(1)
                if(row.original.haveEvents) status.push(2)
                else status.push(3)
                if(row.original.isEventsComplete) status.push(4)
                else status.push(5)
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
        axios.get('/api/get/proposals').then(function(response) {
            setProposals(response.data.proposals)
        })
    }, [])

    return(
        <>
            {
                proposals ?
                <>
                    <div className="m-3">
                        <FiltersTable table={table}/>
                    </div>
                    <TanstackTable table={table} alignTable="table-auto" className="text-sm" nowraps={['entry_date']}/>
                </>
                :
                <div className="flex justify-center">
                    <LoadingCircle />
                </div>
            }
        </>
    )
}