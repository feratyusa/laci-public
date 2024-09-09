import DialogDelete from "@/Components/Dialogs/DialogDelete";
import { DropdownMenuOption } from "@/Components/DropdownOptions";
import OptionButton from "@/Components/OptionButton";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Cog8ToothIcon, EllipsisVerticalIcon, EyeIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { IconButton } from "@material-tailwind/react";

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
        <div className="table table-auto w-full mt-2">
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
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {new Date(event.start_date).toLocaleDateString('id', dateoptions)}
                                </LinkEvent>
                                <LinkEvent className={cellClassName } id={event.id}>
                                    {new Date(event.end_date).toLocaleDateString('id', dateoptions)}
                                </LinkEvent>
                                <LinkEvent className={cellClassName} id={event.id}>
                                    {event.participant_number_type == 'DYNAMIC' ? event.participants.length : event.participant_number}
                                </LinkEvent>
                                <LinkEvent className={cellClassName } id={event.id}>
                                    {"Rp "+ Number(event.prices.training_price).toLocaleString()}
                                </LinkEvent>
                                <LinkEvent className={cellClassName } id={event.id}>
                                    {"Rp "+ Number(event.prices.accomodation_price).toLocaleString()}
                                </LinkEvent>
                                <div className={cellClassName}>
                                    <DropdownMenuOption>
                                        <MenuItem>
                                            <Link href={route('event.show', [event.id])} className="block p-2 data-[focus]:bg-blue-100">
                                                <div className="flex items-center gap-2 text-blue-500">
                                                    <EyeIcon className="w-5"/>
                                                    Lihat Event
                                                </div>
                                            </Link>   
                                        </MenuItem>
                                        <MenuItem>
                                            <Link href={route('event.edit', [event.id])} className="block p-2 data-[focus]:bg-amber-100">
                                                <div className="flex items-center gap-2 text-amber-500">
                                                    <Cog8ToothIcon className="w-5"/>
                                                    Edit Event
                                                </div>
                                            </Link>   
                                        </MenuItem>
                                        <MenuItem>
                                            <DialogDelete mode="text" route={route('event.destroy', [event.id])} content={'event'} title={'Hapus Event'} message={`Yakin ingin menghapus (${event.name})? Event yang telah dihapus tidak dapat dikembalikan`}/>  
                                        </MenuItem>
                                    </DropdownMenuOption>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}