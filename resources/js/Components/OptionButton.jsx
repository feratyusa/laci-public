import { 
    Tooltip, 
    IconButton, 
    Button
} from "@material-tailwind/react";
import { Link } from "@inertiajs/react";

export default function OptionButton({tip='', color='gray', link='#', children, variant="text", button='icon', ...props}){
    return (
        <Tooltip content={tip}>
            <Link href={link} className="flex items-center">
            {
                button == 'text' ? 
                <Button className="flex items-center gap-2" variant="text">

                </Button>
                :
                <IconButton {...props} variant={variant} color={color}>
                    {children}
                </IconButton>
            }
            </Link>
        </Tooltip>
    )
}