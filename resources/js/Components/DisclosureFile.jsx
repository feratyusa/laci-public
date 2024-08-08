import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export default function DisclosureFile({title, file=null, isOpen=false, children, ...props}){
  
  return(
      <Disclosure defaultOpen={isOpen}>
      {({ open }) => (
        <>
          <DisclosureButton className="w-full">
            <Button className="flex w-full items-center justify-between gap-20 rounded-none border-2 border-gray-500" variant="text" size="lg">
              <div className="flex items-center gap-5">
                {title}
                <ExclamationCircleIcon className="w-5"/>
              </div>
              <ChevronDownIcon className={"w-5 " +( open && "rotate-180")} />
            </Button>
          </DisclosureButton>
          <DisclosurePanel className="p-5 border-gray-500 ">
            {children}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}