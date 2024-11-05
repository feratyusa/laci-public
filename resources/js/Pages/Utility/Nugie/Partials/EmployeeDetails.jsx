import TanstackTable from "@/Components/TanstackTable/TanstackTable";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";

export default function EmployeeDetails({empIn=[], empOut=[]}){
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('nip', {
            header: 'NIP',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('nama', {
            header: 'Nama',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('jabatan', {
            header: 'Jabatan',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('cabang', {
            header: 'Cabang',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('seksi', {
            header: 'Seksi',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('eselon', {
            header: 'Eselon',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('jobfam', {
            header: 'Jobfam',
            cell: info => info.getValue()
        }),
    ]

    const empInTable = useReactTable({
        data: empIn,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const empOutTable = useReactTable({
        data: empOut,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const tabClass = "p-3 bg-red-100 uppercase font-bold rounded-lg text-red-500 data-[hover]:bg-red-300 data-[hover]:text-white data-[selected]:bg-red-500 data-[selected]:text-white border-0 ring-0"
    console.log(empOut)

    return(
        <TabGroup>
            <TabList className={'grid grid-cols-2 gap-2 mb-5'}>
                <Tab className={tabClass}>Sudah</Tab>
                <Tab className={tabClass}>Belum</Tab>
            </TabList>
            <TabPanels>
                <TabPanel>
                    <TanstackTable table={empInTable} alignTable="table-auto"/>
                </TabPanel>
                <TabPanel>
                    <TanstackTable table={empOutTable} alignTable="table-auto"/>
                </TabPanel>
            </TabPanels>
        </TabGroup>        
    )
}