import { Chip, Typography } from "@material-tailwind/react";
import { Cog8ToothIcon } from "@heroicons/react/24/solid";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import DialogAddFile from "@/Components/Dialogs/DialogAddFile";
import { Link } from "@inertiajs/react";
import { useState } from "react";

function TableRow({name, value=null, color="red", option=null, link=null}){    
    return(
        <div className="table-row">
            <div className={"table-cell border-b-2 py-4 w-60"}>
                <Typography variant="h6">
                    {name}
                </Typography>
            </div>
            <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                {
                    option == "chip" ?
                    <Chip 
                        className="w-fit"
                        color={color}
                        value={value}
                    /> : option == "link" ?
                    <Link href={link} className="underline hover:text-red-900 hover:underline">
                        <Typography color="blue" variant="h6" className="hover:text-red-900">
                            {"["+value.id+"] "+value.name+" ("+value.entry_date+")"}
                        </Typography>        
                    </Link> :
                    <Typography variant="h6">
                        {value}
                    </Typography>
                }
            </div>
        </div>
    )
}

export default function EventDetails({event, categories, proposalRoute}){
    const [color, ] = useState(event.participant_number_type === "DYNAMIC" ? 'purple' : 'teal')
    const dateoptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return(
        <div className="table w-full p-2 mb-5">
            <div className="table-row-group">
                <TableRow name={"ID Event"} value={event.id} />
                <TableRow name={"Nama Event"} value={event.name} />
                <TableRow name={"Proposal"} option={'link'} link={proposalRoute} value={event.proposal} />
                <TableRow name={"Kategori"} value={event.proposal.event_category}  />
                <TableRow name={"Kode Kursus"} value={`(${event.proposal.kd_kursus}) ${event.proposal.kursus.lengkap}`}  />
                <TableRow name={"Tanggal Mulai"} value={new Date(event.start_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Tanggal Selesai"} value={new Date(event.end_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Tipe Jumlah Partisipan"} value={event.participant_number_type} option={'chip'} color={color}/>
                <TableRow name={"Jumlah Partisipan"} value={event.participant_number} />
                <TableRow name={"Harga Per Kepala"} value={`Rp ${Number(event.price_per_person).toLocaleString()}`} />
                <TableRow name={"Tanggal Dibuat"} value={new Date(event.created_at).toLocaleTimeString('id', dateoptions)} />
                <TableRow name={"Tanggal Diupdate"} value={new Date(event.created_at).toLocaleTimeString('id', dateoptions)}/>
                <div className="table-row">
                    <div className={"table-cell border-b-2 py-4 w-60"}>
                        <Typography variant="h6">
                            Options
                        </Typography>
                    </div>
                    <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                        <div className="flex flex-row gap-5">
                            <DialogAddFile 
                                content={"event"} 
                                content_id={event.id} 
                                content_name={event.name} 
                                categories={categories} 
                                route={route('file.store')}
                            />
                            <OptionButton tip="Edit Proposal" link={route('event.edit', [event.id])} color="yellow" variant="filled">
                                <Cog8ToothIcon className="w-5"/>
                            </OptionButton>
                            <DialogDelete
                                key={event.id}
                                content="Event"
                                title={"Hapus Event?"}
                                message={"Event "+event.name+" akan dihapus. Event yang telah dihapus tidak dapat dikembalikan."}
                                route={route('event.destroy', [event.id])}
                            /> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}