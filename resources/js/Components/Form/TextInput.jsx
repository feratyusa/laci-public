export default function TextInput({className='', ...props}){
    return(
        <input 
            {...props}
            className={"w-full rounded-md focus:drop-shadow-lg disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-500 " + className}
        >
        </input>
    )
}
