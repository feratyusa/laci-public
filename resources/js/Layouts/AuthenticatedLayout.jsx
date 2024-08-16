import { useState } from 'react';
import Sidebar from "@/Components/Sidebar/Sidebar";
import { MainMenu, ProfileMenu } from "@/Base/Menus";

export default function Authenticated({ user, header, children }) {
    const menus = [[...MainMenu], [...ProfileMenu]]
    const [open, setOpen] = useState(localStorage.getItem('sidebar') == 'false' ? false : true)
    const mainTransition = `transition-all duration-300 ${open ? "translate-x-[17rem] w-[calc(100vw-17rem)]" : "translate-x-[3rem] w-[calc(100vw-3rem)]"}`

    function handleSidebar(){
        setOpen(!open)
        localStorage.setItem('sidebar', !open)        
    }
    
    return (
        <div className="flex w-screen min-h-screen bg-gray-200 overflow-auto">
            <Sidebar
                open={open} 
                setOpen={() => handleSidebar()}
                user={user}
                menus={menus}
            />
            <div className={"mb-16 " + mainTransition}>
                {header && (
                    <div className='flex items-center p-5 h-[4rem] bg-red-900'>
                        {header}
                    </div>
                )}

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
