import {
    IconButton,
    Tooltip,
} from "@material-tailwind/react";
import {    
    Bars4Icon,
    ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Link } from "@inertiajs/react";
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import ApplicationLogo from "@/Components/ApplicationLogo";
import MenuIconSelector from "./MenuIconSelector";
import { useState } from "react";

function MenuItem({menu, open, selected=false}){    
    const menuClass = `group w-full flex items-center gap-5 hover:bg-red-500 ${selected ? "bg-red-100" : ''} ${open ? "p-3" : "justify-center py-3"}`
    return(
        <>
        {
            open ? 
            <Link href={route(menu.link)} className={menuClass} method={menu?.method ?? 'get'} as="button">
                <div className="text-red-500 group-hover:text-white">
                    <MenuIconSelector name={menu.url} />
                </div>
                <div className="group-hover:text-white">
                    <p>{menu.name}</p>
                </div>
            </Link>
            :
            <Tooltip content={menu.name}>
                <Link href={route(menu.link)} className={menuClass} method={menu?.method ?? 'get'} as="button">
                    <div className="text-red-500 group-hover:text-white">
                        <MenuIconSelector name={menu.url} />
                    </div>
                </Link>
            </Tooltip>
        }
        </>
    )
}

function MainMenuList({menus, open, menuSelected='home'}){
    return(
        <div className="w-full border-b-2 border-red-500 py-3">
            {
                menus?.map((menu) => {
                    if(Array.isArray(menu.link)) return <DropdownMenu menu={menu} open={open}/>
                    else return <MenuItem menu={menu} open={open} selected={menuSelected === menu.url}/>   
                })
            }
        </div>
    )
}

function ProfileMenuList({menus, open, menuSelected='home'}){
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

function DropdownMenuButton({menu, open, chevronDown=false}){
    return(
        <>
        {
            open ?
                <div className={`group grid grid-cols-8 item-center p-3 gap-5 hover:bg-red-500`}>
                    <div className="flex items-center gap-5 col-span-6">
                        <div className="text-red-500 group-hover:text-white">
                            <MenuIconSelector name={menu.url} />
                        </div>
                        <div className="group-hover:text-white">
                            <p>{menu.name}</p>
                        </div>
                    </div>
                    <div className="col-span-2 group-hover:text-white">
                        <ChevronDownIcon className={`w-5 transition-all duration-100 ${chevronDown ? 'rotate-180' : ''}`}/>
                    </div>
                </div>
            :
            <Tooltip content={menu.name}>
                <div className="grid grid-rows-2 justify-center items-center py-3 text-red-500 hover:bg-red-500 hover:text-white">
                    <MenuIconSelector name={menu.url}/>
                    <ChevronDownIcon className={`w-5 transition-transform duration-100 ${chevronDown ? 'rotate-180' : ''}`}/>
                </div>
            </Tooltip>
        }
        </>
    )
}


function MenuItemDropdown({menu, open, selected=false}){
    const menuClass = `group w-full flex items-center gap-5 hover:bg-red-500 ${selected ? "bg-red-100" : ''} ${open ? "p-3" : "justify-center py-3"}`
    return(
        <>
        {
            open ? 
            <Link href={route(menu.link)} className={menuClass + " pl-8"} method={menu?.method ?? 'get'} as="button">
                <div className="text-orange-500 group-hover:text-white">
                    <MenuIconSelector name={menu.url} />
                </div>
                <div className="group-hover:text-white">
                    <p>{menu.name}</p>
                </div>
            </Link>
            :
            <Tooltip content={menu.name}>
                <Link href={route(menu.link)} className={menuClass} method={menu?.method ?? 'get'} as="button">
                    <div className="text-orange-500 group-hover:text-white">
                        <MenuIconSelector name={menu.url} />
                    </div>
                </Link>
            </Tooltip>
        }
        </>   
    )
}

function DropdownMenu({menu, open, menuSelected='home'}){
    const [chevronDown, setChevronDown] = useState(menuSelected === menu.url ? true : false)
    const urlExt = menuSelected + window.location.href.split[4]

    return(
        <Disclosure>
            <DisclosureButton className="w-full" onClick={() => setChevronDown(!chevronDown)}>
                <DropdownMenuButton menu={menu} open={open} chevronDown={chevronDown}/>
            </DisclosureButton>
            <DisclosurePanel
                transition
                className="origin-top transition duration-200 ease-in data-[closed]:-translate-y-6 data-[closed]:opacity-0"
            >
                {
                    menu.link.map((m) => (
                        <MenuItemDropdown menu={m} open={open} selected={urlExt === m.url}/>
                    ))
                }
            </DisclosurePanel>
        </Disclosure>
    )
}

function MenuHeader({open, setOpen, menuSelected='user'}){
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
            <div className="flex items-center h-[4rem] py-5 border-b-2 border-red-500">
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

    const url = window.location.href.split('/')[3]
    const menuSelected = url == '' ? 'home' : url
    
    const openClass = `transition-all ease-in-out duration-300 ${open ? "w-[17rem]" : "w-[3rem]"}`
    return (
        <div className={"fixed flex flex-col bg-white h-screen items-start shadow-xl " + openClass}>
            <MenuHeader setOpen={setOpen} open={open}/>
            <div className={open ? "w-full overflow-auto" : "w-full overflow-y-scroll"}>
                <MainMenuList menus={mainMenu} open={open} menuSelected={menuSelected}/>
                <ProfileMenuList menus={profileMenu} open={open} menuSelected={menuSelected}/>
            </div>
        </div>
    )
}
