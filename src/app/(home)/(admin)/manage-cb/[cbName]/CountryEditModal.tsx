'use client'
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { updateCountry} from '@/utils/apis';
import { toast } from 'sonner';

function CountryEditModal({ visible, setVisible, data, abName, cbName, mutate }: any) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: data?.name || '',
            code: data?.code || '',
        },
    });
    let [loading, setloading] = useState(false)

    // Update form values when `data` changes
    // useEffect(() => {
    //     reset({
    //         name: data?.name || '',
    //         code: data?.code || '',
    //     });
    // }, [data, reset]);

    const handleStandard = async (formdata: any) => {
        let payload = {
            ab: abName,
            country: {
                name: formdata?.name,
                code: data?.code,
                updated: formdata?.code
            }
        }
        debugger;
        try {
            setloading(true)
            let res = await updateCountry(cbName, payload)

            if (res?.success) {
                toast.success(res?.msg || "Updated Successfully")
                mutate()
            } else {
                toast.success(res?.msg || "Something went wrong")
            }
        } catch (error) {
            console.log(error)
        } finally {
            setVisible(false)
            setloading(false)
        }
    };

    return (
        <>
            {visible && (
                <div className="bg-black/80 w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
                    <div className="bg-white w-full max-w-[600px] shadow-md rounded-md py-4 px-6">
                        <div className="flex justify-between items-center">
                        <h3 className='text-xl font-semibold text-black'>Edit Country</h3>
                            <X className="cursor-pointer" onClick={() => setVisible(false)} />
                        </div>
                        <form onSubmit={handleSubmit(handleStandard)} className="mt-4 w-full">
                            <Input
                                id="name"
                                className="mt-3"
                                {...register('name', { required: 'Name is required' })}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-600 mt-2">{errors.name.message as string}</p>
                            )}
                            <Input
                                className="mt-3"
                                {...register('code', { required: 'Code is required' })}
                            />
                            {errors.code && (
                                <p className="text-sm text-red-600 mt-2">{errors.code.message as string}</p>
                            )}
                            <div className="flex justify-end mt-4">
                                <Button type="submit">{loading? "Submitting...":"Submit"}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default CountryEditModal;
