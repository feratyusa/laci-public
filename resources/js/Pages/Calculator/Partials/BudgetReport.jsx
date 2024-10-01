import EmptyRow from "@/Components/Table/EmptyRow";
import { ToRupiah } from "@/helpers/ToRupiah";
import { ChatBubbleLeftEllipsisIcon, ChatBubbleLeftIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, Tooltip } from "@material-tailwind/react";
import { useEffect } from "react";
import ReactSelect from "react-select";

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

function BudgetTable({budget, budgetTypePrices}){
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
                        const recapNominal = Number(budgetTypePrices[detail?.budget_type.id])
                        const remainderNominal = budgetValue-recapNominal
                        const recapPercentage = (recapNominal / budgetValue) * 100
                        const remainderPercentage = (remainderNominal / budgetValue) * 100
                        return (
                            <tr className="border-b-2 border-red-500">
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
                    <td className={bodyClass}>Total</td>
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

export default function BudgetReport({
    calculator_data,
    sumPrices,
    sumParticipants,
    budget=null,
    budgets=[],
    budgetTypePrices=[],
}){
    const {data, setData, get, reset} = useForm({
        budget_id: budget ? budget.id : ''
    })

    function handleSubmit(){
        get(route('calculator.index'), {
            preserveScroll: true
        })
    }
    
    console.log(budgetTypePrices)

    return(
        <>
            <div className="grid grid-cols-12 items-center gap-5 mb-10">
                <div className="col-span-11 grid grid-cols-12 items-center">
                    <div className="col-span-1">
                        <label htmlFor="budget">
                            Tahun
                        </label>
                    </div>
                    <div className="col-span-11">
                        <ReactSelect
                            id="budget"
                            classNamePrefix="select2-selection"
                            options={[...budgets]}                
                            value={budgets.find(b => b.value == data.budget_id)}
                            onChange={(option) => setData('budget_id', option.value)}
                        />
                    </div>
                </div>
                <div className="col-span-1 flex items-center justify-center">
                    <Button color="blue" onClick={() => handleSubmit()}>
                        Cari
                    </Button>
                </div>
            </div>
            {
                budget == null ? 
                <div className="flex justify-center">
                    <div className="w-fit bg-yellow-900 py-3 px-5 rounded-lg shadow-lg">
                        <p className="uppercase font-bold text-white">Pilih tahun anggaran</p>
                    </div>
                </div>
                :
                <div className="shadow-lg">
                    <BudgetTable budget={budget} budgetTypePrices={budgetTypePrices}/>
                </div>
            }
        </>
    )
}