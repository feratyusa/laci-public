import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
  } from "@material-tailwind/react";
  import {
    AcademicCapIcon,
    HomeIcon,
    LightBulbIcon,
    CalendarDaysIcon,
    BookOpenIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    PowerIcon,
    CalculatorIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from 'react';
import { useMediaQuery } from "react-responsive";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Authenticated({ user, header, children }) {
    const isMobile = useMediaQuery({query: '(max-width: 800px)'});
    const [sidebar, setSidebar] = useState(!isMobile);

    const handleResize = () => {
        if(isMobile){
            setSidebarClassName(classNameClose);
            setSideButton(classNameBtnClose);
            setSidebar(false)
        }
        else{
            setSidebarClassName(classNameOpen);
            setSideButton(classNameBtnOpen);
            setSidebar(true);
        }
    }

    const classNameOpen = 'flex-none min-h-screen w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5';
    const classNameClose = 'hidden';
    const [sidebarClassName, setSidebarClassName] = useState(sidebar ? classNameOpen : classNameClose);

    const classNameBtnOpen = 'hidden';
    const classNameBtnClose = 'flex-none';
    const [sideButton, setSideButton] = useState(sidebar ? classNameBtnOpen : classNameBtnClose);

    function handleSidebar(){
        if(sidebar){
            setSidebarClassName(classNameClose);
            setSideButton(classNameBtnClose);
        }
        else{
            setSidebarClassName(classNameOpen);
            setSideButton(classNameBtnOpen);
        }
        setSidebar(!sidebar)
    }

    /**
     * Menu list
     */
    const menusBatch = [
        [
            {name: 'Dashboard', link: 'dashboard', icon: <HomeIcon className="h-5 w-5"/>},
            {name: 'Usulan', link: 'proposal.index', icon: <LightBulbIcon className="h-5 w-5"/>},
            {name: 'Event', link: 'event.index', icon: <AcademicCapIcon className="h-5 w-5"/>},
            {name: 'Kalender', link: 'dashboard', icon: <CalendarDaysIcon className="h-5 w-5"/>},
            {name: 'Kalkulator', link: 'calculator.index', icon: <CalculatorIcon className="h-5 w-5"/>},
            {name: 'Tutorial', link: 'dashboard', icon: <BookOpenIcon className="h-5 w-5"/>},
        ],
        [
            {name: 'Profile', link: 'profile.edit', icon: <UserCircleIcon className="h-5 w-5"/>},
            {name: 'Settings', link: 'dashboard', icon: <Cog6ToothIcon className="h-5 w-5"/>},
        ]
    ]

    useEffect(() => {
        window.addEventListener("resize", handleResize)
    })
    
    return (
        <div className="flex min-h-screen w-screen bg-gray-100 overflow-auto">
            <Card className={sidebarClassName}>
                <div className="mb-2 flex justify-between gap-4 p-4">
                    <div className='flex items-start'>
                        <ApplicationLogo className="h-8 w-8 mr-5"/>
                        <Typography variant="h5" color="blue-gray">
                            Learning Center
                        </Typography>
                    </div>
                    <button className='hover:opacity-50' onClick={handleSidebar}>
                        <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M5 7h14M5 12h14M5 17h14"/>
                        </svg>
                    </button>                  
                </div>
                <List>
                    {
                        menusBatch.map((batches, key) => (
                            <>
                            {batches.map((menu, i) =>
                                <Link href={route(menu.link)} as="button">
                                    <ListItem key={menu.name+i}>
                                        <ListItemPrefix>
                                            {menu.icon}
                                        </ListItemPrefix>
                                            {menu.name}
                                        <ListItemSuffix>
                                        </ListItemSuffix>
                                    </ListItem>
                                </Link>
                            )
                            }
                            {
                                key != menusBatch.length-1 ?   
                                <hr className="my-2 border-blue-gra y-50" /> :
                                ""
                            }
                            </>
                        ))
                    }
                    <Link href={route('logout')} method="post" as="button">
                        <ListItem key={'logout'}>
                            <ListItemPrefix>
                            <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </Link>
                </List>
            </Card>
            <div className="flex-auto">
                {header && (
                    <div className='bg-red-900'>
                        <div className='flex flex-row gap-5 items-center h-16 pl-3 pt-3 pb-3 pr-10'>
                            <div className={sideButton}>
                                <button className='hover:opacity-80' onClick={handleSidebar}>
                                    <svg className="w-[35px] h-[35px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="white" strokeLinecap="round" strokeWidth="1.5" d="M5 7h14M5 12h14M5 17h14"/>
                                    </svg>
                                </button>
                            </div>
                            <div className='grow'>{header}</div>
                        </div>
                    </div>
                )}

                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}
