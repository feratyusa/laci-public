import { Typography } from "@material-tailwind/react";
import InputLabel from "../Form/InputLabel";
import ReactSelect from "react-select";
import InputInstruction from "../Form/InputInstruction";
import { useState } from "react";

export default function MultiSelectFilter({
    id, 
    value, 
    selections,
    placeholder, 
    instruction=false,
    filterClassName="", 
    openMenuOnClick=true,
    ...props
}){
    const [openSelect, setOpenSelect] = useState(false)

    function handleInputChange(s){
        if(s.length > 2) setOpenSelect(true)
        else setOpenSelect(false)
    }

    return(
        <div className={filterClassName}>
            <InputLabel htmlFor={id}>
                <Typography variant="h6">{placeholder}</Typography>
            </InputLabel>
            <ReactSelect
                id={id}
                name={id}
                classNamePrefix="select2-selection"
                className="max-w-5xl focus:border-red-500"
                placeholder={placeholder}
                value={value}
                options={[...selections]}
                openMenuOnClick={openMenuOnClick}
                onInputChange={(s) => handleInputChange(s)}
                menuIsOpen={openSelect}
                isSearchable
                isClearable
                isMulti
                menuShouldBlockScroll
                {...props}
            />
            
            {instruction ? <InputInstruction text={"Ketik 3 karakter"}/> : ''}
        </div>
    )
}