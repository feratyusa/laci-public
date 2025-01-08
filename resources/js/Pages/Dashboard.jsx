import HeaderTitle from '@/Components/HeaderTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { BanknotesIcon, ChatBubbleLeftEllipsisIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import LoadingText from '@/Components/Loading/LoadingText';
import { Button, Tooltip } from '@material-tailwind/react';
import { ToRupiah } from '@/helpers/ToRupiah';
import LoadingCircle from '@/Components/Loading/LoadingCircle';
import { changeToIndonesiaDateTime } from '@/helpers/IndoesiaDate';


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

function DocumentStatuses({user}){
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
                    <div>
                        <p className='font-bold'>Usulan Tidak Lengkap</p>
                        <p className='text-xs italic'>Assign To <span className='font-bold'>{user.username}</span></p>
                    </div>
                </TitleReportCard>
                <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                    <DoucumentsCount count={unfinishedDocuments.proposal}/>
                </div>
            </ReportCard>
            <ReportCard>
                <TitleReportCard textSize='xl'>
                    <DocumentTextIcon className='w-8'/>
                    <div>
                        <p className='font-bold'>Public Training Tidak Lengkap</p>
                        <p className='text-xs italic'>Assign To <span className='font-bold'>{user.username}</span></p>
                    </div>
                </TitleReportCard>
                <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                    <DoucumentsCount count={unfinishedDocuments.public}/>
                </div>
            </ReportCard>
            <ReportCard>
                <TitleReportCard textSize='xl'>
                    <DocumentTextIcon className='w-8'/>
                    <div>
                        <p className='font-bold'>In House Training Tidak Lengkap</p>
                        <p className='text-xs italic'>Assign To <span className='font-bold'>{user.username}</span></p>
                    </div>
                </TitleReportCard>
                <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                    <DoucumentsCount count={unfinishedDocuments.inHouse}/>
                </div>
            </ReportCard>
        </div>
    )
}


function RangeSelection({setRange, setBudgets}){
    const [selected, setSelected] = useState(1)

    function handleRangeChange(range){
        setBudgets(false)
        setRange(range)
        setSelected(range)
    }

    function RangeButton({range}){
        return(
            <Button size='sm' color={`${selected == range ? 'blue' : 'red'}`} onClick={() => handleRangeChange(range)}>
                <p className='capitalize'>
                    {
                        range == 1 ?
                        'Bulan Ini'
                        :
                        range == 2 ?
                        'Q1'
                        :
                        range == 3 ?
                        'Q2'
                        :
                        range == 4 ?
                        'Q3'
                        :
                        'Q4 / Tahun Ini'
                    }
                </p>
            </Button>
        )
    }
    return(
        <div className='grid grid-cols-5 gap-2 mb-3'>
            <RangeButton range={1}/>
            <RangeButton range={2}/>
            <RangeButton range={3}/>
            <RangeButton range={4}/>
            <RangeButton range={5}/>
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

function ReportDetails({dateStrings={start: '', end: ''}, eventsCount=0}){
    return(
        <div className='grid grid-cols-2 text-red-500 mb-5'>
            <div className='text-right px-5 border-r-2 border-red-500'>
                <p
                    className='font-bold text-lg'
                >
                    {changeToIndonesiaDateTime(new Date(dateStrings.start), true)} - {changeToIndonesiaDateTime(new Date(dateStrings.end), true)}</p>
            </div>
            <div className='text-left px-5 border-l-2 border-red-500'>
                <p className='font-bold text-lg'>Jumlah Event: {eventsCount}</p>
            </div>
        </div>
    )
}

function ModeSelection({setMode}){
    const [selected, setSelected] = useState(0)

    function handleModeChange(value){
        setMode(value)
        setSelected(value)
    }

    function ModeButton({text, value}){
        return(
            <Button size='sm' color={`${selected == value ? 'green' : 'red'}`} onClick={() => handleModeChange(value)}>
                <p className='capitalize'>{text}</p>
            </Button>
        )
    }

    return(
        <div className='grid grid-cols-2 gap-2 mb-1'>
            <ModeButton text="Anggaran Realisasi" value={0}/>
            <ModeButton text="Anggaran Realisasi dan Awal" value={1}/>
        </div>
    )
}

function BudgetReportCard({year}){
    const [mode, setMode] = useState(0)
    const [range, setRange] = useState(1)
    const [data, setData] = useState(false)

    useEffect(() => {
        axios.get('/api/dashboard/budgetReport', {params: {year: year, range: range, mode: mode}})
            .then((response) => {
                setData(response.data.data)
            })
    }, [range, mode])

    return(
        <div className='m-5 bg-white rounded-lg p-5 shadow-lg'>
            <div className='mb-5'>
                <TitleReportCard textSize='xl'>
                    <BanknotesIcon className='w-8'/>
                    <div>
                        <p className='font-bold'>Rekap Anggaran Tahun {new Date().getFullYear()}</p>
                        <p className='text-sm'>untuk rekap lainnya dapat menggunakan menu <a href={route('calculator.index')} className='underline text-blue-500'>Kalkulator</a></p>
                    </div>
                </TitleReportCard>
            </div>
            <ModeSelection mode={mode} setMode={setMode}/>
            <RangeSelection range={range} setRange={setRange} setBudgets={setData}/>
            {
                year == false ?
                <div className='text-center text-red-500'>
                    <p className='font-bold text-2xl'>Anggaran Tahun {new Date().getFullYear()} belum ada. </p>
                    <p className='font-bold text-lg'>Silahkan membuat terlebih dahulu di menu <a href={route('budget.index')} className='text-blue-500 underline'>Master Anggaran</a></p>
                </div>
                :
                year && data ?
                <>
                    <ReportDetails dateStrings={data.dateStrings} eventsCount={data.eventsCount}/>
                    <BudgetReportTable budget={data.budget} budgetTypePrices={data.budgetTypePrices}/>
                </>
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
    const [budgets, setBudgets] = useState(false)

    useEffect(() => {
        axios.get('/api/input/budgets')
            .then((response) => {
                setBudgets(response.data.budgets);
            })
    }, [])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title={'dashboard'}/>}
        >
            <Head title="Dashboard" />

            <DocumentStatuses user={auth.user}/>
            {budgets && <BudgetReportCard year={budgets.find(b => b.label == new Date().getFullYear())?.label ?? false}/>}
        </AuthenticatedLayout>
    );
}
