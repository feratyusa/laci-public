export default function TitleReportCard({textSize='md', children}){
    return(
        <div className={`flex items-center gap-3 ${textSize == 'xl' ? 'text-xl' : textSize == 'lg' ? 'text-lg' : textSize == 'sm' ? 'text-sm' : ''} text-red-500`}>
            {children}
        </div>
    )
}
