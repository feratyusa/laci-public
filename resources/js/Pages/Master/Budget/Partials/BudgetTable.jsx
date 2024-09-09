export default function BudgetTable({budget, details=[]}){
    const headerClass = "p-3 bg-gray-100 border-b-2 border-gray-300"
    const bodyClass = "p-3 border-b-2 border-gray-300"
    return(
        <table className="table-auto w-full text-left">
            <tbody>
                <tr>
                    <th className={headerClass}>Tahun</th>
                    <td className={bodyClass}>{budget.year}</td>
                </tr>
                <tr>
                    <th className={headerClass}>Total Anggaran</th>
                    <td className={bodyClass}>{`Rp ${Number(details.reduce((accum, item) => accum + Number(item.value), 0)).toLocaleString()}`}</td>
                </tr>
            </tbody>
        </table>
    )
}