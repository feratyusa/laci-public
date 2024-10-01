import { ArrowDownIcon, ChevronDownIcon } from "@heroicons/react/24/outline"
import { IconButton, Tooltip } from "@material-tailwind/react"
import { createColumnHelper } from "@tanstack/react-table"
import { useState } from "react"

function PricesTable({event}){
    const [open, setOpen] = useState(false)
    return(
        <>
            <tr className="border-2 border-blue-500">
                <td className="p-3">{event.id}</td>
                <td>{event.name}</td>
                <td>{event.total_participants}</td>
                <td>{`Rp ${Number(event.total_price).toLocaleString()}`}</td>
                <td>
                    <Tooltip content="Detail Biaya">
                        <IconButton size="sm" color="blue" variant="text" onClick={() => setOpen(!open)}>
                            <ChevronDownIcon className={`w-full transition-full duration-300 ${open ? 'rotate-180' : ''}`}/>
                        </IconButton>
                    </Tooltip>
                </td>
            </tr>
            <tr>
                <td colSpan={5} className={`${!open ? 'hidden' : ''} p-3`}>
                    <table className="table-auto w-full text-center border-2 border-amber-500 mb-5">
                        <thead>
                            <tr className="bg-amber-500 text-white">
                                <th className="p-3">Tipe Anggaran</th>
                                <th>Biaya</th>
                                <th>Jumlah</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                event.prices.map(price => (
                                    <tr className="border-b-2 border-amber-500">
                                        <td className="p-3">{price?.budget_type?.name}</td>
                                        <td>{`Rp ${Number(price.price).toLocaleString()}`}</td>
                                        <td>{price.defaultParticipants == '1' ? event.participants.length : price.participantNum}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    )
}

function EventsTable({events=[]}){

    return(
        <div className="p-5">
            <table className="table-auto w-full text-center border-2 border-blue-500">
                <thead>
                    <tr className="bg-blue-500 text-white ">
                        <th className="p-3">ID</th>
                        <th>Nama</th>
                        <th>Partisipan</th>
                        <th>Total Biaya</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.map(event => (
                            <PricesTable event={event}/>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

function Totals({totalPrice, totalParticipants}){
    return(
        <>
            <div className="flex items-center border-2 bg-gray-100 rounded-lg w-fit overflow-hidden">
                <div className="p-3">
                    <p className="font-bold">Total Partisipan</p>
                </div>
                <div className="bg-red-500 p-3 text-white">
                    <p className="font-extrabold text-lg">{totalParticipants.inHouse + totalParticipants.public}</p>
                </div>
            </div>
            <div className="flex items-center border-2 bg-gray-100 rounded-lg w-fit overflow-hidden">
                <div className="p-3">
                    <p className="font-bold">Total Biaya</p>
                </div>
                <div className="bg-red-500 p-3 text-white">
                    <p className="font-extrabold text-lg">{`Rp ${Number(totalPrice.inHouse + totalPrice.public).toLocaleString()}`}</p>
                </div>
            </div>
        </>
    )
}

export default function ReportTable({    
    publics=[],
    inHouses=[],
    totalPrice=[],
    totalParticipants=[],
}){    
    return(
        <>
            <table className="table-auto text-center w-full mb-5 border-2 border-red-500">
                <thead>
                    <tr className="bg-red-500 text-white">
                        <th className="p-3">Jenis Pelatihan</th>
                        <th>Total Partisipan</th>
                        <th>Total Biaya</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-gray-200">
                        <td className="p-3">In House Training</td>
                        <td>{totalParticipants?.inHouse}</td>
                        <td>{`Rp ${Number(totalPrice?.inHouse).toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <EventsTable events={inHouses}/>
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="p-3">Public Training</td>
                        <td>{totalParticipants?.public}</td>
                        <td>{`Rp ${Number(totalPrice?.public).toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <EventsTable events={publics}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex w-full items-center justify-center gap-10">
                <Totals totalPrice={totalPrice} totalParticipants={totalParticipants}/>
            </div>
        </>
    )
}