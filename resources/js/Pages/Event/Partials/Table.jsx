import DialogDelete from "@/Components/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import { ArrowPathIcon, Cog8ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";
import { Chip, IconButton, Menu, MenuHandler, MenuItem, MenuList, Tooltip } from "@material-tailwind/react";
import Statuses from "@/Base/Statuses";

const LinkEvent = ({children, className='', id}) => {
    return(
        <Link className={"cursor-pointer "+className} href={route('event.show', [id])}>
            {children}
        </Link>
    )
}

export default function TableEvent({events}){
    const columns = [
        "ID", "NAMA EVENT", "KATEGORI", "TANGGAL MULAI", "TANGGAL SELESAI", "PARTISIPAN", "HARGA PER ORANG", "OPSI"
    ];

    return(
        <div className="table w-full mt-2">
            <div className="table-header-group bg-red-600 text-sm text-center">
                <div className="table-row">
                    {
                        columns.map((column, index) => (
                            <div className="table-cell p-4 text-white text-bold"> 
                                {column}
                            </div>  
                        ))
                    }
                </div>
            </div>
            <div className="table-row-group text-sm text-center">
                {                                    
                    events?.map((event, index) => {
                        const cellClassName = "table-cell border-y p-4 align-middle ";
                        const dateoptions = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }
                        return (
                            <div className="table-row hover:bg-gray-100" key={event.id} id={event.id}>
                                <LinkEvent className={cellClassName + "w-16"} id={event.id}>
                                    {event.id}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-72"} id={event.id}>
                                    {event.name}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-30"} id={event.id}>
                                    {event.event_category}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-60"} id={event.id}>
                                    {new Date(event.start_date).toLocaleDateString('id', dateoptions)}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-60"} id={event.id}>
                                    {new Date(event.end_date).toLocaleDateString('id', dateoptions)}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-20"} id={event.id}>
                                    {event.participant_number}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-60"} id={event.id}>
                                    {"Rp "+ Number(event.price_per_person).toLocaleString()}
                                </LinkEvent>
                                <div className={cellClassName+ "w-40"}>
                                    <div className="flex flex-row gap-3 justify-center">
                                        <OptionButton tip="Edit Proposal" color="yellow" link={route('event.edit', [event.id])} variant="filled">
                                            <Cog8ToothIcon className="h-5 w-5"/>
                                        </OptionButton>
                                        <DialogDelete 
                                            key={event.id}
                                            content="Event"
                                            title={"Hapus Event?"}
                                            variant="filled"
                                            message={"Event "+event.name+" akan dihapus. Event yang telah dihapus tidak dapat dikembalikan."}
                                            route={route('event.destroy', [event.id])}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}