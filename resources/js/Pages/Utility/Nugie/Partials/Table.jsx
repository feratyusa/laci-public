import { createColumnHelper } from "@tanstack/react-table";

function OptionButtons({id}){
    return(
        <div></div>
    )
}

export default function NugieTable({}){
    const columnHelpers = createColumnHelper()

    const columns = [
        columnHelpers.accessor('id', {
            header: <span>ID</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor('name', {
            header: <span>Nama</span>,
            cell: info => info.getValue()
        }),
        columnHelpers.accessor(row => row.id, {
            id: 'actions',
            header: <span>Aksi</span>,
            cell:
        })
    ]
}