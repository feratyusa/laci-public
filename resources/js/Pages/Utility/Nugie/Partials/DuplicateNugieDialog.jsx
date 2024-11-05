import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, IconButton } from "@material-tailwind/react";
import { useState } from "react";

export default function DuplicateNugieDialog({    
    route,
    name,
    title,
}){
    const [open, setOpen] = useState(false)

    const {get, processing} = useForm({})
    
    function handleSubmit(){
        get(route)
    }

    return(
        <>
        <IconButton size="sm" color="purple" onClick={() => setOpen(true)}>
            <DocumentDuplicateIcon className="w-full"/>
        </IconButton>        
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
  
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="space-y-4 bg-white p-12">
                <DialogTitle className={'text-red-500 font-bold text-2xl'}>{title}</DialogTitle>                
                <p>Aksi ini akan menduplikasi {name}</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => handleSubmit()} color="green" loading={processing}>Duplikasi</Button>
                    <Button onClick={() => setOpen(false)} color="amber">Cancel</Button>
                </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
}