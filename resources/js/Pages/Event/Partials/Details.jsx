import { Chip, IconButton, Tooltip, Typography } from "@material-tailwind/react";
import { ArrowPathIcon, Cog8ToothIcon } from "@heroicons/react/24/solid";
import DialogDelete from "@/Components/Dialogs/DialogDelete";
import OptionButton from "@/Components/OptionButton";
import DialogAddFile from "@/Components/Dialogs/DialogAddFile";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import EventPriceDetail from "./EventPriceDetail";
import { useEffect } from "react";

function TableRow({name, value=null, color="red", option=null, link=null}){    
    return(
        <tr className="">
            <td className={"border-b-2 py-3 max-w-60"}>
                <p className="font-bold">{name}</p>
            </td>
            <td className={"border-b-2 pl-5 bg-gray-50"}>
                {
                    option == 'price' ?
                    <EventPriceDetail event={value} details={value.prices}/>
                    :
                    option == "chip" ?
                    <Chip 
                        className="w-fit"
                        color={color}
                        value={value}
                    /> 
                    : 
                    option == "link" ?
                    <Link href={link} className="underline hover:text-red-900 hover:underline">
                        <p className="text-blue-500 hover:text-red-500">{"["+value.id+"] "+value.name+" ("+value.entry_date+")"}</p>      
                    </Link> 
                    :
                    option == 'number_type' ?
                    <div className="flex items-center gap-3">
                        <Chip 
                            className="w-fit"
                            color={color}
                            value={value}
                        /> 
                        <Tooltip content="Ganti Tipe">
                            <Link href={link} method="put" as="div">
                                <IconButton color="green" size="sm" variant="text">
                                    <ArrowPathIcon className="w-full"/>
                                </IconButton>
                            </Link>
                        </Tooltip>
                    </div>
                    :
                    <p className="">{value}</p>
                }
            </td>
        </tr>
    )
}

export default function EventDetails({event, categories, proposalRoute}){
    const [color, ] = useState(event.participant_number_type == "DYNAMIC" ? 'purple' : 'teal')
    const dateoptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }

    return(
        <table className="table-auto w-full p-2 mb-5">
            <tbody className="">
                <TableRow name={"ID Event"} value={event.id} />
                <TableRow name={"Nama Event"} value={event.name} />
                <TableRow name={"Proposal"} option={'link'} link={proposalRoute} value={event.proposal} />
                <TableRow name={"Kategori"} value={event.proposal.event_category} />
                <TableRow name={"Kode Kursus"} value={`(${event.proposal.kd_kursus}) ${event.proposal.kursus.lengkap}`}  />
                <TableRow name={"Tanggal Mulai"} value={new Date(event.start_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Tanggal Selesai"} value={new Date(event.end_date).toLocaleDateString('id', dateoptions)}  />
                <TableRow name={"Anggaran"} option={'price'} value={event}/>
                <TableRow name={"Tipe Jumlah Partisipan"} value={event.participant_number_type} option={'number_type'} color={color} link={route('event.number-type', [event.id])}/>
                <TableRow name={"Jumlah Partisipan"} value={event.participant_number_type == 'FIXED' ? event.participant_number : event.participants.length} />
                <TableRow name={"Total Anggaran"} value={`Rp ${Number(event?.total_prices).toLocaleString()}` ?? 0} />
                <TableRow name={"Dibuat Oleh"} value={event.created_by ?? 'NULL'} />
                <TableRow name={"Assign Kepada"} value={event.assign_to ?? 'NULL'} />
                <TableRow name={"Lokasi"} value={event?.location?.name ?? 'NULL'} />
                <TableRow name={"Tanggal Dibuat"} value={new Date(event.created_at).toLocaleTimeString('id', dateoptions)} />
                <TableRow name={"Tanggal Diupdate"} value={new Date(event.updated_at).toLocaleTimeString('id', dateoptions)}/>
                <div className="table-row">
                    <div className={"table-cell border-b-2 py-4"}>
                        <Typography variant="h6">
                            Options
                        </Typography>
                    </div>
                    <div className={"table-cell border-b-2 py-4 pl-10 bg-gray-50"}>
                        <div className="flex flex-row gap-5">
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
            </tbody>
        </table>
    )
}