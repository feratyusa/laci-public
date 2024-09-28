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
    unfinished={proposal: 0, public: 0, inHouse: 0},    
}) {

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
            </div>                        
        </AuthenticatedLayout>
    );
}
