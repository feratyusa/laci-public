import InputError from '@/Components/Form/InputError'
import InputInstruction from '@/Components/Form/InputInstruction'
import TextInput from '@/Components/Form/TextInput'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline'
import { useForm } from '@inertiajs/react'
import { Button, IconButton, Tooltip } from '@material-tailwind/react'
import { useState } from 'react'    
import CurrencyInput from 'react-currency-input-field'

export default function BudgetFormDialog({variant="icon", mode='create', route, budget=[], details=[]}){
  const [isOpen, setIsOpen] = useState(false)
  const {data, setData, errors, clearErrors, post, put, processing, reset} = useForm({
    year: budget?.year ?? "",
    value: budget?.value ?? "0",
    details: []
  })
  const title = mode == 'create' ? 'Buat Tahun Anggaran Baru' : 'Edit Tahun Anggaran'

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
              <p className='uppercase'>Tahun Anggaran</p>
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
              {budget.length > 0 ? <p className='text-xs italic text-gray-500'>Tahun: {budget.year}</p> : ''}
            </DialogTitle>
            <div className='grid grid-rows-2 gap-5 py-5'>
              <div>
                  <label htmlFor='year'>
                    Tahun Anggaran
                  </label>
                  <TextInput 
                    id="year"
                    placeholder="Tahun"
                    value={data.year}
                    onChange={(e) => setData('year', e.target.value)}
                  />
                  {errors.year == null ? <InputInstruction text='Input berupa angka tahun'/> 
                    : <InputError message={errors.year} className="mt-2" color='red-500' iconSize='5' textSize='sm'/> }
              </div>
              <div>
                  <label htmlFor='value'>
                    Total Anggaran
                  </label>
                  <CurrencyInput
                    id='value'  
                    prefix='Rp '
                    className='w-full'
                    placeholder='Anggaran'
                    value={data.value}
                    onValueChange={(value) => setData('value', value)}
                  />
                  {errors.value == null ? <InputInstruction text='Input berupa angka nominal'/> 
                    : <InputError message={errors.value} className="mt-2" color='red-500' iconSize='5' textSize='sm'/> }
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