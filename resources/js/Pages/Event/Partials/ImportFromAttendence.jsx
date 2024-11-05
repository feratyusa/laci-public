import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";

export default function ImportFromAttendence({
    event_id
}){
    const [open, setOpen] = useState(false)

    const {data, setData, reset, post, processing} = useForm({
        quiz_id: ''
    })

    function handleSubmit(){
        post(route('event.importParticpantsAttendence', [event_id]), {
            onSuccess: () => {
                reset()
                setOpen(false)
            }
        })
    }

    return(
        <>
        <Button onClick={() => setOpen(true)} color="blue" className="flex items-center gap-3">
            <ArrowDownOnSquareIcon className="w-5"/>
            Import dari Absen Quiz
        </Button>
        <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <DialogBackdrop className="fixed inset-0 bg-black/30" />
  
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <DialogPanel className="space-y-4 bg-white p-12">
                <DialogTitle className={'text-red-500 font-bold text-2xl'}>Import Peserta dari Absensi Quiz</DialogTitle>                
                <div className="grid grid-rows-2 pt-3 pb-10">
                    <label htmlFor="quiz-id">
                        Quiz ID
                    </label>
                    <input 
                        id="quiz-id"
                        className="rounded-md"
                        value={data.quiz_id}
                        onChange={(e) => setData('quiz_id', e.target.value)}
                    />
                </div>
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