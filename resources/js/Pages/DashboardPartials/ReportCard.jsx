export default function ReportCard({children}){
    return(
        <div className='bg-white rounded-lg shadow-lg border-2 p-5 hover:shadow-red-500/30'>
            {children}
        </div>
    )
}
