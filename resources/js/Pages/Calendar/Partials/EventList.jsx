import DialogDelete from "@/Components/Dialogs/DialogDelete";
import EmptyRow from "@/Components/Table/EmptyRow";
import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate";
import { Card, CardBody } from "@material-tailwind/react";

function EventRow({event}){
    const rowClassName = "border-l-2 border-b-2 last:border-r-2 border-blue-500 p-3"
    return(
        <tr>
            <td className={rowClassName}>
                {event.id}
            </td>
            <td className={rowClassName}>
                {event.name}
            </td>
            <td className={rowClassName}>
                {`(${event.proposal.kursus.sandi}) ${event.proposal.kursus.lengkap}`}
            </td>
            <td className={rowClassName}>
                {event.participant_number}
            </td>
            <td className={rowClassName}>
                {"Rp " + Number(event.prices.training_price).toLocaleString()}
            </td>
            <td className={rowClassName}>
                {"Rp " + Number(event.prices.accomodation_price).toLocaleString()}
            </td>            
        </tr>
    )
}

export default function EventList({events=[], start='', end='', className='', ...props}){
    const headerClassName = "border-l-2 border-b-2 border-t-2 last:border-r-2 bg-blue-500 border-blue-300 p-3 text-white"
    return(
        <>
            <table className="w-full text-center align-middle text-black">
                <thead>
                    <th className={headerClassName}>ID</th>
                    <th className={headerClassName}>Nama</th>
                    <th className={headerClassName}>Kursus</th>
                    <th className={headerClassName}>Partisipan</th>
                    <th className={headerClassName}>Biaya Pendidikan</th>
                    <th className={headerClassName}>Biaya Akomodasi</th>                    
                </thead>
                <tbody>
                    {
                        events.length == 0 ?
                            <EmptyRow colSpan={6}/>
                        :
                        events.map((event, index) => (
                            <EventRow event={event} />
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}