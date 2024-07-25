export default function TextInput({className='', ...props}){
    return(
        <input 
            {...props}
            className={"w-full rounded-md focus:drop-shadow-lg  " + className}
        >
        </input>
    )
}
