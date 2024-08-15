import DialogDelete from "@/Components/Dialogs/DialogDelete";
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
                {"Rp " + Number(event.prices.training_price).toLocaleString()}
            </td>
            <td className={rowClassName}>
                {"Rp " + Number(event.prices.accomodation_price).toLocaleString()}
            </td>
            <td className={rowClassName}>
                <DialogDelete 
                    content={'event'}
                    title={'Hapus Event'}
                    message={`Event (${event.id}) ${event.name} akan dihapus. Event yang dihapus tidak dapat dikembalikan. Yakin ingin menghapus?`}
                    buttonSize="sm"
                    variant="text"
                    route={route('event.destroy', [event.id])}
                />
            </td>
        </tr>
    )
}

function EmpytyRow({span=1}){
    return(
        <tr>
            <td colSpan={span} className="bg-gray-300 p-5">
                <p className="uppercase font-bold tracking-wide">Event Kosong</p>
            </td>
        </tr>
    )
}

export default function EventList({events=[], start='', end='', className='', ...props}){
    const headerClassName = "border-l-2 border-b-2 border-t-2 last:border-r-2 bg-blue-500 border-blue-300 p-3 text-white"
    return(
        <Card className={" " + className} {...props}>
            <CardBody>
                <div className="flex justify-center text-black mb-5">
                    {
                        start || end ?
                        <p className="uppercase font-bold">{"Daftar Event " + `(${changeToIndonesiaDateTime(start, true)} - ${changeToIndonesiaDateTime(end, true)})`}</p>
                        :
                        <p className="uppercase font-bold">Daftar Event</p>

                    }
                </div>
                <table className="w-full text-center align-middle text-black">
                    <thead>
                        <th className={headerClassName}>ID</th>
                        <th className={headerClassName}>Nama</th>
                        <th className={headerClassName}>Kursus</th>
                        <th className={headerClassName}>Biaya Pendidikan</th>
                        <th className={headerClassName}>Biaya Akomodasi</th>
                        <th className={headerClassName}>Opsi</th>
                    </thead>
                    <tbody>
                        {
                            events.length == 0 ?
                                <EmpytyRow span={6}/>
                            :
                            events.map((event, index) => (
                                <EventRow event={event} />
                            ))
                        }
                    </tbody>
                </table>
            </CardBody>
        </Card>
    )
}