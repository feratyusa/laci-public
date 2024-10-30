import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { Button, IconButton, Tooltip } from "@material-tailwind/react";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import InputLabel from "../Form/InputLabel";
import TextInput from "../Form/TextInput";
import InputError from "../Form/InputError";
import MultipleFileInput from "../Form/MultipleFileInput";
import ReactSelect from "react-select";

export default function DialogAddFile({
    content='', 
    content_name='', 
    content_id='', 
    categories=null,
    as="button", 
    route
}){
    const [open, setOpen] = useState(false)
    const {data, setData, processing, post, errors, clearErrors, reset} = useForm({
        name: content_name,
        relation: content,
        relation_id: content_id,
        category_id: '',
        files: '',
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
        post(route, {
            preserveScroll: true,
            onSuccess: () => handleClose()
        })
    }

    return(
        <>
            {
                as === "button" ? 
                <Tooltip content="Tambah File">
                    <IconButton onClick={handleOpen} color="green">
                        <DocumentPlusIcon className="h-5 w-5"/>
                    </IconButton>
                </Tooltip>
                :
                <Tooltip content="Tambah File">
                    <Button className="flex items-center gap-3" onClick={handleOpen} color="green">
                        <DocumentPlusIcon className="h-5 w-5"/>
                        Tambah File
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
                                    <InputLabel value="Kategori" htmlFor="category" 
                                        className="font-bold text-sm" />

                                    <ReactSelect
                                        name="category"
                                        placeholder="Kategori File" 
                                        classNamePrefix="select2-selection"
                                        className="w-full"
                                        options={categories}
                                        value={categories.find(c => c.value.localeCompare(data.category_id) === 0)}
                                        onChange={(e) => setData('category_id', e.value)}
                                        getOptionValue={(option) => option.value}
                                    />

                                    <InputError message={errors.category_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
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
                                    
                                    <InputError message={errors.files} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>

                                    {
                                        Array.from(Array(data.files.length), (e, index) => (
                                            <InputError message={errors["files."+index]} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
                                        ))
                                    }
                                </div>
                            </form>
                            <div className="flex flex-row justify-center gap-5 mt-8">
                                <Button
                                    color="green"
                                    loading={processing}
                                    onClick={handleSubmit}
                                    >
                                    Submit
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