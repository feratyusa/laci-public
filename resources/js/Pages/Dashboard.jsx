import HeaderTitle from '@/Components/HeaderTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowUpIcon, BanknotesIcon, ChartBarSquareIcon, DocumentDuplicateIcon, DocumentTextIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { Head } from '@inertiajs/react';
import React, { useMemo, useState } from 'react';
import Linegraph from '@/Components/Chart/Linegraph';


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


export default function Dashboard({ 
    auth,
    budgets,
    events,
    unfinished={proposal: 0, public: 0, inHouse: 0},
    chartValues,
}) {
    const [year, setYear] = useState(budgets.find(b => b.value == new Date().getFullYear()).value)
    const [date, setDate] = useState({
        start: `${budgets.find(b => b.value == new Date().getFullYear()).value}-01-01`,
        end: `${budgets.find(b => b.value == new Date().getFullYear()).value}-12-31`,
    })
    const [chartData, setChartData] = useState(chartValues[year])
    
    const [month, ] = useState(String(new Date().getMonth() - 1).padStart(2, '0'))
    const [lastMonth, ] = useState(String(new Date().getMonth()).padStart(2, '0'))
    const [currMonth, ] = useState(new Date().toLocaleString('id', {month: 'long'}))

    const totalCount = events[`${year}-${month}`]['public']['count'] + events[`${year}-${month}`]['inhouse']['count']
    const prevTotalCount = events[`${year}-${lastMonth}`]['public']['count'] + events[`${year}-${lastMonth}`]['inhouse']['count']
    const percentageCount = Number((totalCount-prevTotalCount)/prevTotalCount * 100).toFixed(1)

    const totalCost = events[`${year}-${month}`]['public']['cost'] + events[`${year}-${month}`]['inhouse']['cost']
    const prevTotalCost = events[`${year}-${lastMonth}`]['public']['cost'] + events[`${year}-${lastMonth}`]['inhouse']['cost']
    const percentageCost = Number((totalCost-prevTotalCost)/prevTotalCost * 100).toFixed(1)

    const totalParticipants = events[`${year}-${month}`]['public']['participants'] + events[`${year}-${month}`]['inhouse']['participants']
    const prevTotalParticipants = events[`${year}-${lastMonth}`]['public']['participants'] + events[`${year}-${lastMonth}`]['inhouse']['participants']
    const percentageParticipants = Number((totalParticipants-prevTotalParticipants)/prevTotalParticipants * 100).toFixed(1)

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title={'dashboard'}/>}
        >
            <Head title="Dashboard" />

            <div className='grid grid-cols-3 gap-5 m-5'>
                <ReportCard>
                    <TitleReportCard textSize='xl'>
                        <DocumentTextIcon className='w-8'/>
                        <p className='font-bold'>Usulan Tidak Lengkap</p>
                    </TitleReportCard>
                    <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                        <p className={`text-4xl ${unfinished.proposal > 10 ? 'text-red-500' : unfinished.proposal > 5 ? 'text-amber-500' : 'text-green-500'}`}>{unfinished.proposal ?? '0'}</p>
                    </div>
                </ReportCard>
                <ReportCard>
                    <TitleReportCard textSize='xl'>
                        <DocumentTextIcon className='w-8'/>
                        <p className='font-bold'>Public Training Tidak Lengkap</p>
                    </TitleReportCard>
                    <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                        <p className={`text-4xl ${unfinished.public > 10 ? 'text-red-500' : unfinished.public > 5 ? 'text-amber-500' : 'text-green-500'}`}>{unfinished.public ?? '0'}</p>
                    </div>
                </ReportCard>
                <ReportCard>
                    <TitleReportCard textSize='xl'>
                        <DocumentTextIcon className='w-8'/>
                        <p className='font-bold'>In House Training Tidak Lengkap</p>
                    </TitleReportCard>
                    <div className='flex flex-col items-center gap-2 font-bold mt-2'>
                        <p className={`text-4xl ${unfinished.inHouse > 10 ? 'text-red-500' : unfinished.inHouse > 5 ? 'text-amber-500' : 'text-green-500'}`}>{unfinished.inHouse ?? '0'}</p>
                    </div>
                </ReportCard>
                <ReportCard>
                    <TitleReportCard textSize='xl'>
                        <DocumentDuplicateIcon className='w-8'/>
                        <p className='font-bold'>Jumlah Event Bulan {currMonth}</p>
                    </TitleReportCard>
                    <div className='flex flex-col items-center gap-2 font-bold mt-5'>
                        <p className='text-4xl'>{totalCount}</p>
                        <div className={`italic text-sm ${percentageCount < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            <div className={`flex items-center justify-center gap-2`}>
                                <p>{percentageCount}%</p>
                                <ArrowUpIcon className={`w-3 ${percentageCount < 0 ? 'rotate-180' : ''}`}/>
                            </div>
                            <p>dari bulan lalu</p>
                        </div>
                    </div>
                </ReportCard>
                <ReportCard>
                    <TitleReportCard textSize='xl'>
                        <BanknotesIcon className='w-8'/>
                        <p className='font-bold'>Pengeluaran Bulan {currMonth}</p>
                    </TitleReportCard>
                    <div className='flex flex-col items-center gap-2 font-bold mt-5'>
                        <p className='text-4xl'>{`Rp ${Number(totalCost).toLocaleString()}`}</p>
                        <div className={`italic text-sm ${percentageCost < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            <div className={`flex items-center justify-center gap-2`}>
                                <p>{percentageCost}%</p>
                                <ArrowUpIcon className={`w-3 ${percentageCost < 0 ? 'rotate-180' : ''}`}/>
                            </div>
                            <p>dari bulan lalu</p>
                        </div>
                    </div>
                </ReportCard>
                <ReportCard>
                    <TitleReportCard textSize='xl'>
                        <UserGroupIcon className='w-9'/>
                        <p className='font-bold'>Partisipan Bulan {currMonth}</p>
                    </TitleReportCard>
                    <div className='flex flex-col items-center gap-2 font-bold mt-5'>
                        <p className='text-4xl'>{Number(totalParticipants).toLocaleString()}</p>
                        <div className={`italic text-sm ${percentageParticipants < 0 ? 'text-red-500' : 'text-green-500'}`}>
                            <div className={`flex items-center justify-center gap-2`}>
                                <p>{percentageParticipants}%</p>
                                <ArrowUpIcon className={`w-3 ${percentageParticipants < 0 ? 'rotate-180' : ''}`}/>
                            </div>
                            <p>dari bulan lalu</p>
                        </div>
                    </div>
                </ReportCard>
            </div>
            <div className='grid grid-cols-2 gap-3 m-5'>
                <ReportCard>
                    <TitleReportCard textSize='lg'>
                        <ChartBarSquareIcon className='w-7'/>
                        <p className='font-bold'>Pengeluaran Anggaran Tiap Bulan</p>
                    </TitleReportCard>
                    <Linegraph data={{
                        labels: chartData.total.cost.x,
                        datasets:[
                            {
                                label: 'Total',
                                data: chartData.total.cost.y,
                                borderColor: "rgb(255,0,0)",
                            },
                            {
                                label: 'Public Training',
                                data: chartData.public.cost.y,
                                borderColor: "rgb(0,255,0)",
                            },
                            {
                                label: 'In House Training',
                                data: chartData.inHouse.cost.y,
                                borderColor: "rgb(0,0,255)",
                            }
                        ]
                    }}/>
                </ReportCard>
                <ReportCard>
                    <TitleReportCard textSize='lg'>
                        <ChartBarSquareIcon className='w-7'/>
                        <p className='font-bold'>Jumlah Partisipan Tiap Bulan</p>
                    </TitleReportCard>
                    <Linegraph data={{
                        labels: chartData.total.participants.x,
                        datasets:[
                            {
                                label: 'Total',
                                data: chartData.total.participants.y,
                                borderColor: "rgb(255,0,0)",
                            },
                            {
                                label: 'Public Training',
                                data: chartData.public.participants.y,
                                borderColor: "rgb(0,255,0)",
                            },
                            {
                                label: 'In House Training',
                                data: chartData.inHouse.participants.y,
                                borderColor: "rgb(0,0,255)",
                            }
                        ]
                    }}/>
                </ReportCard>
            </div>            
        </AuthenticatedLayout>
    );
}
