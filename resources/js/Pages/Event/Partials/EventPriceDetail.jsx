import DeleteDialog from "@/Pages/Master/Partials/DeleteDialog";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { BanknotesIcon, PlusIcon, TrashIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "@inertiajs/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import CurrencyInput from "react-currency-input-field";
import ReactSelect from "react-select";

function BudgetTypeSelection({data, detail, index, handleChangeInput}){
    const [budgetTypes, setBudgetTypes] = useState([])

    useEffect(() => {
        axios.get('/api/input/budgetTypes').then((response) => {
            setBudgetTypes(response.data.budgetTypes)
        })
    }, [])

    return(
        <ReactSelect
            id="budgetType"
            name="budgetType"
            classNamePrefix="select2-selection"
            className="text-left max-w-2xl focus:border-red-500"
            value={budgetTypes.find(b => b.value == detail.budget_type_id)}
            options={budgetTypes.filter(type => !data.details.find(d => type.value == d.budget_type_id))}
            onChange={(e) => handleChangeInput(Number(e.value), index, 'budget_type_id')}
            required
        />
    )
}

export default function EventPriceDetail({event, details}){
    const {data, setData, processing, put, delete: destroy, reset, errors} = useForm({
        details: [...details]
    })        

    const [open, setOpen] = useState(localStorage.getItem('dialog') ? true : false )

    function handleAddDetailForm(){        
        const newDetail = [...data.details, {id: null, budget_type_id: null, price: 0, defaultParticipants: false, participantNum: 0}]
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
        const defaultDetails = [...details]
        setData('details', defaultDetails)        
        setOpen(false)
        localStorage.removeItem('error')
        localStorage.removeItem('dialog')
    }

    function handleSubmit(){
        put(route('event.setPrices', [event.id]), {  
            preserveScroll: true,
            preserveState: false,          
            onSuccess: () => {
                localStorage.clear()
                setOpen(false)
            },
            onError: (e) => {
                console.log(e)
                const message = "budget type is required and budget maximum digits are 15"
                localStorage.setItem('error', message)
                localStorage.setItem('dialog', 1)                
            }
        })        
    }        

    return(
        <>
            {
                <Tooltip content="Atur Detail Anggaran">
                    <Button onClick={() => setOpen(!open)} size="sm" className="flex items-center gap-2 p-2" color={`${event?.defaultPrices ? 'red' : 'green'}`}>
                        <BanknotesIcon className="w-5" />
                        Atur Anggaran
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
                    className="w-full max-w-4xl max-h-[80vh] space-y-4 rounded-2xl bg-white p-12 ease-in duration-200 data-[closed]:opacity-0"
                >
                    <DialogTitle className="text-center">
                        <p className='uppercase font-bold'>Pengaturan Detail Anggaran (Biaya/individu)</p>
                        <p className='text-xs italic text-gray-500'>Event: {event?.name}</p>
                    </DialogTitle>
                        <div className='py-5'>                            
                            {
                                localStorage.getItem('error') && 
                                <div className="flex items-center gap-2 justify-center p-2 mb-5 text-red-500">
                                    <XCircleIcon className="w-5"/>
                                    <p>{localStorage.getItem('error')}</p>
                                </div>
                            }
                            <div className="text-center grid grid-cols-12 items-center gap-2 py-2 font-bold border-b-2 border-red-300 bg-red-500 text-white px-2">
                                <div className="col-span-1">
                                    <p>ID</p>
                                </div>
                                <div className="col-span-3">
                                    <p>Tipe</p>
                                </div>
                                <div className="col-span-3">
                                    <p>Anggaran</p>
                                </div>
                                <div className="col-span-2">
                                    <p>Default Partisipan</p>
                                </div>
                                <div className="col-span-2">
                                    <p>Partisipan</p>
                                </div>
                            </div>
                            {
                                data.details.length == 0 ?
                                <div className="flex justify-center items-center bg-gray-300 p-3 mb-3">
                                    <p className="text-black font-bold uppercase">Kosong</p>
                                </div>
                                :
                                data.details.map((detail, index) => (
                                    <div className="text-center grid grid-cols-12 items-center gap-2 mt-2 mb-3 px-2">
                                        <div className="col-span-1">
                                            <p className="font-bold">{detail.id ?? <span className="text-green-500">N</span>}</p>
                                        </div>
                                        <div className="col-span-3">                                            
                                            <BudgetTypeSelection data={data} detail={detail} index={index} handleChangeInput={handleChangeInput}/>
                                        </div>
                                        <div className="col-span-3">
                                            <CurrencyInput 
                                                prefix="Rp "
                                                value={Number(detail.price)}
                                                onValueChange={(value) => handleChangeInput(Number(value), index, 'price')}
                                                className="w-full rounded-md"
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input 
                                                type="checkbox"
                                                checked={Boolean(detail.defaultParticipants)}
                                                onChange={(e) => handleChangeInput(Number(!detail.defaultParticipants), index, 'defaultParticipants')}
                                            />
                                        </div>
                                        <div className="col-span-2">
                                            <input
                                                type="number"
                                                value={detail.participantNum}
                                                onChange={(e) => handleChangeInput(Number(e.target.value), index, 'participantNum')}
                                                className="w-full rounded-md disabled:text-gray-500"
                                                disabled={Boolean(detail.defaultParticipants)}
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
                    <DeleteDialog variant="text" text={"Reset"} route={route('event.resetPrices', [event.id])} category={'event'} title={'Hapus Semua Anggaran Awal'} body={'Aksi ini tidak dapat dikembalikan'}/>
                    <Button onClick={() => handleCancel()} color="amber">Cancel</Button>
                    </div>
                </DialogPanel>
                </div>
            </Dialog>
        </>
    )
}