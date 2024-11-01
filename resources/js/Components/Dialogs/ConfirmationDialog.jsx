import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { Button } from "@material-tailwind/react"
import { useState } from "react"

export default function ConfirmationDialog({
    buttonColor="green",
    buttonText="Dialog",
    buttonSize="md",    
    title='Confirmation Dialog',
    message='Customize Me',
    handleConfirmation= () => console.log('Close Me'),
}){
    const [open, setOpen] = useState(false)

    return(
        <>
            <Button color={buttonColor} size={buttonSize} onClick={() => setOpen(true)}>
                {buttonText}
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
                />
                <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel
                    transition
                    className="space-y-4 bg-white p-12 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 rounded-lg"
                >
                    <DialogTitle className="text-lg font-bold">
                        {title}
                    </DialogTitle>
                    <p className="pb-5">{message}</p>
                    <div className="flex gap-4 items-center justify-center">
                        <Button onClick={handleConfirmation} color="green">
                            Oke
                        </Button>
                        <Button onClick={() => setOpen(false)} color="amber">
                            Batal
                        </Button>                        
                    </div>
                </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}