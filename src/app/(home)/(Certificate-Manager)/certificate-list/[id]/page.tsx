'use client'
import React from 'react'
import CertificationForm from './CertificationForm';

function Page({params}:{params:{id: string}}) {
    const {id} = params;
    return (
       <><CertificationForm  id={id}/></>
    )
}

export default Page