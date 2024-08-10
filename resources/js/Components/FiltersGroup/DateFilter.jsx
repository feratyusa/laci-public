import { Typography } from "@material-tailwind/react";
import InputLabel from "../Form/InputLabel";
import InputDate from "../Form/InputDate";

export default function DateFilter({
    id,
    placeholder,
    start_value,
    end_value,
    filterClassName,
    onChangeStart,
    onChangeEnd
}){
    return(
        <div className={filterClassName}>
            <Typography variant="h6">{placeholder}</Typography>
            <div className="flex gap-5">
                <div className="w-full max-w-lg">
                    <InputLabel htmlFor={id + "_start_date"}>
                        <Typography>
                            Dari
                        </Typography>
                    </InputLabel>
                    <InputDate
                        id={id + "_start_date"}
                        name={id + "_start_date"} 
                        value={start_value}
                        onChange={onChangeStart}
                    />
                </div>
                <div className="w-full max-w-lg">
                    <InputLabel htmlFor={id + "_end_date"}>
                        <Typography>
                            Sampai
                        </Typography>
                    </InputLabel>
                    <InputDate 
                        id={id + "_end_date"}
                        name={id + "_end_date"}
                        value={end_value}
                        onChange={onChangeEnd}
                    />
                </div>
            </div>
        </div>
    )
}