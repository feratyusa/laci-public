import { AcademicCapIcon, ArrowLeftStartOnRectangleIcon, BookOpenIcon, CalculatorIcon, CalendarDaysIcon, Cog8ToothIcon, HandThumbDownIcon, HomeIcon, LightBulbIcon, UserCircleIcon } from "@heroicons/react/24/solid";

export default function MenuIconSelector({name=''}){
    return(
        name === 'home' ?
        <HomeIcon className="w-5"/>
        :
        name === 'proposal' ?
        <LightBulbIcon className="w-5"/>
        :
        name === 'event' ?
        <AcademicCapIcon className="w-5"/>
        :
        name === 'calendar' ?
        <CalendarDaysIcon className="w-5"/>
        :
        name === 'calculator' ?
        <CalculatorIcon className="w-5"/>
        :
        name === 'tutorial' ?
        <BookOpenIcon className="w-5"/>
        :
        name === 'profile' ?
        <UserCircleIcon className="w-5"/>
        :
        name === 'settings' ?
        <Cog8ToothIcon className="w-5"/>
        :
        name === 'logout' ?
        <ArrowLeftStartOnRectangleIcon className="w-5"/>
        :
        <HandThumbDownIcon className="w-5"/>
    )
}