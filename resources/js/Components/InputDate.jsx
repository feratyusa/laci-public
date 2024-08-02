export default function InputDate({className='',value='', ...props}){
    return(
        <input 
            type="date"
            className={"w-full rounded-md focus:ring-0 " + className}
            value={value}
            {...props}
        />
    )
}