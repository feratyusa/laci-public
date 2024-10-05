export default function LoadingText({}){
    return(
        <div className="grid grid-cols-3 gap-2 animate-pulse">
            <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce"></div>
            <div className="h-2 w-2 rounded-full bg-red-500 animate-bounce"></div>
        </div>
    )
}