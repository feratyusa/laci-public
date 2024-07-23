import { 
    Tooltip, 
    IconButton 
} from "@material-tailwind/react";
import { Link } from "@inertiajs/react";

export default function OptionButton({tip='', color='gray', link='#', children, variant="text", ...props}){
    return (
        <Tooltip content={tip}>
            <IconButton {...props} variant={variant} color={color}>
                <Link href={link}>
                    {children}
                </Link>
            </IconButton>
        </Tooltip>
    )
}