import { changeToIndonesiaDateTime } from "@/helpers/IndoesiaDate"
import BudgetReportTable from "./BudgetReportTable"
import LoadingCircle from "@/Components/Loading/LoadingCircle"
import { BanknotesIcon } from "@heroicons/react/24/solid"
import TitleReportCard from "./TitleReportCard"
import { useState } from "react"
import { useEffect } from "react"
import { Button } from "@material-tailwind/react"

export default function BudgetReportCard({year}){
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

function RangeSelection({setRange, setBudgets}){
    const [selected, setSelected] = useState(5)

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
