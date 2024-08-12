'use client'
import React from 'react';
import CBTable from './CbTable';
import CreateCbButton from './CreateCbButton';
import { redirect } from 'next/navigation';

const ManageCb = ()=> { 
   
    const headerList = [
        "S.No",
        "Cb Name",
        "Ab Name",
        "Action",
    ]

    return (
        <div className='bg-white shadow-md rounded-md pb-4 '>
            <div className='border-b-2  border-gray-500 px-3 py-4 flex justify-between items-center'>
             <h3 className='text-xl font-semibold text-black'>CB Lsit</h3>   
            <CreateCbButton/>
            </div>
            <CBTable headerList={headerList}/>
        </div>
        
    );
}

export default ManageCb;
