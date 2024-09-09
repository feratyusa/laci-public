import EmptyRow from "@/Components/Table/EmptyRow";
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

function BudgetTable({budget, sumPrices, sumParticipants}){
    const totalBudget = Number(budget.details.find(d => d.name == 'In House Training').value) + Number(budget.details.find(d => d.name == 'Public Training').value)
    const totalPrices = Number(sumPrices.public) + Number(sumPrices.inHouse)
    const remainder = totalBudget - totalPrices
    const totalPercentage = (totalPrices/totalBudget) * 100
    const remainderPercentage = (remainder/totalBudget) * 100

    const headerClass = 'border-l-2 last:border-r-2 border-white p-2'
    const bodyClass = 'px-2 py-5'

    const colorAware = totalPercentage > 80 ? "text-red-500" : totalPercentage > 50 ? "text-yellow-900" : "text-green-500"

    return(
        <table className="table-auto w-full text-center">
            <thead className="bg-red-500 text-white font-bold">
                <tr className="border-b-2 border-white">
                    <th rowSpan={2} className={headerClass}>Nama</th>
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
                        if(detail.name == 'In House Training' || detail.name == 'Public Training') {
                            const price = detail.name == 'In House Training' ? sumPrices.inHouse : sumPrices.public
                            const remainder = Number(detail.value) - Number(price)
                            const pricePercentage = (Number(price)/Number(detail.value)) * 100
                            const remainderPercentage = (Number(remainder)/Number(detail.value)) * 100
                            return(
                                <tr className="border-b-2 border-red-500 text-black">
                                    <td className={bodyClass}>{detail.name}</td>
                                    <td className={bodyClass}>{`Rp ${Number(detail.value).toLocaleString()}`}</td>
                                    <td className={bodyClass}>{`Rp ${Number(price).toLocaleString()}`}</td>
                                    <td className={bodyClass}>{`Rp ${Number(remainder).toLocaleString()}`}</td>
                                    <td className={bodyClass}>
                                        <PercentageNumber number={pricePercentage}/>
                                    </td>
                                    <td className={bodyClass}>
                                        <PercentageNumber number={remainderPercentage}/>
                                    </td>
                                </tr>
                            )
                        }
                    })
                }
                <tr className="border-b-2 border-red-500 font-bold text-xl text-red-500">
                    <td className={bodyClass}>Total</td>
                    <td className={bodyClass}>{`Rp ${totalBudget.toLocaleString()}`}</td>
                    <td className={`${bodyClass} ${colorAware}`}>{`Rp ${totalPrices.toLocaleString()}`}</td>
                    <td className={`${bodyClass} ${colorAware}`}>{`Rp ${remainder.toLocaleString()}`}</td>
                    <td className={`${bodyClass} ${colorAware}`}><PercentageNumber number={totalPercentage}/></td>
                    <td className={`${bodyClass} ${colorAware}`}>
                        <PercentageNumber number={remainderPercentage}/>
                    </td>
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
}){
    const {data, setData, get, reset} = useForm({
        budget_id: budget ? budget.id : ''
    })

    function handleSubmit(){
        get(route('calculator.index'), {
            preserveScroll: true
        })
    }

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
                    <BudgetTable budget={budget} sumPrices={sumPrices} sumParticipants={sumParticipants}/>
                </div>
            }
        </>
    )
}