import { ToRupiah } from "@/helpers/ToRupiah"
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid"
import { Tooltip } from "@material-tailwind/react"

export default function BudgetReportTable({budget, budgetTypePrices}){
    const totalBudget = Number(budget.total_value)
    const totalRecap = Number(budgetTypePrices.total_value)
    const totalRemainder = totalBudget - totalRecap
    const totalRecapPercentage = (totalRecap/totalBudget) * 100
    const totalRemainderPercentage = (totalRemainder/totalBudget) * 100

    const headerClass = 'border-r-2 last:border-r-0 border-white p-2'
    const bodyClass = 'px-2 py-5'
    const colorAware = totalRecapPercentage > 80 ? "text-red-500" : totalRecapPercentage > 50 ? "text-amber-500" : "text-green-500"

    return(
        <table className="table-auto w-full text-center border-2 border-red-500">
            <thead className="bg-red-500 text-white font-bold">
                <tr className="border-b-2 border-white">
                    <th rowSpan={2} className={headerClass}>COA</th>
                    <th rowSpan={2} className={headerClass}>Tipe Anggaran</th>
                    <th rowSpan={2} className={headerClass}>Rancangan</th>
                    <th colSpan={2} className={headerClass}>Nominal</th>
                    <th colSpan={2} className={headerClass}>Persentase</th>
                </tr>
                <tr className="border-b-2 border-white">
                    <th className={headerClass}>Rekap</th>
                    <th className={headerClass}>Sisa</th>
                    <th className={headerClass}>Rekap</th>
                    <th className={headerClass}>Sisa</th>
                </tr>
            </thead>
            <tbody>
                {
                    budget.details.map(detail => {
                        const budgetValue = Number(detail.value)
                        const recapNominal = Number(budgetTypePrices[detail?.budget_type.id] ?? 0)
                        const remainderNominal = budgetValue-recapNominal
                        const recapPercentage = (recapNominal / budgetValue) * 100
                        const remainderPercentage = (remainderNominal / budgetValue) * 100
                        return (
                            <tr className="border-b-2 border-red-500">
                                <td className={bodyClass}>{detail?.budget_type.coa}</td>
                                <td className={bodyClass}>{detail?.budget_type.name}</td>
                                <td className={bodyClass}>{ToRupiah(budgetValue)}</td>
                                <td className={bodyClass}>{ToRupiah(recapNominal)}</td>
                                <td className={bodyClass}>{ToRupiah(remainderNominal)}</td>
                                <td className={bodyClass}><PercentageNumber number={recapPercentage}/></td>
                                <td className={bodyClass}><PercentageNumber number={remainderPercentage}/></td>
                            </tr>
                        )
                    })
                }
                <tr className="border-b-2 border-red-500 font-bold text-xl text-black">
                    <td colSpan={2} className={bodyClass}>Total</td>
                    <td className={bodyClass}>{`Rp ${totalBudget.toLocaleString()}`}</td>
                    <td className={`${bodyClass} ${colorAware}`}>{ToRupiah(totalRecap)}</td>
                    <td className={`${bodyClass} ${colorAware}`}>{ToRupiah(totalRemainder)}</td>
                    <td className={`${bodyClass} ${colorAware}`}><PercentageNumber number={totalRecapPercentage}/></td>
                    <td className={`${bodyClass} ${colorAware}`}><PercentageNumber number={totalRemainderPercentage}/></td>
                </tr>
            </tbody>
        </table>
    )
}

function PercentageNumber({number}){
    return(
        <div className="flex items-center gap-2 justify-center">
            {`${number.toFixed(2)}%`}
            <Tooltip content={`${number.toFixed(8)}%`}>
                <ChatBubbleLeftEllipsisIcon className="w-5 text-red-500"/>
            </Tooltip>
        </div>
    )
}
