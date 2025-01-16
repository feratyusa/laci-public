import HeaderTitle from '@/Components/HeaderTitle';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import DocumentStatuses from './DashboardPartials/DocumentStatuses';
import BudgetReportCard from './DashboardPartials/BudgetReportCard';
import DashboardModeSelection from './DashboardPartials/DashboardModeSelection';
import SertifikasiReportCard from './DashboardPartials/SertifikasiReportCard';

export default function Dashboard({
    auth,
}) {
    const [budgets, setBudgets] = useState(false)
    const [dashboardMode, setDashboardMode] = useState("1")
    const [defaultMode, setDefaultMode] = useState(localStorage.getItem("defaultDashboardMode"))

    useEffect(() => {
        if (localStorage.getItem('defaultDashboardMode')) {
            setDashboardMode(localStorage.getItem('defaultDashboardMode'))
        }
        else{
            localStorage.setItem('defaultDashboardMode', "1")
            setDefaultMode("1")
        }

        axios.get('/api/input/budgets')
            .then((response) => {
                setBudgets(response.data.budgets);
            })
    }, [defaultMode])

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<HeaderTitle title={'dashboard'}/>}
        >
            <Head title="Dashboard" />

            <div className='m-5'>
                <DashboardModeSelection
                    mode={dashboardMode} setMode={setDashboardMode} defaultMode={defaultMode} setDefaultMode={setDefaultMode}
                />
            </div>
            {
                dashboardMode == "1" ?
                <>
                    <DocumentStatuses user={auth.user}/>
                    {budgets && <BudgetReportCard year={budgets.find(b => b.label == new Date().getFullYear())?.label ?? false}/>}
                </>
                :
                dashboardMode == "2" ?
                <SertifikasiReportCard />
                :
                <div className='flex items-center justify-center'>
                    <p className="text-7xl text-red-500 uppercase">
                        skibidi
                    </p>
                </div>
            }
        </AuthenticatedLayout>
    );
}
