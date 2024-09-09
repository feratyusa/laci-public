import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { BanknotesIcon, PlusIcon, TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import BudgetTable from "./BudgetTable";
import eventCategories from "@/Base/EventCategory";

export default function DetailsFormDialog({variant="icon", budget=[], details=[]}){
    const {data, setData, processing, post, put, delete: destroy} = useForm({
        details: [...details]
    })

    const [open, setOpen] = useState(localStorage.getItem('dialog') ? true : false )

    function handleAddDetailForm(){
        let defaultName = ''
        if(!details.find(d => d.name == 'In House Training') && !data.details.find(d => d.name == 'In House Training')){
            defaultName = 'In House Training'
        }
        else if(! details.find(d => d.name == 'Public Training') && !data.details.find(d => d.name == 'Public Training')){
            defaultName = 'Public Training'
        }
        const newDetail = [...data.details, {id: null, name: defaultName, value: 0}]
        setData('details', newDetail)
    }

    function handleDeleteDetailForm(index){
        const newDetails = [...data.details]
        newDetails.splice(index, 1)
        setData('details', newDetails)
    }

    function handleChangeInput(value, index, attribute){
        const newDetail = [...data.details]
        newDetail[index][attribute] = value
        setData('details', newDetail)
    }

    function handleCancel(){
        setData('details', [...details])
        setOpen(false)
        localStorage.removeItem('error')
        localStorage.removeItem('dialog')
    }

    function handleSubmit(){
        put(route('budget.details.update', [budget.id]), {  
            preserveScroll: true,
            preserveState: true,          
            onSuccess: () => {
                localStorage.clear()
            },
            onError: (e) => {
                const message = "name must be alphabet / whitespace and budget maximum digits is 15"
                localStorage.setItem('error', message)
                localStorage.setItem('dialog', 1)                
            }
        })        
    }

    return(
        <>
            {
                <Tooltip content="Atur Detail Anggaran">
                    <Button onClick={() => setOpen(!open)} size="sm" className="flex items-center gap-2 p-2" color="amber">
                        <BanknotesIcon className="w-5" />
                        Detail
                    </Button>
                </Tooltip>
            }
            <Dialog 
                open={open} 
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
                    className="w-full max-w-2xl max-h-[80vh] overflow-auto space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0"
                >
                    <DialogTitle className="text-center">
                        <p className='uppercase font-bold'>Pengaturan Detail Anggaran</p>
                        <p className='text-xs italic text-gray-500'>Tahun: {budget.year}</p>
                    </DialogTitle>
                        <div className='py-5'>
                            <div className="mb-5">
                                <BudgetTable budget={budget} details={data.details}/>
                            </div>
                            {
                                localStorage.getItem('error') && 
                                <div className="flex items-center gap-2 justify-center p-2 mb-5 text-red-500">
                                    <XCircleIcon className="w-5"/>
                                    <p>{localStorage.getItem('error')}</p>
                                </div>
                            }
                            <div className="grid grid-cols-12 items-center gap-2 py-2 font-bold border-b-2 border-red-300 bg-red-500 text-white px-2">
                                <div className="col-span-1">
                                    <p>ID</p>
                                </div>
                                <div className="col-span-5">
                                    <p>Nama</p>
                                </div>
                                <div className="col-span-5">
                                    <p>Anggaran</p>
                                </div>
                            </div>
                            {
                                data.details.length == 0 ?
                                <div className="flex justify-center items-center bg-gray-300 p-3 mb-3">
                                    <p className="text-black font-bold uppercase">Kosong</p>
                                </div>
                                :
                                data.details.map((detail, index) => (
                                    <div className="grid grid-cols-12 items-center gap-2 mt-2 mb-3 px-2">
                                        <div className="col-span-1">
                                            <p className="font-bold">{detail.id ?? <span className="text-green-500">N</span>}</p>
                                        </div>
                                        <div className="col-span-5">
                                            <input 
                                                placeholder="Nama Detail"
                                                value={detail.name}
                                                onChange={(e) => handleChangeInput(e.target.value, index, 'name')}
                                                className="w-full rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-5">
                                            <CurrencyInput 
                                                prefix="Rp "
                                                value={detail.value}
                                                onValueChange={(value) => handleChangeInput(value, index, 'value')}
                                                className="w-full rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-1">
                                            <IconButton onClick={() => handleDeleteDetailForm(index)}>
                                                <TrashIcon className="w-full"/>
                                            </IconButton>
                                        </div>                                        
                                    </div>
                                ))
                            }
                            <Button className="flex justify-center items-center gap-2 p-2 w-full" color="blue" size="sm" onClick={() => handleAddDetailForm()}>
                                <PlusIcon className="w-5"/>
                                Detail Anggaran
                            </Button>
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