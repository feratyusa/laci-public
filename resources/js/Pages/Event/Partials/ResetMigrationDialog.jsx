import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { router } from "@inertiajs/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { useState } from "react";

export default function ResetMigrationDialog({
    event_id,    
    event_name,
    active    
}){
    const [open, setOpen] = useState(false)    

    function handleSubmit(){
        router.get(route('event.changeMigrateStatus', [event_id]), {
            onSuccess: () => {                                  
                setOpen(false)
            }
        })
    }

    return(
        <>
        <Tooltip content="Ubah Status Migrasi">
            <IconButton size="sm" onClick={() => setOpen(true)} color="blue">
                <ArrowPathIcon className="w-full"/>            
            </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
  
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="space-y-4 bg-white p-12">
                <DialogTitle className={'text-red-500 font-bold text-2xl'}>Ubah Status Migrasi Event</DialogTitle>                
                <p className="pb-5">Status migrasi akan diubah menjadi <span className="font-bold">{active ? 'Belum' : 'Sudah'}</span>. Perubahan status migrasi tidak akan mengembalikan peserta yang sudah dimigrasikan.</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => handleSubmit()} color="green">Ubah</Button>
                    <Button onClick={() => setOpen(false)} color="amber">Cancel</Button>
                </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
}