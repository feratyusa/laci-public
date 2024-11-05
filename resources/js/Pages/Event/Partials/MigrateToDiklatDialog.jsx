import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export default function MigrateToDiklatDialog({
    participants,
    event_id,    
    event_name,
    active,
}){
    const [open, setOpen] = useState(false)

    const {data, setData, post, processing, errors} = useForm({
        nip: participants.map(p => p.nip)
    })

    function handleSubmit(){
        post(route('event.migrateToDiklat', [event_id]), {
            onSuccess: () => {
                reset()
                setOpen(false)
            }
        })
    }

    useEffect(() => {
        setData('nip', participants.map(p => p.nip))
    }, [participants])

    console.log(data.nip)
    console.log(errors)

    return(
        <>
        <Button onClick={() => setOpen(true)} color="purple" className="flex items-center gap-3" disabled={active == 1}>
            <ArrowDownOnSquareIcon className="w-5"/>
            Migrasi Peserta ke Diklat
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
  
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="space-y-4 bg-white p-12">
                <DialogTitle className={'text-red-500 font-bold text-2xl'}>Migrasi Peserta Event ke Diklat</DialogTitle>                
                <p className="pb-5">Sebanyak {participants.length} peserta dari Event {event_name} akan dimigrasi ke tabel Diklat.</p>
                <div className="flex justify-center gap-4">
                    <Button onClick={() => handleSubmit()} color="green" loading={processing}>Submit</Button>
                    <Button onClick={() => setOpen(false)} color="amber">Cancel</Button>
                </div>
            </DialogPanel>
          </div>
        </Dialog>
      </>
    )
}