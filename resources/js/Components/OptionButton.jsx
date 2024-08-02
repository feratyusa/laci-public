import { 
    Tooltip, 
    IconButton 
} from "@material-tailwind/react";
import { Link } from "@inertiajs/react";

export default function OptionButton({tip='', color='gray', link='#', children, variant="text", ...props}){
    return (
        <Tooltip content={tip}>
            <Link href={link}>
                <IconButton {...props} variant={variant} color={color}>
                    {children}
                </IconButton>
            </Link>
        </Tooltip>
    )
}