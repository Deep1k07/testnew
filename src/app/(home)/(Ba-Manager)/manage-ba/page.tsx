"use client"

import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import BAListTable from './BAListTable'


function BaCreatePage() {
    const router = useRouter()
    return (
        <>
            <div className='bg-white shadow-md rounded-md py-4'>
                <div className='flex justify-between items-center border-b-2 pb-3  border-red-400 px-6'>
                    <h3 className='text-base text-black font-semibold pt-4 pb-4 px-3'>All BA List</h3>
                    <Button onClick={() => router.push("/manage-ba/create-ba")}>Create BA</Button>
                </div>
                <div className=''>
                    <BAListTable />
                </div>
            </div>
        </>
    )
}

export default BaCreatePage