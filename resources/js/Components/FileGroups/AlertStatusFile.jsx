import { CheckCircleIcon, ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/solid"

export default function AlertStatusFile({status=null, title, ...props}){
    const symbolSize = "w-5"
    const textColor = (s) => {
        if(s === "danger" || s === "success") return "text-white"
        else if(s === "info") return "text-black"
        else return "text-white"
    } 

    const symbol = (s) => {
        if(s === "danger") return (<XCircleIcon className={symbolSize}/>)
        else if(s === "info") return (<ExclamationCircleIcon className={symbolSize}/>)
        else if(s === "success") return (<CheckCircleIcon className={symbolSize} />)
        else return ((<ExclamationCircleIcon className={symbolSize}/>))
    }

    const bgColor = (s) => {
        if(s === "danger") return "bg-red-500"
        else if(s === "info") return "bg-yellow-500"
        else if(s === "success") return "bg-green-500"
        else return "bg-gray-600"
    }
    return(
        <div className={"flex items-center gap-5 rounded-lg p-5 my-10"+ " " + bgColor(status) + " " + textColor(status)}>
            {symbol(status)}
            <p className={textColor(status) + " font-bold"}>{title}</p>
        </div>
    )
}