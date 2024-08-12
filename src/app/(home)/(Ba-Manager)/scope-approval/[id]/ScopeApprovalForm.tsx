"use client"
import { approvedScopeById } from '@/utils/apis';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';

function ScopeApprovalForm({ id }: any) {

    const {data} = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/scopeManager/${id}`,fetcher)
    const scopeData = data?.data
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        defaultValues: scopeData
    });
    const handleReject = async (formData: any) => {
        try {
            debugger;
            let data = await approvedScopeById(id, formData);
            if (data?.success) {
                toast.success(data?.msg || "Reject successfully");
                reset()
            } else {
                toast.error(data?.msg || "Failed Reject")
            }

        } catch (errors) {

        }
    }

    const handleApprove = async () => {
        let payload = { isApproved: 'true' };
        try {
            debugger;
            let data = await approvedScopeById(id, payload);
            if (data?.success) {
                toast.success(data?.msg || "Reject successfully");
                reset()
            } else {
                toast.error(data?.msg || "Failed Reject")
            }

        } catch (errors) {

        }
    }
    return (
        <div className='bg-white shadow-md rounded-md py-4 px-3 relative'>
            <form onSubmit={handleSubmit(handleReject)}>
                <div className='flex gap-x-4'>
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
                <div className='flex gap-x-4 mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Scope</label>
                        <Input className="mt-1" {...register('scope', { required: "Scope is required" })} />
                        {errors.scope && <p className="text-red-500">{errors?.scope?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Flag</label>
                        <select className="py-2 border mt-1 w-full border-gray-200 text-gray-500 rounded-sm px-2 focus:border-gray-200 focus:outline-none"
                            {...register('flag', { required: "Flag is required" })}
                        >
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
                <div className='flex gap-x-4 mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>IAF Code</label>
                        <Input className="mt-1" {...register('iaf_code', { required: "IAF Code is required" })} />
                        {errors.iaf_code && <p className="text-red-500">{errors?.iaf_code?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Standard</label>
                        <Input className="mt-1" {...register('standard', { required: "Standard Code is required" })} />
                        {errors.standard && <p className="text-red-500">{errors?.standard?.message as string}</p>}
                    </div>
                </div>
                <div className='flex gap-x-4 mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>BA Manager Name</label>
                        <Input className="mt-1" {...register('ba_manager', { required: "BA Manager Name is required" })} />
                        {errors.ba_manager && <p className="text-red-500">{errors?.ba_manager?.message as string}</p>}
                    </div>
                    <div className="w-full flex gap-x-2 items-end">
                        <div className="w-full">
                            <label className='text-gray-500'>AB Name</label>
                            <Input className="mt-1"  {...register('ab_name', { required: "AB Name is required" })} />
                            {errors.ab_name && <p className="text-red-500">{errors?.ab_name?.message as string}</p>}
                        </div>

                    </div>
                </div>
                <div className='flex gap-x-4 mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Drive Link </label>
                        <Input className="mt-1" {...register('drive_link', { required: "Drive Link is required" })} />
                        {errors.drive_link && <p className="text-red-500">{errors?.drive_link?.message as string}</p>}
                    </div>
                    <div className="w-full flex gap-x-2 items-end">
                        <div className="w-full">
                            <label className='text-gray-500'>CB Name</label>
                            <Input className="mt-1" {...register('cb_name', { required: "CB Name is required" })} />
                            {errors.cb_name && <p className="text-red-500">{errors?.cb_name?.message as string}</p>}
                        </div>

                    </div>
                </div>
                <div className='flex gap-x-4 mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Created At</label>
                        <Input className="mt-1" {...register('createdAt', { required: "Created At is required" })} />
                        {errors.createdAt && <p className="text-red-500">{errors?.createdAt?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Number Of Employee</label>
                        <Input className="mt-1"  {...register('employee_count', { required: "Created At is required" })} />
                        {errors.employee_count && <p className="text-red-500">{errors?.employee_count?.message as string}</p>}
                    </div>
                </div>
                {/* <div className='flex gap-x-4 mt-3'>
            <div className="w-full">
                <label className='text-gray-500'>Add Comments</label>
                <Textarea className='mt-1'  {...register('add_comments', { required: "Created At is required" })} />
                {errors.add_comments && <p className="text-red-500">{errors?.add_comments?.message as string}</p>}
            </div>
            </div> */}
                <div className="flex gap-x-4 justify-end mt-4 pr-[100px]">
                    <Button type='submit'>
                        Reject
                    </Button>

                </div>
            </form>
            <Button onClick={handleApprove} className='bg-green-600 hover:bg-green-600/90 absolute right-[15px] bottom-[15px] '>
                Approve
            </Button>
        </div>
    )
}

export default ScopeApprovalForm
