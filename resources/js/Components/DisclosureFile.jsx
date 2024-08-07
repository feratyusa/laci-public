import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function DisclosureFile({children, ...props}){

    return(
        <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <DisclosureButton className="flex items-center gap-2">
              Do you offer technical support?
              <ChevronDownIcon className={"w-5 " +( open && "rotate-180")} />
            </DisclosureButton>
            <DisclosurePanel>{children}</DisclosurePanel>
          </>
        )}
      </Disclosure>
    )
}