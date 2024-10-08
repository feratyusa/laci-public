import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { Chip, IconButton, Tooltip } from "@material-tailwind/react"
import { useState } from "react"

function PricesTable({event}){
    const [open, setOpen] = useState(false)
    return(
        <>
            <tr className="border-2 border-blue-500">
                <td className="p-3">{event.id}</td>
                <td>
                    <a href={route('event.show', [event.id])} target="_blank">
                        <p className="underline text-blue-500">{event.name}</p>
                    </a>
                </td>
                <td>
                    <Chip 
                        color={event.defaultPrices ? 'red' : 'green'}
                        value={event.defaultPrices ? 'Anggaran Awal' : 'Anggaran Realisasi'}
                    />                    
                </td>
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
                <td colSpan={6} className={`${!open ? 'hidden' : ''} p-3`}>
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

function EventsTable({events=[], mode}){
    return(
        <div className="p-5">
            <table className="table-auto w-full text-center border-2 border-blue-500">
                <thead>
                    <tr className="bg-blue-500 text-white ">
                        <th className="p-3">ID</th>
                        <th>Nama Event</th>
                        <th>Status Anggaran</th>
                        <th>Partisipan</th>
                        <th>Total Biaya</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        events.length == 0 ?
                        <td colSpan={4}>
                            <p className="text-lg my-2 text-center">Kosong</p>
                        </td>
                        :
                        events.map(event => {
                            if(mode == 0 && event.defaultPrices == 1) return
                            return(
                                <PricesTable event={event}/>
                            )
                        })
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
    data,
    mode,
}){
    return(
        data == null || (data?.inHouses.length == 0 && data?.publics.length == 0)?
        <div className="flex justify-center">
            <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                <p className="uppercase font-bold text-white">Event Kosong</p>
            </div>
        </div>
        :
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
                        <td>{data.totalParticipants?.inHouse}</td>
                        <td>{`Rp ${Number(data.totalPrice?.inHouse).toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <EventsTable events={data.inHouses} mode={mode}/>
                        </td>
                    </tr>
                    <tr className="bg-gray-200">
                        <td className="p-3">Public Training</td>
                        <td>{data.totalParticipants?.public}</td>
                        <td>{`Rp ${Number(data.totalPrice?.public).toLocaleString()}`}</td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            <EventsTable events={data.publics} mode={mode}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="flex w-full items-center justify-center gap-10">
                <Totals totalPrice={data.totalPrice} totalParticipants={data.totalParticipants}/>
            </div>
        </>
    )
}