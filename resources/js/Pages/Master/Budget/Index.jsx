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

function ActionButtons({budget}){
    return(
        <div className="flex items-center gap-2 justify-center">
            <BudgetDetailShow budget={budget}/>
            <BudgetFormDialog mode="edit" route={route('budget.update', [budget.id])} budget={budget}/>
            <DetailsFormDialog budget={budget} details={budget.details}/>
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
        columnHelper.accessor(row => row.value, {
            id: 'value',
            header: () => <span>Anggaran</span>,
            cell: info => `Rp ${Number(info.getValue()).toLocaleString()}`,
            footer: info => info.column.id,
        }),
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

export default function Index({auth, budgets}){    
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
                    <TanstackBudgetTable budgets={budgets} />
                </CardBody>
            </Card>

        </Authenticated>
    )
}