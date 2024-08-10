import { Typography } from "@material-tailwind/react";
import InputLabel from "../Form/InputLabel";
import TextInput from "../Form/TextInput";

export default function TextFilter({
    id,
    value,
    placeholder,
    filterClassName="",
    ...props
}){
    return(
        <div className={filterClassName}>
            <InputLabel htmlFor={id}>
                <Typography variant="h6">{placeholder}</Typography>
            </InputLabel>
            <TextInput
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                {...props}
            />
        </div>
    )
}