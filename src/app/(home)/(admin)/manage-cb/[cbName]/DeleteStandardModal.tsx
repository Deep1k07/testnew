'use client'

import { deleteStandardApi } from '@/utils/apis';
import React, { useState } from 'react'
import { toast } from 'sonner';

function DeleteStandardModal({ deleteStandard, setDeleteStandard, data, cbName, abName, mutate }: any) {
    let [loading, setloading] = useState(false)
    const deleteHandler =async () => {
   

        let payload = {
            ab: abName,
            standard: {
                name: data?.name,
                code: data?.code,
            }
        }
      
        try {
            setloading(true)
            let res = await deleteStandardApi(cbName,payload)

            if(res?.success){
                toast.success(res?.msg || "Updated Successfully")
                mutate()
            }else{
                toast.success(res?.msg || "Something went wrong")
            }
        } catch (error) {
            console.log(error)
        }finally{
             setDeleteStandard(false)
             setloading(false)
        }
    }
    return (
        <>
            {
                <div className="bg-black/80 w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
                    <div className="bg-white w-full max-w-[300px] shadow-md  rounded-md py-6 px-8 flex justify-center items-center">
                        <div className='w-full'>
                            <h3 className='text-xl font-semibold  text-center text-black'>Are you sure ?</h3>
                            <div className='flex justify-between mt-[40px]'>
                                <button onClick={() => setDeleteStandard(false)} className='bg-black hover:bg-black/80 rounded-md px-3 py-2 text-white font-medium'>Cancel</button>
                                <button onClick={() => deleteHandler()} className='bg-red-600 hover:bg-red-600/80 rounded-md px-3 py-2 text-white font-medium'>{loading?"Deleting...":"Delete"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>

    )
}

export default DeleteStandardModal