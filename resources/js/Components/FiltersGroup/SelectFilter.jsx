import { Typography } from "@material-tailwind/react";
import InputLabel from "../Form/InputLabel";
import ReactSelect from "react-select";

export default function SelectFilter({
    id, 
    value, 
    selections,
    placeholder, 
    instruction=false,
    filterClassName="",     
    ...props
}){
    return(
        <div className={filterClassName}>
            <InputLabel htmlFor={id}>
                <Typography variant="h6">{placeholder}</Typography>
            </InputLabel>
            <ReactSelect
                id={id}
                name={id}
                placeholder={placeholder}
                classNamePrefix="select2-selection"
                className="min-w-36"
                options={[...selections]}
                value={value}                    
                isClearable                                                                          
                {...props}
            />
        </div>
    )
}