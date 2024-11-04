import { HomeIcon } from "@heroicons/react/24/outline"
import { Link } from "@inertiajs/react"
import { Breadcrumbs, Typography } from "@material-tailwind/react"
import { isArray } from "lodash"

function CrumbLink({link, title='[Insert title here]'}){
    return(
        <Link
            href={link}
            className="opacity-80"
        >
            {
                title === 'Home' ?
                <HomeIcon className="h-5 w-5"/> :
                <Typography variant="small">
                    {title}
                </Typography>
            }
        </Link>
    )
}

export default function BreadcrumbMod({menu, title}){
    const urlNow = window.location.href
    const splitted = urlNow.split('/')

    var combinelink = '/'

    return(
        <Breadcrumbs fullWidth className="mb-5">
        {
            splitted.map((link, index) => {
                if(index === 0 || index === 1) return "";
                else if(index === 2){
                    return(
                        <CrumbLink link={route('dashboard')} title="Home"/>
                    )
                }
                else if(index > 3 && isArray(title) && title[index-4] == null) return "";
                else if(menu === 'proposals'){
                    combinelink += splitted[index] +  '/'
                    return(
                        <CrumbLink link={combinelink} title={index === 3 ? 'Proposals' : isArray(title) ? title[index-4] : title}/>
                    )
                }else if(menu === 'events'){
                    combinelink += splitted[index] + '/'
                    return(
                        <CrumbLink link={combinelink} title={index === 3 ? 'Events' : isArray(title) ? title[index-4] : title} />
                    )
                }else{
                    combinelink +=splitted[index] + '/'
                    return(
                        <CrumbLink link={combinelink} title="[no title]" />
                    )
                }
            })
        }
    </Breadcrumbs>
    )
}
