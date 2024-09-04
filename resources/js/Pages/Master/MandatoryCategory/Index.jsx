import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Card } from "@material-tailwind/react"
import MandatoryCategoryTable from "./Partials/Table"
import HeaderTitle from "@/Components/HeaderTitle"
import { Head } from "@inertiajs/react"
import BreadcrumbMod from "@/Components/BreadcrumbMod"
import { ChevronDownIcon, DocumentMagnifyingGlassIcon } from "@heroicons/react/24/solid"
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react"
import AddDialog from "./Partials/AddDialog"

function DropdownType({type, mandatories}){
    return(
        <Disclosure>
            <DisclosureButton className={"w-full group"}>
                <div className="flex justify-between text-black border-2 rounded-sm border-black p-3 hover:bg-gray-100">
                    <p>{type}</p>
                    <ChevronDownIcon className="w-5 transition-all duration-200 group-data-[open]:rotate-180"/>
                </div>
            </DisclosureButton>
            <DisclosurePanel
                transition
                className={"p-5 border-gray-500 border-x-2 border-b-2 transition duration-200 ease-out data-[closed]:-translate-y-5 data-[closed]:opacity-0"}
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

            <BreadcrumbMod />

            <Card className="m-5 py-5">
                <div className="flex items-center gap-4 px-5 text-red-500 mb-3">
                    <DocumentMagnifyingGlassIcon className="w-8"/>
                    <p className="uppercase text-lg font-bold">List Kategori Wajib</p>
                </div>
                {
                    types.map(type => (
                        <div className="mx-10 my-3 pb-5 border-b-2 border-red-100">
                            <DropdownType type={type} mandatories={mandatories.filter(m => String(m.mandatory_type)== type)}/>                            
                        </div>
                    ))
                }
            </Card>
        </Authenticated>
    )
}