import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import {  PlusIcon } from '@heroicons/react/24/outline'
import { useForm } from '@inertiajs/react'
import { Button, IconButton } from '@material-tailwind/react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'    
import ReactSelect from 'react-select'

export default function AddDialog({type, route, mandatories=[]}){
  const [isOpen, setIsOpen] = useState(false)
  const {data, setData, errors, clearErrors, post, put, processing, reset} = useForm({
    mandatory_type: type,
    categories: []
  })
  const [categories, setCategories] = useState([])

  function handleSelectChange(selections){
    let values = []
    selections.forEach(element => {
        values.push(element.value)
    });
    setData('categories', values)    
  }

  function handleCancel(){
    clearErrors()
    reset()
    setIsOpen(false)
  }

  function handleSubmit(){
    post(route, {
        preserveScroll: true,
        onSuccess: () => {
            reset()
            setIsOpen(false)
        }
    })
  }

  useEffect(() => {
    axios.get('/api/categories/selections')
        .then(function(response){
            const data = response.data
            setCategories(data.categories)
        })
  }, [])

  return (
    <>
      <Button className='flex item-center gap-2' color='blue' onClick={() => setIsOpen(true)}>
        <PlusIcon className='w-5'/>
        Tambah
      </Button>
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
              <p className='uppercase font-bold'>Tambah Kategori Wajib</p>
              {mandatories.length > 0 ? <p className='text-xs italic text-gray-500'>{type}</p> : ''}
            </DialogTitle>
              <div>
                  <label htmlFor='categories'>
                    Kategori Wajib
                  </label>
                  <div className="grid grid-cols-4 items-center gap-2">
                    {
                        mandatories.map(mandatory => (
                            <div className='p-2 rounded-md uppercase font-bold bg-red-500 text-white text-xs text-center max-h-12 overflow-auto'>
                                {mandatory.category.name}
                            </div>
                        ))
                    }
                  </div>
              </div>
              <div>
                <label htmlFor='add-categories'>
                    Tambah Kategori Wajib
                </label>
                <ReactSelect 
                    options={categories.filter(c => ! mandatories.find(m => m.category.id == c.value))}
                    classNamePrefix="select2-selection"
                    onChange={(e) => handleSelectChange(e)} 
                    value={categories.filter(c => data.categories.includes(c.value))}                   
                    isSearchable
                    isClearable
                    isMulti
                />
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