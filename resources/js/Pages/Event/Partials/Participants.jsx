import DialogDelete from "@/Components/Dialogs/DialogDelete"
import { useEffect } from "react"

export default function Participants({event, participants=[]}){
    const headerClassName = 'bg-red-500 border-red-300 border-x-2 text-white p-2'
    const headerNames = ['NIP', 'Nama', 'Jabatan', 'Cabang', 'Aksi']
    const bodyClassName = 'text-black border-l-2 border-b-2 last:border-r-2 border-red-300 p-2'
    useEffect(() => {

    }, [participants])
    return(
        <table className="w-full table-auto text-center">
            <thead>
                {
                    headerNames.map(header => (
                        <th className={headerClassName}>{header}</th>
                    ))
                }
            </thead>
            <tbody>
                {
                    participants.length == 0 ?
                    <tr>
                        <td colSpan={5} className="bg-gray-100 py-5">
                            <p className="uppercase tracking-widest font-bold text-red-500">Partisipan Kosong</p>
                        </td>
                    </tr>
                    :
                    participants.map((participant) => (
                        <tr className="hover:bg-gray-100">
                            {
                                Object.keys(participant).map((key) => {
                                    const columnUsed = ['nip', 'nama', 'jabatan', 'cabang']
                                    if(columnUsed.includes(key))
                                    return(
                                        <td className={bodyClassName}>{participant[key]}</td>
                                    )   
                                })
                            }
                            <td className={bodyClassName}>
                                <DialogDelete 
                                    content={'Partisipan'}
                                    title={'Hapus Partisipan'}
                                    message={`Hapus partisipan (${participant.nip}) ${participant.nama}?`}
                                    buttonSize="sm"
                                    route={route('event.participant.destroy', [event.id])}
                                />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}