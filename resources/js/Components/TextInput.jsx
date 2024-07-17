export default function TextInput({className='', ...props}){
    return(
        <input 
            {...props}
            className={"w-full rounded-md focus:drop-shadow-2xl  " + className}
        >
        </input>
    )
}
