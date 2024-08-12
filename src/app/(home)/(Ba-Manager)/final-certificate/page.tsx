"use client"

import { fetcher } from '@/utils/fetcher'
import React, { useState } from 'react'
import useSWR from 'swr'
import FinalCertificatePage from './FinalCerificatePage';


function CertificatePage() {
  
    const { data: certificate } = useSWR<any>(`${process.env.NEXT_PUBLIC_API_URI}/certificateManager/getCertificate`, fetcher);
    let responseData=certificate?.data;
    return (
        <div className='bg-white shadow-md rounded-md py-4'>
            <FinalCertificatePage  responseData={responseData}/>
        </div>
    )
}

export default CertificatePage