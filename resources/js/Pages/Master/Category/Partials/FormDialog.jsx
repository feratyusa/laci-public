import InputError from '@/Components/Form/InputError'
import InputInstruction from '@/Components/Form/InputInstruction'
import TextInput from '@/Components/Form/TextInput'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useForm } from '@inertiajs/react'
import { Button, IconButton } from '@material-tailwind/react'
import { useState } from 'react'    

export default function FormDialog({variant="icon", mode='create', route, category=[]}){
  const [isOpen, setIsOpen] = useState(false)
  const {data, setData, errors, clearErrors, post, put, processing, reset} = useForm({
    id: category?.id ?? "",
    name: category?.name ?? ""
  })
  const title = mode == 'create' ? 'Buat Kategori Baru' : 'Edit Kategori'

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
      {
        variant === 'text' ? 
        <Button onClick={() => setIsOpen(true)} color={mode === 'edit' ? 'amber' : 'blue'}  className='flex items-center gap-2 p-3'>
          <div>
          <PlusIcon className='w-5'/>

          </div>
          <div>
          <p className='uppercase'>File Kategori</p>

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
              {category.length > 0 ? <p className='text-xs italic text-gray-500'>Kategori: {category.name}</p> : ''}
            </DialogTitle>
            <div className='grid grid-rows-2 gap-5 py-5'>
              <div>
                <label htmlFor='id-kategori'>
                  ID Kategori
                </label>
                <TextInput 
                  id="id-kategori"
                  placeholder="ID"
                  value={data.id}
                  onChange={(e) => setData('id', e.target.value)}
                />
                {errors.id == null ? <InputInstruction text='Uppercase A - Z tanpa whitespace'/> 
                  : <InputError message={errors.id} className="mt-2" color='red-500' iconSize='5' textSize='sm'/> }
              </div>
              <div>
                  <label htmlFor='nama'>
                    Nama Kategori
                  </label>
                  <TextInput 
                    id="nama"
                    className='col-span-9'
                    placeholder="Nama Kategori"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                  />
                  {errors.name == null ? <InputInstruction text='Uppercase A - Z'/> 
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