import HeaderTitle from "@/Components/HeaderTitle";
import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { Card, CardBody } from "@material-tailwind/react";
import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import BudgetFormDialog from "./Partials/BudgetFormDialog";
import DetailsFormDialog from "./Partials/DetailsFormDialog";
import BudgetDetailShow from "./Partials/BudgetDetailShow";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import BudgetTypeFormDialog from "./Partials/BudgetTypeFormDialog";
import DeleteDialog from "../Partials/DeleteDialog";

function ActionButtons({budget, type='budget'}){
    console.log(budget)
    return(
        type == 'budgetType' ?
        <div className="flex items-center gap-2 justify-center">
            <BudgetTypeFormDialog budgetType={budget} mode="edit" route={route('budgetType.update', [budget.id])}/>
            <DeleteDialog route={route('budgetType.destroy', [budget.id])} category={budget} title={"Hapus Tipe Anggaran?"} body={`Tipe anggaran ${budget.name} akan dihapus`}/>
        </div>
        :
        <div className="flex items-center gap-2 justify-center">
            <BudgetDetailShow budget={budget}/>
            <BudgetFormDialog mode="edit" route={route('budget.update', [budget.id])} budget={budget}/>
            <DetailsFormDialog budget={budget} details={budget.details}/>
            <DeleteDialog route={route('budget.destroy', [budget.id])} category={budget} title={`Hapus Anggaran?`} body={`Tahun anggaran ${budget.year} akan dihapus`}/>
        </div>
    )
}

function TanstackBudgetTable({budgets}){
    const [columnFilters, setColumnFilters] = useState([])

    function handleFilters(value){
        setColumnFilters([
            {id: 'year', value: value},
        ])
    }

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor(row => row.year, {
            id: 'year',
            cell: info => info.getValue(),
            header: () => <span>Tahun</span>,
            footer: info => info.column.id,
            enableColumnFilter: true,
            filterFn: 'CustomFilter', 
        }),
        // columnHelper.accessor(row => row.value, {
        //     id: 'value',
        //     header: () => <span>Anggaran</span>,
        //     cell: info => `Rp ${Number(info.getValue()).toLocaleString()}`,
        //     footer: info => info.column.id,
        // }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: info => <ActionButtons budget={budgets.find(b => b.id == info.getValue())} />,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: budgets,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        enableColumnFilters: true,
        state: {
            columnFilters,
        },
        filterFns: {
            CustomFilter: (rows, columnId, filterValue) => {
                return String(rows.getValue('year')).includes(filterValue)
            }
        }
    })

    return(
        <>
            <div className="grid grid-cols-8 mb-2">
                <div className="col-span-6">
                    <BudgetFormDialog variant="text" route={route('budget.store')}/>
                </div>
                <div className="col-span-2">
                    <input
                        className="rounded-md"                    
                        onChange={(e) => handleFilters(e.target.value)}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <TanstackTable table={table}/>
        </>
    )
}

function TanstackBudgetTypeTable({budgetTypes}){
    const [globalFilter, setGlobalFilter] = useState([])    

    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('id', {
            header: () => <span>ID</span>,
            cell: info => info.getValue(),            
        }),
        columnHelper.accessor('name', {
            header: () => <span>Nama</span>,
            cell: info => info.getValue(),              
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: info => <ActionButtons budget={budgetTypes.find(b => b.id == info.getValue())} type="budgetType"/>,
            enableSorting: false,
            enableGlobalFilter: false,
        })
    ]

    const table = useReactTable({
        data: budgetTypes,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),        
        globalFilterFn: 'includesString',        
        state: {
            globalFilter: globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter        
    })

    return(
        <>
            <div className="grid grid-cols-8 mb-2">
                <div className="col-span-6">
                    <BudgetTypeFormDialog mode='create' route={route('budgetType.store')} variant="text"/>
                </div>
                <div className="col-span-2">
                    <input
                        className="rounded-md"                    
                        onChange={(e) => table.setGlobalFilter(String(e.target.value))}
                        placeholder="Search..."
                    />
                </div>
            </div>
            <TanstackTable table={table}/>
        </>
    )
}

function BudgetTabs({budgets, budgetTypes}){
    const tabClass = "flex items-center justify-center p-4 text-red-500 hover:bg-red-500 hover:text-white ring-0 border-0"
    const [selectedIndex, setSelectedIndex] = useState(0)

    return(
        <TabGroup 
            defaultIndex={selectedIndex} selectedIndex={selectedIndex} onChange={(index) => setSelectedIndex(index)}>
            <TabList className="grid grid-cols-2">
                <Tab className={`rounded-tl-md ${tabClass} ${selectedIndex == 0 ? "bg-red-100" : ""}`}>
                    <p className="font-extrabold text-lg uppercase">Anggaran</p>
                </Tab>
                <Tab className={`rounded-tr-md ${tabClass} ${selectedIndex == 1 ? "bg-red-100" : ""}`}>
                <p className="font-extrabold text-lg uppercase">Tipe Anggaran</p>
                </Tab>
            </TabList>
            <TabPanels className={"p-5"}>
                <TabPanel>
                    <TanstackBudgetTable budgets={budgets} />
                </TabPanel>
                <TabPanel>
                    <TanstackBudgetTypeTable budgetTypes={budgetTypes} />
                </TabPanel>
            </TabPanels>
        </TabGroup>
    )
}

export default function Index({auth, budgets=[], budgetTypes=[]}){    
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={"Anggaran"}/>}
        >
            <Head title="Anggaran"/>

            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                            <BanknotesIcon className="w-8"/>
                        <p className="text-2xl font-bold">Master Anggaran</p>
                    </div>
                    <BudgetTabs budgets={budgets} budgetTypes={budgetTypes}/>
                </CardBody>
            </Card>

        </Authenticated>
    )
}