import { createStandardOrCountry, updateStandard } from '@/utils/apis'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface Payload {
    ab?: string;
    country?: {
      name: string;
      code: string;
    };
    standard?:{
      name: string;
      code: string;
    }
  }
  

function AddFormModal({ addForm, setAddForm, title , cbName , abName }: any) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let [loading,setLoading] = useState(false)
    const submitHandler =async (formdata: any) => {
        let payload: Payload={ab: abName};
        if(title==="Country"){
            payload.country={name: formdata.name , code: formdata.code}
        }else{
            payload.standard={name: formdata.name , code: formdata.code}
        }
        try {
            debugger;
            setLoading(true)
            let res = await createStandardOrCountry(cbName,payload)

            if(res?.success){
                toast.success(res?.msg || "Updated Successfully")
            }else{
                toast.success(res?.msg || "Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setAddForm(false)
            setLoading(false)
        }
    }
    return (
        <div className='bg-black/80 w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center'>
            <div className='bg-white w-full max-w-[600px] shadow-md rounded-md py-4 px-6'>
                <div className='flex justify-between items-center'>
                    <h3 className='text-xl font-semibold text-black'>Add {title}</h3>
                    <X className=' cursor-pointer' onClick={() => setAddForm(false)} />
                </div>
                <form className='mt-4' onSubmit={handleSubmit(submitHandler)}>
                    <Input id="name" className='mt-3' placeholder='Name' {...register('name', { required: 'Name is required' })} />
                    {
                        errors.name && (
                            <p className="text-sm text-red-600 mt-2">{errors.name.message as string}</p>
                        )
                    }
                    <Input className='mt-5' placeholder='Code' {...register('code', { required: 'Code is required' })} />
                    {
                        errors.code && (
                            <p className="text-sm text-red-600 mt-2">{errors.code.message as string}</p>
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

export default AddFormModal