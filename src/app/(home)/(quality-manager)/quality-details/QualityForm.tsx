"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form';
const QualityForm = ({scope}:any) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        defaultValues: scope
    });
    const FormHandling = (formData: any) => {
        console.log(formData);
        setTimeout(() => {
            reset();
        }, 1000);
    }
  return (
    <div className='bg-white shadow-md rounded-md py-4 px-3'>
    <form onSubmit={handleSubmit(FormHandling)}>
        <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 '>
            <div className="w-full">
                <label className='text-gray-500'>Name Of the Organization</label>
                <Input className="mt-1"  {...register('name', { required: "Name is required" })} />
                {errors.name && <p className="text-red-500">{errors?.name?.message as string}</p>}
            </div>
            <div className="w-full">
                <label className='text-gray-500'>Address Of the Organization</label>
                <Input className="mt-1" {...register('address', { required: "Address is required" })} />
                {errors.address && <p className="text-red-500">{errors?.address?.message as string}</p>}
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-x-4 gap-y-3 mt-3'>
            <div className="w-full">
                <label className='text-gray-500'>Scope</label>
                <Input className="mt-1" {...register('scope', { required: "Scope is required" })} />
                {errors.scope && <p className="text-red-500">{errors?.scope?.message as string}</p>}
            </div>
            <div className="w-full">
                <label className='text-gray-500'>Flag</label>
                <select className="py-2 border mt-1 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                    {...register('flag', { required: "Flag is required" })}>
                    <option className='text-gray-500' value="">Select Flag</option>
                    <option className='text-gray-500' value="1">1</option>
                    <option className='text-gray-500' value="2">2</option>
                    <option className='text-gray-500' value="3">3</option>
                    <option className='text-gray-500' value="4">4</option>
                    <option className='text-gray-500' value="5">5</option>
                </select>
                {errors.flag && <p className="text-red-500">{errors?.flag?.message as string}</p>}
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-x-4 gap-y-3 mt-3'>
            <div className="w-full">
                <label className='text-gray-500'>IAF Code</label>
                <Input className="mt-1"  {...register('iaf_code', { required: "IAF Code is required" })} />
                {errors.iaf_code && <p className="text-red-500">{errors?.iaf_code?.message as string}</p>}
            </div>
            <div className="w-full">
                <label className='text-gray-500'>Standard</label>
                <Input className="mt-1" {...register('standard', { required: "Standard Code is required" })} />
                {errors.standard && <p className="text-red-500">{errors?.standard?.message as string}</p>}
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-x-4 gap-y-3 mt-3'>
            <div className="w-full">
                <label className='text-gray-500'>BA Manager Name</label>
                <Input className="mt-1"  {...register('ba_manager', { required: "BA Manager is required" })} />
                {errors.ba_manager && <p className="text-red-500">{errors?.ba_manager?.message as string}</p>}
            </div>
            <div className="w-full">
                <label className='text-gray-500'>Drive Link </label>
                <Input className="mt-1" {...register('drive_link', { required: "Drive Link is required" })} />
                {errors.drive_link && <p className="text-red-500">{errors?.drive_link?.message as string}</p>}
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-x-4 gap-y-3 mt-3'>
            <div className="w-full">
                <label className='text-gray-500'>Number Of Employee</label>
                <Input className="mt-1" {...register('employee_count', { required: "Number Of Employee is required" })} />
                {errors.employee_count && <p className="text-red-500">{errors?.employee_count?.message as string}</p>}
            </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-x-4 gap-y-3 mt-3'>
            <div className="w-full">
                <label className='text-gray-500'>Add Comments</label>
                <Textarea className='mt-1'  {...register('add_comments', { required: "Add comment is required" })} />
                {errors.add_comment && <p className="text-red-500">{errors?.add_comment?.message as string}</p>}
            </div>
        </div>
        <div className="flex justify-end mt-4 pr-2">
            <Button type='submit'>
                Save
            </Button>
        </div>
    </form>
</div>
  )
}
export default QualityForm
