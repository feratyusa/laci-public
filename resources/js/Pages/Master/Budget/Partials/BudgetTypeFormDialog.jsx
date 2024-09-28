import InputError from "@/Components/Form/InputError"
import InputInstruction from "@/Components/Form/InputInstruction"
import TextInput from "@/Components/Form/TextInput"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useForm } from "@inertiajs/react"
import { Button, IconButton, Tooltip } from "@material-tailwind/react"
import { useState } from "react"

export default function BudgetTypeFormDialog({budgetType={name: ''}, variant='icon', mode='create', route}){
    const [isOpen, setIsOpen] = useState(false)
    const {data, setData, errors, clearErrors, post, put, processing, reset} = useForm({
        name: budgetType.name
    })
    const title = mode == 'create' ? 'Buat Tipe Anggaran Baru' : 'Edit Tipe Anggaran'

    function handleCancel(){
        clearErrors()
        reset()
        setIsOpen(false)
    }

    function handleSubmit(){
        if(mode === 'edit') {      
            put(route, {
                onSuccess: () => setIsOpen(false)
            })
        }
        else{
            post(route, {
                onSuccess: () => setIsOpen(false)
            })
        }   
    }

    return (
        <>
        <Tooltip content={title}>
            {
            variant === 'text' ? 
            <Button onClick={() => setIsOpen(true)} color={mode === 'edit' ? 'amber' : 'blue'}  className='flex items-center gap-2 p-3'>
                <div>
                {mode == 'edit' ? <Cog6ToothIcon className='w-full'/> : <PlusIcon className='w-5'/>}
                </div>
                <div>
                <p className='uppercase'>Tipe Anggaran</p>
                </div>
            </Button>
            :
            <IconButton onClick={() => setIsOpen(true)} size='sm' color={mode == 'edit' ? 'amber' : 'blue'}>
                {
                mode == 'edit' ? 
                <Cog6ToothIcon className='w-full'/>
                :
                <PlusIcon className='w-full'/>
                }
            </IconButton>
            }
        </Tooltip>
        <Dialog
            open={isOpen} 
            onClose={() => handleCancel()} 
            className="relative z-50"
        >
            <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/30 ease-in duration-200 data-[closed]:opacity-0"
            />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel 
                    transition
                    className="w-full max-w-2xl space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0"
                >
                    <DialogTitle className="text-center">
                        <p className='uppercase font-bold'>{title}</p>
                    </DialogTitle>
                    <div className='py-5'>
                        <div className='mb-5'>
                            <label htmlFor='name'>
                                Nama
                            </label>
                            <TextInput 
                                id="name"
                                placeholder="Nama Anggaran"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            {errors.name == null ? <InputInstruction text='Input berupa string'/> 
                                : <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/> }
                        </div>                
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        <Button onClick={() => handleSubmit()} color="blue">Submit</Button>
                        <Button onClick={() => handleCancel()} color="amber">Cancel</Button>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
        </>
    )
}