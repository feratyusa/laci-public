export default function ReportDetails({dateStrings={start: '', end: ''}, eventsCount=0}){
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
