export default function EmptyRow({colSpan=1}){
    return(
        <tr>
            <td colSpan={colSpan} className="bg-gray-200 text-center p-5">
                <p className="text-black font-bold text-xl">KOSONG</p>
            </td>
        </tr>
    )
}