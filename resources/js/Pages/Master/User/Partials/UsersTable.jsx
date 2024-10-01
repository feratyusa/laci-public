import { createColumnHelper, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { data } from "autoprefixer";

function ActionButtons({category}){
    return(
        <div className="flex justify-center items-center gap-2">
            <FormDialog mode="edit" category={category} route={route('category.update', [category.id])}/>
            <DeleteDialog route={route('category.destroy', [category.id])} category={category}/>
        </div>
    )
}


export default function UsersTable({users=[]}){
    const [globalFilter, setGlobalFilter] = useState()
    
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('username', {
            header: <span>Username</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('name', {
            header: <span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelper.accessor('created_at', {
            header: <span>Created At</span>,
            cell: info => info.getValue(),
            enableGlobalFilter: false,
        }),
        columnHelper.accessor('updated_at', {
            header: <span>Updated At</span>,
            cell: info => info.getValue(),
            enableGlobalFilter: false,
        }),
        columnHelper.accessor(row => row.id, {
            id: 'actions',
            header: () => 'Actions',
            cell: info => <ActionButtons category={categories.find(c => c.id === info.getValue())} />,
            enableSorting: false,
        })
    ]

    const table = useReactTable({
        data: categories,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter: globalFilter
        },        
    })
}