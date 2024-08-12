'use client'
import { DeleteUser } from '@/utils/apis'
import React, { useState } from 'react'
import { toast } from 'sonner'

function DeleteClientModal({deleteClient,setDeleteClient,idData , mutate}:any) {
    const [loading,setLoading] = useState(false)
    const deleteHandler=async(id:any)=>{
        try {
            setLoading(true)
            const res = await DeleteUser(id)
            if(res?.success){
                toast.success(res.msg || "Success")
                mutate()
            }else{
                toast.error(res.msg || "Failed")
            }
        } catch (error) {
            console.log(error)
        }finally{
            setDeleteClient(false)
            setLoading(false)
        }
    }
  return (
    <div>
         {
                <div className="bg-black/80 w-full h-screen fixed top-0 left-0 z-50 flex justify-center items-center">
                    <div className="bg-white w-full max-w-[300px] shadow-md  rounded-md py-6 px-8 flex justify-center items-center">
                        <div className='w-full'>
                            <h3 className='text-xl font-semibold  text-center text-black'>Are you sure ?</h3>
                            <div className='flex justify-between mt-[40px]'>
                                <button onClick={() => setDeleteClient(false)} className='bg-black hover:bg-black/80 rounded-md px-3 py-2 text-white font-medium'>Cancel</button>
                                <button onClick={()=>deleteHandler(idData)}   className='bg-red-600 hover:bg-red-600/80 rounded-md px-3 py-2 text-white font-medium'>{loading?"Deleting...":"Delete"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
    </div>
  )
}

export default DeleteClientModal