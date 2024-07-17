import { HomeIcon } from "@heroicons/react/24/outline"
import { Link } from "@inertiajs/react"
import { Breadcrumbs, Typography } from "@material-tailwind/react"

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
    console.log(splitted)
    
    var combinelink = '/'

    return(
        <Breadcrumbs fullWidth>
        {
            splitted.map((link, index) => {
                console.log(combinelink)
                if(index === 0 || index === 1) return "";
                else if(index === 2){
                    return(
                        <CrumbLink link={route('dashboard')} title="Home"/>
                    )
                }
                else if(menu === 'proposals'){
                    combinelink += splitted[index] +  '/'
                    return(
                        <CrumbLink link={combinelink} title={index === 3 ? 'Proposals' : title}/>
                    )              
                }else if(menu === 'events'){

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