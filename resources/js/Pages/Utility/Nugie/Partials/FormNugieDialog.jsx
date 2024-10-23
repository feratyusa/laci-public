import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button, Tooltip } from "@material-tailwind/react";
import InputLabel from "@/Components/Form/InputLabel";
import TextInput from "@/Components/Form/TextInput";
import InputError from "@/Components/Form/InputError";
import { Cog8ToothIcon, PlusIcon } from "@heroicons/react/24/outline";

export default function FormNugieDialog({     
    mode='create',
    nugie={name: '', description: ''},
    user,
    route,
}){
    const [open, setOpen] = useState(false)
    const {data, setData, processing, post, put, errors, clearErrors, reset} = useForm({
        name: nugie.name,
        description: nugie.description,
        created_by: user.username
    })

    function handleClose(){
        reset()
        clearErrors()
        setOpen(false)
    }

    function handleOpen(){
        setOpen(true)
    }

    function handleSubmit(e){
        e.preventDefault()
        if(mode == 'edit') {
            put(route, {
                preserveState: false,
                onSuccess: () => handleClose()
            })
        }
        else{
            post(route, {            
                onSuccess: () => handleClose()
            })
        }
    }

    return(
        <>
            {          
                mode == 'edit' ?
                <Tooltip content="Edit Nugie">
                    <Button className="flex items-center gap-3" onClick={handleOpen} color="amber">
                        <Cog8ToothIcon className="h-5 w-5"/>
                        Edit Nugie
                    </Button>
                </Tooltip>
                :      
                <Tooltip content="Tambah Nugie">
                    <Button className="flex items-center gap-3" onClick={handleOpen} color="green">
                        <PlusIcon className="h-5 w-5"/>
                        Tambah Nugie
                    </Button>
                </Tooltip>
            }
            <Dialog open={open} as="div" className="z-10 focus:outline-none max-h-screen" onClose={handleClose}>
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/5" />

                {/* Dialog Content */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl max-h-screen rounded-xl bg-white p-10 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                            >
                            <DialogTitle className="font-bold text-2xl">{mode == 'edit' ? 'Edit Nugie' : 'Tambah Nugie'}</DialogTitle>
                            <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-5">
                                <div>
                                    <InputLabel value="Nama Nugie" htmlFor="name" 
                                        className="font-bold text-sm" />
                                    <TextInput
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        placeholder="Nama Nugie"
                                        autoComplete="name"
                                        isFocused={true}
                                        className="border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900 focus:border-gray-900   "
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                </div>
                                <div>
                                    <InputLabel value="Deskripsi" htmlFor="description" 
                                        className="font-bold text-sm" />
                                    <textarea
                                        id="description"
                                        type="text"
                                        name="name"
                                        value={data.description}
                                        placeholder="Deskripsi"                                        
                                        className="w-full border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900 focus:border-gray-900   "
                                        onChange={(e) => setData('description', e.target.value)}
                                    />

                                    <InputError message={errors.description} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                </div>
                            </form>
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="green"
                                    loading={processing}
                                    onClick={handleSubmit}
                                    >
                                    Simpan
                                </Button>
                                <Button
                                    color="yellow"
                                    onClick={handleClose}
                                    >
                                    Cancel
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )

}