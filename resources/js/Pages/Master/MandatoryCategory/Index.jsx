import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Card, CardBody } from "@material-tailwind/react"
import MandatoryCategoryTable from "./Partials/Table"
import HeaderTitle from "@/Components/HeaderTitle"
import { Head } from "@inertiajs/react"
import { ChevronDownIcon, ExclamationCircleIcon,  } from "@heroicons/react/24/outline"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import AddDialog from "./Partials/AddDialog"

function DropdownType({type, mandatories}){
    return(
        <Disclosure>
            <DisclosureButton className={"w-full group"}>
                <div className="flex justify-between border-2 rounded-sm border-gray-500 shadow-md p-3 hover:bg-gray-100">
                    <p>{type}</p>
                    <ChevronDownIcon className="w-5 transition-all duration-200 group-data-[open]:rotate-180"/>
                </div>
            </DisclosureButton>
            <DisclosurePanel
                transition
                className={"px-5 pt-5 pb-20 border-gray-500 border-x-2 border-b-2 shadow-md transition duration-200 ease-out data-[closed]:-translate-y-5 data-[closed]:opacity-0"}
            >
                <div className="mb-3">
                    <AddDialog type={type} route={route('mandatory-category.store')} mandatories={mandatories}/>
                </div>
                <MandatoryCategoryTable mandatories={mandatories}/>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default function Index({auth, types, mandatories}){
    return(
        <Authenticated
            user={auth.user}
            header={<HeaderTitle title={'Kategori Wajib'}/>}
        >
            <Head title="Mandatory Category" />

            <Card className="m-5 p-3">
                <CardBody>
                    <div className="flex items-center gap-5 text-red-500 mb-10">
                        <ExclamationCircleIcon className="w-8"/>
                        <p className="text-2xl font-bold">Kategori File Wajib</p>
                    </div>
                    {
                        types.map(type => (
                            <div className="mb-3">
                                <DropdownType type={type} mandatories={mandatories.filter(m => String(m.mandatory_type)== type)}/>                            
                            </div>
                        ))
                    }
                </CardBody>
            </Card>
        </Authenticated>
    )
}