'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form';

function CreateCBModal({ setShowModal }: any) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const formHandler = (data: any) => {
        console.log("data>>>>>>>>", data)
    }
    return (
        <div className='bg-black/80 w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center'>
            <div className='bg-white w-full max-w-[800px]  shadow-md rounded-md py-4 '>
                <div className='flex justify-between items-center border-b-2 border-red-400 px-6 pb-3'>
                    <h3 className='text-lg font-medium text-black '>Create CB</h3>
                    <X onClick={() => setShowModal(false)} className="cursor-pointer text-red-500" size={18} />
                </div>
                <form onSubmit={handleSubmit(formHandler)} className='mt-5 px-6' >
                    <div className='flex gap-x-4'>
                        <div className='w-full'>
                            <Input placeholder='AB'  {...register('ab', { required: 'AB is required' })} />
                            {
                                errors.ab && (
                                    <p className="text-sm text-red-600 mt-2">{errors.ab.message as string}</p>
                                )
                            }
                        </div>
                        <div className='w-full'  >
                            <Input placeholder='CB' {...register('cb', { required: 'CB is required' })} />
                            {
                                errors.cb && (
                                    <p className="text-sm text-red-600 mt-2">{errors.cb.message as string}</p>
                                )
                            }
                        </div>
                    </div>
                    <div className='mt-4'>
                        <label className='font-medium'>Standard</label>
                        <div className='flex gap-x-4 mt-1'>
                            <div className='w-full'>
                                <Input placeholder='Name' {...register('standardName', { required: 'Standard Name is required' })} />
                                {
                                    errors.standardName && (
                                        <p className="text-sm text-red-600 mt-2">{errors.standardName.message as string}</p>
                                    )
                                }
                            </div>
                            <div className='w-full'>
                                <Input placeholder='Code' {...register('standardCode', { required: 'Standard Code is required' })} />
                                {
                                    errors.standardCode && (
                                        <p className="text-sm text-red-600 mt-2">{errors.standardCode.message as string}</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <label className='font-medium'>Country</label>
                        <div className='flex gap-x-4 mt-1'>
                            <div className='w-full'>
                                <Input placeholder='Name' {...register('countryName', { required: 'Country Name is required' })} />
                                {
                                    errors.countryName && (
                                        <p className="text-sm text-red-600 mt-2">{errors.countryName.message as string}</p>
                                    )
                                }
                            </div>
                            <div className='w-full'>
                                <Input placeholder='Code' {...register('countryCode', { required: 'Country Code is required' })} />
                                {
                                    errors.countryCode && (
                                        <p className="text-sm text-red-600 mt-2">{errors.countryCode.message as string}</p>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 flex justify-end'>
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default CreateCBModal