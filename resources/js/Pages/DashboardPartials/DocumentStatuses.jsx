import LoadingText from "@/Components/Loading/LoadingText"
import ReportCard from "./ReportCard"
import TitleReportCard from "./TitleReportCard"
import { DocumentTextIcon } from "@heroicons/react/24/solid"
import { useState } from "react"
import { useEffect } from "react"

export default function DocumentStatuses({user}){
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
