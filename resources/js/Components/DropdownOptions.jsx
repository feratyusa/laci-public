import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { IconButton } from "@material-tailwind/react";

export function DropdownMenuOption({children}){
    return(
        <Menu>
            <MenuButton className={`group`}>
                <IconButton size="sm" className="rounded-full transition duration-500 group-data-[active]:rotate-90" color="red">
                    <EllipsisVerticalIcon className="w-full"/>
                </IconButton>
            </MenuButton>
            <MenuItems
                transition 
                className={`shadow-lg border-2 border-gray-300 rounded-b-lg rounded-tl-lg w-max bg-white trasnsition duration-100 data-[closed]:-translate-y-10 data-[closed]:translate-x-10 data-[closed]:scale-0 data-[closed]:opacity-0`} 
                anchor="bottom end"
            >
                {children}
            </MenuItems>
        </Menu>
    )
}