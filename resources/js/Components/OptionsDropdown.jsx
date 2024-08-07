import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'

export default function OptionsDropdown({
    width=32, 
    options=[],
    routes=[]
}){
    const itemsClassName = "p-2"
    return(
        <Menu>
            <MenuButton className="p-2 hover:bg-gray-300 rounded-full">
                <EllipsisVerticalIcon className='w-5'/>
            </MenuButton>
            <MenuItems className={"border-2 border-gray-300 bg-white text-center " + width} anchor="bottom">
                {
                    options.map((option, index) => (
                        <MenuItem className="p-2">
                                            
                        </MenuItem>
                    ))
                }
            </MenuItems>
        </Menu>
    )   
}