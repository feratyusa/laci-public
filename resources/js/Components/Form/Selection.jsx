export default function Selection({value='', onChange, options=[], ...props}){
    return(
        <select value={value} onChange={onChange} {...props}>
            {
                options.map(option => (
                    <option value={option.value}>{option.label}</option>
                ))
            }
        </select>
    )
}