"use client"

import { fetcher } from '@/utils/fetcher'
import React, { useState } from 'react'
import useSWR from 'swr'
import DaraftTable from './DaraftTable';

function DraftPage() {
  
    const { data: draft } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/scopeManager/draft`, fetcher);
    let responseData=draft?.data;
    console.log(">>>>>>>>>>>>>>>>>>>>>>Data",draft?.data)
    return (
        <div className='bg-white shadow-md rounded-md py-4'>
            <DaraftTable  responseData={responseData}/>
        </div>
    )
}

export default DraftPage