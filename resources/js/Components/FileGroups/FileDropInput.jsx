import { useForm } from "@inertiajs/react"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import ReactSelect from "react-select"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react"
import { Button } from "@material-tailwind/react";
import InputLabel from "../Form/InputLabel";
import TextInput from "../Form/TextInput";
import InputError from "../Form/InputError";
import { FileExtensions } from "@/Base/FileExtensions"
import MultipleFileInput from "../Form/MultipleFileInput"

function CategorySelection({data, setData, errors}){
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('/api/input/categories')
            .then((response) => {
                setCategories(response.data.categories)
            })
    }, [])

    return(
        <>
            <InputLabel value="Kategori" htmlFor="category" 
                className="font-bold text-sm" />

            <ReactSelect
                name="category"
                placeholder="Kategori File" 
                classNamePrefix="select2-selection"
                className="w-full"
                options={categories}
                value={categories.find(c => c.value.localeCompare(data.category) === 0)}
                onChange={(e) => setData('category_id', e.value)}
                getOptionValue={(option) => option.value}
            />

            <InputError message={errors.category_id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/>
        </>
    )
}

export default function FileDropInput({
    name= '',
    category_id,
    route='',    
}){
    const {data, setData, post, errors, processing, reset} = useForm({
        name: name,
        category: category_id,
        files: ''
    })

    console.log(errors)

    const [open, setOpen] = useState(false)

    function handleCancel(){
        setOpen(false)
        reset()    
    }

    function handleOpenInput(value){
        setData('files', value)
        setOpen(true)
    }
    
    function handleSubmit(){
        post(route, {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setOpen(false)
            }
        })
    }

    console.log(data)

    return(
        <>                            
            <input
                id="input-file" 
                type="file"
                className="py-5 px-2 rounded-lg border-2 border-red-500 hover:bg-red-100 w-full
                    file:text-white file:bg-red-500 file:border-none file:rounded-md file:px-5 file:py-2
                "
                onChange={(e) => handleOpenInput(e.target.files)}
                accept={[FileExtensions.pdf, FileExtensions.doc]}
            />
            <Dialog open={open} as="div" className="z-10 focus:outline-none max-h-screen" onClose={() => setOpen(true)}>
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
                                    <CategorySelection data={data} setData={setData} errors={errors}/>
                                </div>
                                <div>
                                    <InputLabel value="Upload File(s)" htmlFor="files" 
                                        className="font-bold text-sm" />

                                    <MultipleFileInput
                                        id="files"
                                        name="files"
                                        onChange={(e) => setData('files', e.target.files)}
                                        files={data.files}                                        
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
                                    onClick={handleCancel}
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