import {
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";
  import {
    Bars4Icon,
    HomeIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import MenuIconSelector from "./MenuIconSelector";

function MenuItem({menu, open}){
    const menuSelected = localStorage.getItem('menuSelected') ?? ""
    const menuClass = `group w-full flex items-center gap-5 hover:bg-red-500 ${menuSelected == menu.name ? "bg-red-100" : ''} ${open ? "p-3" : "justify-center py-3"}`

    function handleSetMenu(){
        localStorage.setItem('menuSelected', menu.name)
    }
    
    return(
        <>
        {
            open ? 
            <Link href={route(menu.link)} className={menuClass} method={menu?.method ?? 'get'} as="button" onClick={() => handleSetMenu()}>
                <div className="text-red-500 group-hover:text-white">
                    <MenuIconSelector name={menu.icon} />
                </div>
                <div className="group-hover:text-white">
                    <p>{menu.name}</p>
                </div>
            </Link>
            :
            <Tooltip content={menu.name}>
                <Link href={route(menu.link)} className={menuClass} method={menu?.method ?? 'get'} as="button" onClick={() => handleSetMenu()} >
                    <div className="text-red-500 group-hover:text-white">
                        <MenuIconSelector name={menu.icon} />
                    </div>
                </Link>
            </Tooltip>
        }
        </>
    )
}

function MainMenuList({menus, open}){
    return(
        <div className="w-full border-b-2 border-red-500 py-3">
            {
                menus?.map((menu) => (
                    <MenuItem menu={menu} open={open}/>        
                ))
            }
        </div>
    )
}

function ProfileMenuList({menus, open}){
    return(
        <div className="w-full py-3">
            {
                menus?.map((menu) => (
                    <MenuItem menu={menu} open={open}/>
                ))
            }
        </div>
    )
}

function MenuHeader({open, setOpen}){
    return(
        <>
        {
            open ?
            <div className="flex items-center h-[4rem] p-5 border-b-2 border-red-500">
                <div className="basis-3/4">
                    <Link href={route('dashboard')} className="flex justify-center items-center gap-5 hover:text-red-500">
                        <ApplicationLogo className="w-12"/>
                        <p className="font-bold text-left uppercase">Learning Center</p>
                    </Link>
                </div>
                <div className="basis-1/4 flex-justify-center">
                    <Tooltip content="Close Menu">
                        <IconButton variant="text" size="lg" color="red" onClick={setOpen}>
                            <Bars4Icon className="w-6"/>
                        </IconButton>
                    </Tooltip>
                </div>
            </div>
            :
            <div className="flex items-center h-[4rem] border-b-2 border-red-500">
                <Tooltip content="Open Menu">
                    <IconButton variant="text" size="lg" color="red" onClick={setOpen}>
                        <Bars4Icon className="w-6"/>
                    </IconButton>
                </Tooltip>
            </div>
        }
        </>
    )
}

export default function Sidebar({user='', menus=[], open=true, setOpen}) {
    const mainMenu = menus[0]
    const profileMenu = menus[1]
    console.log(open)
    
    const openClass = `transition-all ease-in-out duration-300 ${open ? "w-[17rem]" : "w-[3rem]"}`
    return (
        <div className={"fixed flex flex-col bg-white h-screen items-start shadow-xl " + openClass}>
            <MenuHeader setOpen={setOpen} open={open}/>
            <div className={open ? "w-full overflow-auto" : "w-full overflow-y-scroll"}>
                <MainMenuList menus={mainMenu} open={open}/>
                <ProfileMenuList menus={profileMenu} open={open}/>
            </div>
        </div>
    )
}
