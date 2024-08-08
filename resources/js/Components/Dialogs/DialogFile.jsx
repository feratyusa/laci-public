import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useForm } from "@inertiajs/react";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import MultipleFileInput from "../MultipleFileInput";
import InputError from "../InputError";
import ReactSelect from "react-select";
import InputLabel from "../InputLabel";
import TextInput from "../TextInput";

export default function DialogFile({route, proposals, events, categories}){
    const [open, setOpen] = useState(false)
    const [relationName, setRelationName] = useState("Relasi")
    const [relationDisabled, setRelationDisabled] = useState(true)
    const [relationOpt, setRelationOpt] = useState(false)
    
    const {data, setData, processing, post, errors, reset} = useForm({
        name: '',
        relation: '',
        relation_id: '',
        category: '',
        files: '',
    })
    
    const relations = [
        {value: 'Proposal', label: 'Proposal'},
        {value: 'Event', label: 'Event'}
    ]
    
    const handleOpen = () => setOpen(!open)

    const handleClose = () => {
        setOpen(!open)
        reset()
    }

    function handleRelationChange(e){
        if(e.value === 'Proposal'){
            setRelationDisabled(false)
            setRelationName(e.value)
            setRelationOpt(proposals)
        }
        else if(e.value === 'Event'){
            setRelationDisabled(false)
            setRelationName(e.value)
            setRelationOpt(events)
        }
        setData('relation', e.value)
    }
    
    function handleSubmit(e){
        e.preventDefault()
        post(route, {forceFormData:true})
    }    

    return(
        <>
            <Button onClick={handleOpen} color="blue" className="flex flex-row items-center gap-3">
                <DocumentPlusIcon className="h-5 w-5"/>
                <Typography>
                    File
                </Typography>
            </Button>
            <Dialog open={open} as="div" className="z-10 focus:outline-none max-h-screen" onClose={handleClose}>
                {/* Backdrop */}
                <DialogBackdrop className="fixed inset-0 bg-black/5" />

                {/* Dialog Content */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-2xl max-h-screen rounded-xl bg-white p-10 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 overflow-auto"
                            >
                            <DialogTitle className="font-bold text-2xl">Tambah File</DialogTitle>
                            <form onSubmit={handleSubmit} className="my-4 flex flex-col gap-5">
                                <div>
                                    <InputLabel value="Nama File" htmlFor="name" 
                                        className="font-bold text-sm" />
                                    <TextInput 
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        placeholder="Nama File"
                                        autoComplete="name"
                                        isFocused={true}
                                        className="border-x-0 border-t-0 rounded-none border-b-gray-500 focus:ring-gray-900 focus:border-gray-900   "
                                        onChange={(e) => setData('name', e.target.value)}
                                    />

                                    <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                </div>
                                <div>
                                    <InputLabel value="Tipe Relasi" htmlFor="relation" 
                                        className="font-bold text-sm" />

                                    <ReactSelect
                                        name="relation"
                                        placeholder="Relasi File" 
                                        classNamePrefix="select2-selection"
                                        onChange={(e) => handleRelationChange(e)}
                                        options={relations}
                                    />

                                    <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                </div>
                                <div>
                                    <InputLabel value={relationName} htmlFor="relation" 
                                        className="font-bold text-sm" />

                                    <ReactSelect
                                        name="relation"
                                        placeholder="Relasi File" 
                                        classNamePrefix="select2-selection"
                                        onChange={(e) => setData('relation_id', e.value)}
                                        options={relationOpt}
                                        isDisabled={relationDisabled}
                                        isSearchable={true}
                                    />

                                    <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                </div>
                                <div>
                                    <InputLabel value="Kategori" htmlFor="category" 
                                        className="font-bold text-sm" />

                                    <ReactSelect
                                        name="category"
                                        placeholder="Kategori File" 
                                        classNamePrefix="select2-selection"
                                        onChange={(e) => setData('category', e.value)}
                                        options={categories}
                                    />

                                    <InputError message={errors.name} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                </div>
                                <div>
                                    <InputLabel value="Upload File(s)" htmlFor="files" 
                                        className="font-bold text-sm" />

                                    <MultipleFileInput
                                        id="files"
                                        name="files"
                                        onChange={(e) => setData('files', e.target.files)}
                                        files={data.files} 
                                        multiple
                                    />
                                </div>
                            </form>
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="yellow"
                                    onClick={handleClose}
                                    >
                                    Cancel
                                </Button>
                                <Button
                                    color="green"
                                    onClick={handleSubmit}
                                    >
                                    Submit
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}