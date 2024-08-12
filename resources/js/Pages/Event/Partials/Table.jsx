import DialogDelete from "@/Components/Dialogs/DialogDelete";
import Dropdown from "@/Components/DropdownOptions";
import OptionButton from "@/Components/OptionButton";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";
import { Link } from "@inertiajs/react";

const LinkEvent = ({children, className='', id}) => {
    return(
        <Link className={"cursor-pointer "+className} href={route('event.show', [id])}>
            {children}
        </Link>
    )
}

export default function TableEvent({events}){
    const columns = [
        "ID", "NAMA EVENT", "KATEGORI", "KURSUS", "TANGGAL MULAI", "TANGGAL SELESAI", "PARTISIPAN", "BIAYA PEND", "BIAYA AKOM", "OPSI"
    ];

    return(
        <div className="table w-full mt-2">
            <div className="table-header-group bg-red-600 text-sm text-center">
                <div className="table-row">
                    {
                        columns.map((column) => (
                            <div className="table-cell p-4 text-white text-bold align-middle"> 
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
                        const options = [
                            {name: "Edit", route: route('event.edit', [event.id])},
                            {name: "Delete", route: route('event.destroy', [event.id])}
                        ]
                        const dateoptions = {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }
                        return (
                            <div className="table-row hover:bg-gray-100" key={event.id} id={event.id}>
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {event.id}
                                </LinkEvent>
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {event.name}
                                </LinkEvent>
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {event.proposal.event_category}
                                </LinkEvent>
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {event.proposal.kursus.lengkap}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-36"} id={event.id}>
                                    {new Date(event.start_date).toLocaleDateString('id', dateoptions)}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-36"} id={event.id}>
                                    {new Date(event.end_date).toLocaleDateString('id', dateoptions)}
                                </LinkEvent>
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {event.participant_number}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + "w-28"} id={event.id}>
                                    {"Rp "+ Number(event.prices.training_price).toLocaleString()}
                                </LinkEvent>
                                <LinkEvent className={cellClassName + " w-28"} id={event.id}>
                                    {"Rp "+ Number(event.prices.accomodation_price).toLocaleString()}
                                </LinkEvent>
                                <div className={cellClassName}>
                                    <div className="flex flex-row gap-3 justify-center">
                                        <OptionButton 
                                            link={route('event.edit', [event.id])}
                                            tip="Edit Event"
                                        >
                                            <Cog8ToothIcon className="w-5"/>
                                        </OptionButton>
                                        <DialogDelete 
                                            content={'event'}
                                            title={"Hapus Event " + event.name + " ?"}
                                            message={"Event yang akan dihapus tidak dapat dikembalikan."}
                                            route={route('event.destroy', [event.id])}
                                            buttonSize="sm"
                                            variant="text"
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