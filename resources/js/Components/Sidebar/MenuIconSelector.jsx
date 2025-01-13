import {
    AcademicCapIcon,
    ArrowLeftStartOnRectangleIcon,
    BanknotesIcon,
    BookOpenIcon,
    CalculatorIcon,
    CalendarDaysIcon,
    Cog8ToothIcon,
    ComputerDesktopIcon,
    ExclamationCircleIcon,
    HandThumbDownIcon,
    HomeIcon,
    LightBulbIcon,
    TagIcon,
    UserCircleIcon,
    UserPlusIcon,
    SquaresPlusIcon,
    MapPinIcon,
    BeakerIcon,
    BookmarkSquareIcon,
    TableCellsIcon,
    VariableIcon
} from "@heroicons/react/24/solid";

export default function MenuIconSelector({name=''}){
    return(
        name === 'home' ?
        <HomeIcon className="w-5"/>
        :
        name === 'proposals' ?
        <LightBulbIcon className="w-5"/>
        :
        name === 'events' ?
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
        name === 'master' ?
        <ComputerDesktopIcon className="w-5"/>
        :
        name === 'master/user' ?
        <UserPlusIcon className="w-5"/>
        :
        name === 'master/categories' ?
        <TagIcon className="w-5"/>
        :
        name === 'master/mandatory-categories' ?
        <ExclamationCircleIcon className="w-5"/>
        :
        name === 'master/budgets' ?
        <BanknotesIcon className="w-5"/>
        :
        name === 'master/locations' ?
        <MapPinIcon className="w-5"/>
        :
        name === 'changelog' ?
        <SquaresPlusIcon className="w-5"/>
        :
        name === 'utilities' ?
        <BeakerIcon className="w-5"/>
        :
        name === 'utilities/nugies' ?
        <BookmarkSquareIcon className="w-5"/>
        :
        name == 'utilities/reportReload' ?
        <TableCellsIcon className="w-5"/>
        :
        name == 'master/sertifikasi' ?
        <VariableIcon className="w-5" />
        :
        <HandThumbDownIcon className="w-5"/>
    )
}
