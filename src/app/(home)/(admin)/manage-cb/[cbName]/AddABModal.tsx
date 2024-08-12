import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

function AddABModal({addAB,setAddAB}:any) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [loading,setLoading] = useState(false)
  return (
    <div className='bg-black/80 w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center'>
            <div className='bg-white w-full max-w-[600px] shadow-md rounded-md py-4 px-6'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl font-semibold text-black'>Add Ab</h3>
                    <X className=' cursor-pointer' onClick={()=>setAddAB(false)} />
                </div>
                <form className='mt-4'>
                    <Input id="name" className='mt-3' placeholder='Name' {...register('name', { required: 'Name is required' })} />
                    {
                        errors.name && (
                            <p className="text-sm text-red-600 mt-2">{errors.name.message as string}</p>
                        )
                    }
                    <div className='flex justify-end mt-4'>
                        <Button type='submit'>{loading? "Submitting...":"Submit"}</Button>
                    </div>
                </form>
            </div>
        </div>
  )
}

export default AddABModal