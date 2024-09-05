import { flexRender, useReactTable } from "@tanstack/react-table"
import { IconButton } from "@material-tailwind/react"
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"

function Paginator({table=useReactTable({})}){
    return(
        <div className="grid grid-rows-2 gap-2">
            <div className="grid grid-cols-5 mx-auto items-center w-fit">
                <div>
                    <IconButton variant="text" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
                        <ChevronDoubleLeftIcon className="w-full"/>
                    </IconButton>
                </div>
                <div>
                    <IconButton variant="text" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <ChevronLeftIcon className="w-full"/>
                    </IconButton>
                </div>
                <div>
                    <p>{table.getState().pagination.pageIndex + 1} dari {table.getPageCount()}</p>
                </div>
                <div>
                    <IconButton variant="text" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <ChevronRightIcon className="w-full"/>
                    </IconButton>
                </div>
                <div>
                    <IconButton variant="text" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                        <ChevronDoubleRightIcon className="w-full"/>
                    </IconButton>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-2 mx-auto items-center w-fit">
                <div className="col-span-1">
                    <p>Go to</p>
                </div>
                <div className="col-span-2">
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const pageIndex = e.target.value ? Number(e.target.value)-1 : 0
                            table.setPageIndex(pageIndex)
                        }}
                        className="w-24 rounded-md"
                    />
                </div>
                <div className="col-span-2">
                    <select
                        defaultValue={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        className="w-fit"
                    >
                        {[10,20,30,40,50].map(pageSize => (
                            <option value={pageSize}>{pageSize}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

function ShowingCurrent({rowCount, pageIndex: n, pageSize: b}){
    const upperCurrentPage = 1 + (n)*b
    const tempLower = b * (n+1)
    const lowerCurrentPge = rowCount > tempLower ? tempLower : rowCount
    const showingRowCountString = `Menampilkan ${upperCurrentPage} - ${lowerCurrentPge} dari ${rowCount}`
    return(
        rowCount ? <p className="text-sm">{showingRowCountString}</p> : ''
    )
}

function BodyCellComponent({key, children, ...props}){
    return <td key={key} className="p-3" {...props}>{children}</td>
}

function RowComponent({key, children}){
    return <tr key={key} className="border-b-2 border-red-100 hover:bg-gray-200 cursor-default">{children}</tr>
}

function HeaderComponent({key, children}){
    return (
        <tr key={key} className="bg-red-500 text-white font-bold">
            {children}
        </tr>
    )
}

export default function TanstackTable({table=useReactTable({}), className=""}){
    return(
        <table className={"table-fixed w-full text-center " + className}>
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <HeaderComponent key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <BodyCellComponent key={header.id}>
                                <div
                                    className={`
                                        flex items-center justify-center gap-2 ${header.column.getCanSort() ? 'cursor-pointer select-none' : ''}
                                    `}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {header.isPlaceholder 
                                        ? null 
                                        : flexRender(
                                            header.column.columnDef.header, header.getContext()
                                    )}
                                    {
                                        header.column.getCanSort() ? 
                                            header.column.getIsSorted() == 'asc' ? <ChevronDownIcon className="w-5"/>
                                                : header.column.getIsSorted() == 'desc' ? <ChevronUpIcon className="w-5"/>
                                                :  <ChevronUpDownIcon className="w-5"/>
                                            : ''
                                    }
                                </div>
                            </BodyCellComponent>
                        ))}
                    </HeaderComponent>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.length == 0 ? 
                    <RowComponent>
                        <BodyCellComponent colSpan={table.getAllColumns().length}>
                            Kosong
                        </BodyCellComponent>
                    </RowComponent>
                : table.getRowModel().rows.map(row => (
                    <RowComponent key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <BodyCellComponent key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </BodyCellComponent>
                        ))}
                    </RowComponent>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    {
                        table.options.getPaginationRowModel !== undefined && table.getRowCount() > 0?
                        <td colSpan={table.getAllColumns().length} className="py-3">
                            <ShowingCurrent rowCount={table.getRowCount()} pageIndex={table.getState().pagination.pageIndex} pageSize={table.getState().pagination.pageSize}/>
                            <Paginator table={table}/>
                        </td>
                        : ''
                    }
                </tr>
            </tfoot>
        </table>
    )
}