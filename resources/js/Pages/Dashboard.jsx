import HeaderTitle from '@/Components/HeaderTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowUpIcon, BanknotesIcon, ChartBarSquareIcon, ChatBubbleLeftEllipsisIcon, DocumentDuplicateIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import Linegraph from '@/Components/Chart/Linegraph';
import { useEffect } from 'react';
import axios from 'axios';
import LoadingText from '@/Components/Loading/LoadingText';
import { data } from 'autoprefixer';
import ReactSelect from 'react-select';
import { Button, Tooltip } from '@material-tailwind/react';
import { ToRupiah } from '@/helpers/ToRupiah';
import LoadingCircle from '@/Components/Loading/LoadingCircle';


function ReportCard({children}){
    return(
        <div className='bg-white rounded-lg shadow-lg border-2 p-5 hover:shadow-red-500/30'>                    
            {children}
        </div>
    )
}

function TitleReportCard({textSize='md', children}){
    return(
        <div className={`flex items-center gap-3 ${textSize == 'xl' ? 'text-xl' : textSize == 'lg' ? 'text-lg' : textSize == 'sm' ? 'text-sm' : ''} text-red-500`}>
            {children}
        </div>
    )
}

function DocumentStatuses(){
    const [unfinishedDocuments, setUnfinishedDocuments] = useState({
        proposal: null,
        public: null,
        inHouse: null,
    })

    function DoucumentsCount({count}){
        const color = {green: 'text-green-500', red: 'text-red-500', yellow: 'text-amber-500'}
        return(
            count != null ?
            <p className={`text-4xl ${count < 5 ? color.green : count < 10 ? color.yellow : color.red}`}>{count}</p>
            :
            <div className='my-5'>
               <LoadingText />
            </div>
        )
    }

    useEffect(() => {
        axios.get('/api/dashboard/unfinishedDocuments')
            .then((response) => {
                setUnfinishedDocuments(response.data.uncompleteCount)
            })
    }, [])

    return(        
        <div className='grid grid-cols-3 gap-5 m-5'>
            <ReportCard>
                <TitleReportCard textSize='xl'>
                    <DocumentTextIcon className='w-8'/>
                    <p className='font-bold'>Usulan Tidak Lengkap</p>
                </TitleReportCard>
                <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                    <DoucumentsCount count={unfinishedDocuments.proposal}/>
                </div>
            </ReportCard>
            <ReportCard>
                <TitleReportCard textSize='xl'>
                    <DocumentTextIcon className='w-8'/>
                    <p className='font-bold'>Public Training Tidak Lengkap</p>
                </TitleReportCard>
                <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                    <DoucumentsCount count={unfinishedDocuments.public}/>
                </div>
            </ReportCard>
            <ReportCard>
                <TitleReportCard textSize='xl'>
                    <DocumentTextIcon className='w-8'/>
                    <p className='font-bold'>In House Training Tidak Lengkap</p>
                </TitleReportCard>
                <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                    <DoucumentsCount count={unfinishedDocuments.inHouse}/>
                </div>
            </ReportCard>                             
        </div> 
    )
}


function RangeSelection({range, setRange, setBudgets}){
    const [selected, setSelected] = useState(0)

    function handleRangeChange(range){
        setBudgets(false)
        setRange(range)
        setSelected(range)
    }

    function RangeButton({range}){
        return(
            <Button size='sm' color={`${selected == range ? 'blue' : 'red'}`} onClick={() => handleRangeChange(range)}>
                <p className='capitalize'>{`${range==0 ? 'This month': `Last ${range+1} months`}`}</p>
            </Button>
        )
    }
    return(
        <div className='grid grid-cols-5 gap-2 mb-5'>            
            <RangeButton range={0}/>
            <RangeButton range={2}/>
            <RangeButton range={5}/>
            <RangeButton range={8}/>
            <RangeButton range={11}/>
        </div>
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

function BudgetReportTable({budget, budgetTypePrices}){
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
                        const recapNominal = Number(budgetTypePrices[detail?.budget_type.id] ?? 0)
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

function BudgetReportCard(){    
    const [range, setRange] = useState(0)
    const [data, setData] = useState(false)

    useEffect(() => {
        axios.get('/api/dashboard/budgetReport', {params: {year: new Date().getFullYear(), range: range}})
            .then((response) => {
                setData(response.data.data)
            })
    }, [range])    
    
    return(
        <div className='m-5 bg-white rounded-lg p-5'>                        
            <RangeSelection range={range} setRange={setRange} setBudgets={setData}/>
            {
                data ?
                <BudgetReportTable budget={data.budget} budgetTypePrices={data.budgetTypePrices}/>
                :
                <div className='m-auto w-fit'>
                    <LoadingCircle />
                </div>
            }                        
        </div>
    )
}


export default function Dashboard({ 
    auth,    
}) {

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title={'dashboard'}/>}
        >
            <Head title="Dashboard" />

            <DocumentStatuses />  
            <BudgetReportCard />                
        </AuthenticatedLayout>
    );
}
