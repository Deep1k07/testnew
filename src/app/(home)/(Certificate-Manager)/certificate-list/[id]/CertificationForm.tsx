"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea';
import { generateCertificate } from '@/utils/apis';
import { fetcher } from '@/utils/fetcher';
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';
function CertificationForm({ id }: { id: string }) {
    const { data: scopeData } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/scopeManager/${id}`, fetcher) // get data from id
    const [loading, setLoading] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm({
        defaultValues: scopeData?.data
    });
    const initialIssueDate = watch('initial_issue');
    useEffect(() => {
        if (scopeData) {
            reset(scopeData.data);
        }
    }, [scopeData, reset]);
    useEffect(() => {
        if (initialIssueDate) {
            const currentDate = new Date(initialIssueDate);
            const currentIssueDate = new Date(currentDate.setFullYear(currentDate.getFullYear()));
            const validUntilDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 3));
            const firstSurveillanceDate = new Date(currentDate.setFullYear(currentDate.getFullYear() - 2));
            const secondSurveillanceDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
            const reCertificationDate = new Date(currentDate.setFullYear(currentDate.getFullYear() + 1));
            setValue('current_issue', currentIssueDate.toISOString().split('T')[0]);
            setValue('valid_until', validUntilDate.toISOString().split('T')[0]);
            setValue('first_surveillance', firstSurveillanceDate.toISOString().split('T')[0]);
            setValue('second_surveillance', secondSurveillanceDate.toISOString().split('T')[0]);
            setValue('recertification_due', reCertificationDate.toISOString().split('T')[0]);
        }
    }, [initialIssueDate, setValue]);
    const formHandle = async (formData: any) => {
        delete formData._id;
        delete formData.__v
        try {
            toast.info('Please wait it takes some time...');
            debugger;
            setLoading(true)
            const res = await generateCertificate(formData);

            if (res?.pdfResult?.success) {
                toast.success(res?.pdfResult?.msg || "Certificate Generated Successfully");
                setPdfUrl(res?.pdfResult?.s3PdfUrl)
            } else {
                toast.error(res?.pdfResult?.msg || "Something went wrong");
            }
        } catch (error: any) {
            toast.error(error?.message || "Something went wrong");
        } finally {
            setLoading(false)
            reset();
        }
    }
    return (
        <div className="shadow-md rounded-md bg-white relative">
            <form onSubmit={handleSubmit(formHandle)} className='py-4 px-3'>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-3 sm:gap-y-0'>
                    <div className="w-full">
                        <label className='text-gray-500'>Name Of the Organization</label>
                        <Input className="mt-1" {...register('name', { required: 'Name is required' })} />
                        {errors.name && <p className="text-red-500">{errors?.name?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Address Of the Organization</label>
                        <Input className="mt-1"  {...register('address', { required: 'Address is required' })} />
                        {errors.address && <p className="text-red-500">{errors?.address?.message as string}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 mt-1 sm:mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Scope Manager</label>
                        <Input className="mt-1" {...register('scope_manager', { required: 'Scope Manager is required' })} />
                        {errors.scope_manager && <p className="text-red-500">{errors?.scope_manager?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>IAF Code</label>
                        <Input className="mt-1"  {...register('iaf_code', { required: 'IAF Code is required' })} />
                        {errors.iaf_code && <p className="text-red-500">{errors?.iaf_code?.message as string}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 mt-1 sm:mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Standard</label>
                        <Input className="mt-1" {...register('standard', { required: 'Standard is required' })} />
                        {errors.standard && <p className="text-red-500">{errors?.standard?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>BA Manager Name</label>
                        <Input className="mt-1"  {...register('ba_manager', { required: 'BA Manager Name is required' })} />
                        {errors.ba_manager && <p className="text-red-500">{errors?.ba_manager?.message as string}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 mt-1 sm:mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Drive Link</label>
                        <Input className="mt-1" {...register('drive_link', { required: 'Drive Link is required' })} />
                        {errors.drive_link && <p className="text-red-500">{errors?.drive_link?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Certificate Number</label>
                        <Input className="mt-1"  {...register('certificate_number', { required: 'Certificate Number is required' })} />
                        {errors.certificate_number && <p className="text-red-500">{errors?.certificate_number?.message as string}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 mt-1 sm:mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Initial Issue Date</label>
                        <Input type='date' className="mt-1" {...register('initial_issue', { required: 'Initial Issue Date is required' })} />
                        {errors.initial_issue && <p className="text-red-500">{errors?.initial_issue?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Current Issue Date</label>
                        <Input type='date' className="mt-1"  {...register('current_issue', { required: 'Current Issue Date is required' })} />
                        {errors.current_issue && <p className="text-red-500">{errors?.current_issue?.message as string}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 mt-1 sm:mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Valid Until</label>
                        <Input type='date' className="mt-1" {...register('valid_until', { required: 'Valid Until is required' })} />
                        {errors.valid_until && <p className="text-red-500">{errors?.valid_until?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>First Surveillance Date</label>
                        <Input type='date' className="mt-1"  {...register('first_surveillance', { required: 'First Surveillance Date is required' })} />
                        {errors.first_surveillance && <p className="text-red-500">{errors?.first_surveillance?.message as string}</p>}
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row gap-x-4 gap-y-4 sm:gap-y-0 mt-1 sm:mt-3'>
                    <div className="w-full">
                        <label className='text-gray-500'>Second Surveillance Date</label>
                        <Input type='date' className="mt-1" {...register('second_surveillance', { required: 'Second Surveillance Date is required' })} />
                        {errors.second_surveillance && <p className="text-red-500">{errors?.second_surveillance?.message as string}</p>}
                    </div>
                    <div className="w-full">
                        <label className='text-gray-500'>Recertification Due Date</label>
                        <Input type='date' className="mt-1"  {...register('recertification_due', { required: 'Recertification Due Date is required' })} />
                        {errors.recertification_due && <p className="text-red-500">{errors?.recertification_due?.message as string}</p>}
                    </div>
                </div>
                <div className='mt-2'>
                    <label className='text-gray-500'>Scope Of Activities</label>
                    <Textarea className="mt-1" {...register('scope_of_activities', { required: 'Scope Of Activities is required' })} />
                    {errors.scope_of_activities && <p className="text-red-500">{errors?.scope_of_activities?.message as string}</p>}
                </div>
                <div className='flex justify-end gap-x-4 mt-4'>
                    <Button disabled={loading}>{loading ? "Generating..." : "Generate Certificate"}</Button>
                </div>
            </form>
            { pdfUrl && <div className='absolute left-3 bottom-4'>
                           <a href={pdfUrl} download>
                              <Button>Download PDF file</Button>
                           </a>
                        </div> }
        </div>
    )
}

export default CertificationForm;
