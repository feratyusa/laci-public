import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon, ExclamationCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "@material-tailwind/react";

export default function DisclosureFile({title, file=null, isOpen=false, warning=false, children, ...props}){
  return(
      <Disclosure defaultOpen={isOpen}>
      {({ open }) => (
        <>
          <DisclosureButton className="w-full">
            <Button className="flex w-full items-center justify-between gap-20 rounded border-2 border-gray-500 " variant="text" size="lg">
              <div className="flex items-center gap-5">
                {title}
                {warning ? <ExclamationCircleIcon className="w-5" color="red"/> : ''}
              </div>
              <ChevronDownIcon className={"w-5 " +( open && "rotate-180")} />
            </Button>
          </DisclosureButton>
          <DisclosurePanel className="p-5 bg-gray-200 rounded-b-lg ">
            {children}
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}