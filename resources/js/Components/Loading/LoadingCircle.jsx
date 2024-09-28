export default function LoadingCircle({size="h-16 w-16"}){    
    return(
        <div className="animate-spin rounded-full bg-gradient-to-r from-red-500 p-2">
            <div className={`bg-white rounded-full p-2 ${size}`}></div>
        </div>
    )
}